<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\UpdateUserPreferenceRequest;
use App\Http\Resources\UserPreferenceResource;
use App\Services\UserPreferenceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class UserPreferenceController extends Controller
{
    public function __construct(
        private UserPreferenceService $preferenceService
    ) {}

    public function show(Request $request): JsonResponse
    {
        return UserPreferenceResource::make($request->user()->preferences)->additional([
            'message' => 'User preferences retrieved successfully',
        ])->response();
    }

    public function update(UpdateUserPreferenceRequest $request): JsonResponse
    {
        $preferences = $this->preferenceService->updatePreferences(
            $request->user(),
            $request->validated()
        );

        return UserPreferenceResource::make($preferences)->additional([
            'message' => 'User preferences updated successfully',
        ])->response();
    }
}
