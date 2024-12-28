<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;

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

            // Create default preferences
            $user->preferences()->create([
                'preferred_sources' => [],
                'preferred_categories' => [],
            ]);

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
