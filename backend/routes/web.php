<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'status' => 'OK',
        'message' => 'CATA Foundation API Server is running',
        'health_check' => url('/api/health'),
    ]);
});