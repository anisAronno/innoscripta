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
                'preferred_authors' => $data['preferred_authors'] ?? []
            ]);
            
            return $user->preferences->fresh();
        });
    }
}

