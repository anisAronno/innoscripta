<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function show(Request $request): JsonResponse
    {
        return UserResource::make($request->user())->additional([
            'message' => 'Profile retrieved successfully',
        ])->response();
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): JsonResponse
    {
        $user = $request->user();
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return UserResource::make($user)->additional([
            'message' => 'Profile updated successfully',
        ])->response();
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): JsonResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        try {
            $user = $request->user();

            $user->delete();

            $request->user()->currentAccessToken()->delete();

            return response()->json(['message' => 'Account deleted successfully']);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Failed to delete account: '.$th->getMessage()], 500);
        }
    }
}
