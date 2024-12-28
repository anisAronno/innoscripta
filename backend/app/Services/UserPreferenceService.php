<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserPreference;
use Illuminate\Support\Facades\DB;

class UserPreferenceService
{
    public function updatePreferences(User $user, array $data): UserPreference
    {
        return DB::transaction(function () use ($user, $data) {
            $user->preferences->update([
                'preferred_sources' => $data['preferred_sources'] ?? [],
                'preferred_categories' => $data['preferred_categories'] ?? [],
            ]);
            
            return $user->preferences->fresh();
        });
    }
}

