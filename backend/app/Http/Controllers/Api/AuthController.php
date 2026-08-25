<?php

namespace App\Http\Controllers\Api;

use App\Models\AdminUser;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class AuthController
{
    private const MAX_LOGIN_ATTEMPTS = 5;
    private const LOGIN_DECAY_SECONDS = 900;

    public function login(Request $request): JsonResponse
    {
        $captchaEnabled = filter_var(env('RECAPTCHA_ENABLED', false), FILTER_VALIDATE_BOOLEAN);

        if ($captchaEnabled) {
            $captchaToken = $request->input('recaptcha_token');
            $captchaSecret = env('RECAPTCHA_SECRET_KEY');

            if (!$captchaSecret) {
                return response()->json(['message' => 'reCAPTCHA is not configured.'], 503);
            }

            if (!$captchaToken) {
                return response()->json(['message' => 'Please complete the reCAPTCHA check.'], 422);
            }

            // Google's published v2 test secret can be used locally even when a
            // development firewall prevents PHP from reaching the verification API.
            // This branch never applies with a real secret key or outside APP_ENV=local.
            $usingLocalTestKey = app()->environment('local')
                && hash_equals('6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe', $captchaSecret);

            if (!$usingLocalTestKey) {
                try {
                    $captchaResult = Http::asForm()
                        ->timeout(10)
                        ->post('https://www.google.com/recaptcha/api/siteverify', [
                            'secret' => $captchaSecret,
                            'response' => $captchaToken,
                            'remoteip' => $request->ip(),
                        ]);
                } catch (\Throwable) {
                    return response()->json(['message' => 'Unable to verify reCAPTCHA. Please try again.'], 503);
                }

                if (!$captchaResult->successful() || !$captchaResult->json('success')) {
                    return response()->json(['message' => 'reCAPTCHA verification failed. Please try again.'], 422);
                }
            }
        }

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $throttleKey = $this->loginThrottleKey($credentials['email'], $request->ip());
        if (RateLimiter::tooManyAttempts($throttleKey, self::MAX_LOGIN_ATTEMPTS)) {
            $retryAfter = RateLimiter::availableIn($throttleKey);

            return response()->json([
                'message' => "Too many login attempts. Please try again in {$retryAfter} seconds.",
            ], 429)->header('Retry-After', $retryAfter);
        }

        $user = AdminUser::query()->where('email', $credentials['email'])->first();
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            RateLimiter::hit($throttleKey, self::LOGIN_DECAY_SECONDS);
            return response()->json(['message' => 'Invalid email or password.'], 422);
        }

        RateLimiter::clear($throttleKey);
        $token = Str::random(64);
        $user->update(['token_hash' => Hash::make($token)]);

        return response()->json([
            'token' => $token,
            'user' => $user->only(['id', 'name', 'email', 'role']),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json($request->attributes->get('admin_user')->only(['id', 'name', 'email', 'role']));
    }

    public function users(Request $request): JsonResponse
    {
        $this->requireSuperAdmin($request);

        return response()->json(
            AdminUser::query()->orderBy('name')->get(['id', 'name', 'email', 'role', 'created_at'])
        );
    }

    public function createUser(Request $request): JsonResponse
    {
        $this->requireSuperAdmin($request);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:admin_users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = AdminUser::create([
            'name' => $data['name'],
            'email' => strtolower($data['email']),
            'password' => Hash::make($data['password']),
            'role' => 'admin',
        ]);

        return response()->json($user->only(['id', 'name', 'email', 'role', 'created_at']), 201);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = $request->attributes->get('admin_user');
        $user->update(['token_hash' => null]);
        return response()->json(['message' => 'Logged out.']);
    }

    private function loginThrottleKey(string $email, ?string $ip): string
    {
        return 'admin-login:' . hash('sha256', strtolower(trim($email)) . '|' . ($ip ?? 'unknown'));
    }

    private function requireSuperAdmin(Request $request): void
    {
        abort_unless($request->attributes->get('admin_user')?->role === 'super_admin', 403, 'Super administrator permission required.');
    }
}
