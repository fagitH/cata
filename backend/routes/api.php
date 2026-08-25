<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AcledaPaymentController;
use App\Http\Controllers\Api\YoutubeFeedController;
use App\Http\Middleware\AdminToken;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/health', function () {
	return response()->json([
		'status' => 'OK',
		'database' => 'Connected',
	]);
});

Route::get('/youtube/videos', [YoutubeFeedController::class, 'index']);

// Public checkout: only offline bank-transfer and KHQR pledges are supported.
Route::post('/donations', [ContentController::class, 'submitDonation']);
Route::get('/donations/{identifier}', [ContentController::class, 'show']);
Route::post('/acleda/card-session', [AcledaPaymentController::class, 'createCardSession']);
Route::post('/acleda/qr-session', [AcledaPaymentController::class, 'createQrSession']);
Route::get('/acleda/donations/{transactionId}/status', [AcledaPaymentController::class, 'checkStatus']);

Route::post('/admin/login', [AuthController::class, 'login']);
Route::middleware(AdminToken::class)->group(function () {
	Route::get('/admin/me', [AuthController::class, 'me']);
	Route::post('/admin/logout', [AuthController::class, 'logout']);
	Route::get('/admin/users', [AuthController::class, 'users']);
	Route::post('/admin/users', [AuthController::class, 'createUser']);
	Route::get('/donations', [ContentController::class, 'index']);
	Route::post('/{resource}', [ContentController::class, 'store']);
	Route::put('/{resource}/{identifier}', [ContentController::class, 'update']);
	Route::delete('/{resource}/{identifier}', [ContentController::class, 'destroy']);
});

Route::get('/{resource}', [ContentController::class, 'index']);
Route::get('/{resource}/{identifier}', [ContentController::class, 'show']);
