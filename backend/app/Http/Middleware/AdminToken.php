<?php

namespace App\Http\Middleware;

use App\Models\AdminUser;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AdminToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        $users = AdminUser::query()->whereNotNull('token_hash')->get();

        foreach ($users as $user) {
            if ($token && Hash::check($token, $user->token_hash)) {
                $request->attributes->set('admin_user', $user);
                return $next($request);
            }
        }

        return response()->json(['message' => 'Authentication required.'], 401);
    }
}
