<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();

            $user = User::create($data);

            event(new Registered($user));

            $freshUser = $user->fresh();

            $token = $freshUser->createToken('auth_token')->plainTextToken;

            return UserResource::make($freshUser)->additional([
                'token' => $token,
                'message' => 'User registered successfully',
            ])->response()->setStatusCode(201);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
