<?php

namespace App\Http\Controllers\Api;

use App\Models\Donation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class AcledaPaymentController
{
    /** Create an ACLEDA card-payment session and return browser-safe form data. */
    public function createCardSession(Request $request): JsonResponse
    {
        $data = $request->validate([
            'donor_name' => ['required', 'string', 'max:255'],
            'donor_email' => ['nullable', 'email', 'max:255'],
            'donor_phone' => ['nullable', 'string', 'max:50'],
            'donor_address' => ['nullable', 'array'],
            'amount' => ['required', 'numeric', 'min:1', 'max:1000000'],
            'campaign_title' => ['nullable', 'string', 'max:255'],
        ]);

        $signature = config('services.acleda.signature');
        if (blank($signature)) {
            return response()->json(['message' => 'ACLEDA card payment is not configured.'], 503);
        }

        $transactionId = 'TXN-' . strtoupper(Str::random(12));
        $acledaTxid = now()->format('ymdHis') . random_int(100, 999);
        $invoiceId = substr($acledaTxid, 0, 16);
        $description = Str::limit($data['campaign_title'] ?: 'CATA donation', 100, '');

        $donation = Donation::create([
            ...$data,
            'transaction_id' => $transactionId,
            'payment_method' => 'acleda_card',
            'status' => 'pending',
            'acleda_transaction_id' => $acledaTxid,
        ]);

        $gatewayTransaction = [
            'txid' => $acledaTxid,
            'purchaseAmount' => number_format((float) $data['amount'], 2, '.', ''),
            'purchaseCurrency' => 'USD',
            'purchaseDate' => now()->format('d-m-Y'),
            'purchaseDesc' => $description,
            'invoiceid' => $invoiceId,
            'item' => 'Donation',
            'quantity' => '1',
            'expiryTime' => '5',
            'paymentCard' => 1,
        ];

        try {
            $response = Http::acceptJson()->timeout(20)
                ->withOptions(['verify' => config('services.acleda.verify_ssl')])
                ->post(
                config('services.acleda.open_session_url'),
                [
                    'loginId' => config('services.acleda.login_id'),
                    'password' => config('services.acleda.password'),
                    'merchantID' => config('services.acleda.merchant_id'),
                    'signature' => $signature,
                    'xpayTransaction' => $gatewayTransaction,
                ]
            );
        } catch (\Throwable $exception) {
            report($exception);
            return response()->json(['message' => 'Unable to connect to ACLEDA payment gateway.'], 502);
        }

        $result = $response->json('result', []);
        $sessionId = $result['sessionid'] ?? null;
        $paymentTokenId = data_get($result, 'xTran.paymentTokenid');

        if (!$response->successful() || blank($sessionId) || blank($paymentTokenId)) {
            report(new \RuntimeException('ACLEDA OpenSession response: ' . $response->body()));
            return response()->json(['message' => 'ACLEDA could not create a card-payment session.'], 502);
        }

        $donation->update(['acleda_payment_token_id' => $paymentTokenId]);

        return response()->json([
            'transaction_id' => $transactionId,
            'redirect_form' => [
                'action_url' => config('services.acleda.payment_page_url'),
                'fields' => [
                    'merchantID' => config('services.acleda.merchant_id'),
                    'sessionid' => $sessionId,
                    'paymenttokenid' => $paymentTokenId,
                    'description' => $description,
                    'expirytime' => 5,
                    'amount' => number_format((float) $data['amount'], 2, '.', ''),
                    'quantity' => 1,
                    'item' => 1,
                    'invoiceid' => $invoiceId,
                    'currencytype' => 'USD',
                    'transactionID' => $acledaTxid,
                    'paymentCard' => 1,
                    'successUrlToReturn' => rtrim(config('services.acleda.frontend_url'), '/') . '/donate-payment/received/' . $transactionId,
                    'errorUrl' => rtrim(config('services.acleda.frontend_url'), '/') . '/donate-payment/received/' . $transactionId . '?payment=failed',
                ],
            ],
        ], 201);
    }

    /** Create a KHQR session only after the donor confirms the donation. */
    public function createQrSession(Request $request): JsonResponse
    {
        $data = $request->validate([
            'donor_name' => ['required', 'string', 'max:255'],
            'donor_email' => ['nullable', 'email', 'max:255'],
            'donor_phone' => ['nullable', 'string', 'max:50'],
            'donor_address' => ['nullable', 'array'],
            'amount' => ['required', 'numeric', 'min:1', 'max:1000000'],
            'campaign_title' => ['nullable', 'string', 'max:255'],
        ]);

        $signature = config('services.acleda.signature');
        if (blank($signature)) {
            return response()->json(['message' => 'ACLEDA KHQR payment is not configured.'], 503);
        }

        $transactionId = 'TXN-' . strtoupper(Str::random(12));
        $acledaTxid = now()->format('ymdHis') . random_int(100, 999);
        $invoiceId = substr($acledaTxid, 0, 16);
        $description = Str::limit($data['campaign_title'] ?: 'CATA donation', 100, '');

        $donation = Donation::create([
            ...$data,
            'transaction_id' => $transactionId,
            'payment_method' => 'acleda_khqr',
            'status' => 'pending',
            'acleda_transaction_id' => $acledaTxid,
        ]);

        try {
            $response = Http::acceptJson()->timeout(20)
                ->withOptions(['verify' => config('services.acleda.verify_ssl')])
                ->post(
                config('services.acleda.open_session_url'),
                [
                    'loginId' => config('services.acleda.login_id'),
                    'password' => config('services.acleda.password'),
                    'merchantID' => config('services.acleda.merchant_id'),
                    'signature' => $signature,
                    'xpayTransaction' => [
                        'txid' => $acledaTxid,
                        'purchaseAmount' => number_format((float) $data['amount'], 2, '.', ''),
                        'purchaseCurrency' => 'USD',
                        'purchaseDate' => now()->format('d-m-Y'),
                        'purchaseDesc' => $description,
                        'invoiceid' => $invoiceId,
                        'item' => 'Donation',
                        'quantity' => '1',
                        'expiryTime' => '5',
                        'operationType' => '5',
                        'oprDevice' => 'web',
                        'callBackUrl' => rtrim(config('services.acleda.frontend_url'), '/') . '/donate-payment/received/' . $transactionId,
                    ],
                ]
            );
        } catch (\Throwable $exception) {
            report($exception);
            return response()->json(['message' => 'Unable to connect to ACLEDA payment gateway.'], 502);
        }

        $result = $response->json('result', []);
        $qrValue = $result['qrValue'] ?? null;
        $paymentTokenId = data_get($result, 'xTran.paymentTokenid');

        if (!$response->successful() || blank($qrValue) || blank($paymentTokenId)) {
            report(new \RuntimeException('ACLEDA QR OpenSession response: ' . $response->body()));
            return response()->json(['message' => 'ACLEDA could not create a KHQR payment session.'], 502);
        }

        $donation->update(['acleda_payment_token_id' => $paymentTokenId]);

        return response()->json([
            'transaction_id' => $transactionId,
            'qr_value' => $qrValue,
            'expires_in_minutes' => 5,
        ], 201);
    }

    /** Verify a pending ACLEDA donation with the bank before marking it paid. */
    public function checkStatus(string $transactionId): JsonResponse
    {
        $donation = Donation::query()->where('transaction_id', $transactionId)->firstOrFail();

        if (!in_array($donation->payment_method, ['acleda_khqr', 'acleda_card'], true) || blank($donation->acleda_payment_token_id)) {
            return response()->json($donation);
        }

        try {
            $response = Http::acceptJson()->timeout(20)
                ->withOptions(['verify' => config('services.acleda.verify_ssl')])
                ->post(
                config('services.acleda.txn_status_url'),
                [
                    'loginId' => config('services.acleda.login_id'),
                    'password' => config('services.acleda.password'),
                    'merchantName' => config('services.acleda.merchant_name'),
                    'merchantId' => config('services.acleda.merchant_id'),
                    'signature' => config('services.acleda.signature'),
                    'paymentTokenid' => $donation->acleda_payment_token_id,
                ]
            );
        } catch (\Throwable $exception) {
            report($exception);
            return response()->json(['message' => 'Unable to verify the ACLEDA payment.'], 502);
        }

        if (!$response->successful()) {
            return response()->json(['message' => 'ACLEDA payment status is unavailable.'], 502);
        }

        $statusCode = data_get($response->json(), 'result.code');
        $confirmDate = data_get($response->json(), 'result.xTran.confirmDate');

        // ACLEDA returns result.code=0 when a session is created as well as
        // after it is paid. A confirmation date is the bank-side proof that
        // the payment completed, so never mark a donation paid from code alone.
        if ((int) $statusCode === 0 && filled($confirmDate) && (string) $confirmDate !== '0') {
            $donation->update(['status' => 'completed']);
        } elseif ((int) $statusCode === 1) {
            $donation->update(['status' => 'failed']);
        }

        return response()->json($donation->fresh());
    }
}
