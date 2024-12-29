<?php

namespace App\Observers;

use App\Models\UserPreference;
use Illuminate\Support\Facades\Cache;

class UserPreferenceObserver
{
    private function clearUserSpecificCache(UserPreference $userPreference): void
    {
        $userId = $userPreference->user_id;

        // Clear only personalized feed cache for this specific user
        Cache::tags([
            'articles',
            'personalized',
            "user-{$userId}",
        ])->flush();

        // Also clear category preferences cache if categories were updated
        if ($userPreference->isDirty('preferred_categories')) {
            Cache::tags(['categories'])->flush();
        }

    }

    public function created(UserPreference $userPreference): void
    {
        $this->clearUserSpecificCache($userPreference);
    }

    public function updated(UserPreference $userPreference): void
    {
        $this->clearUserSpecificCache($userPreference);
    }

    public function deleted(UserPreference $userPreference): void
    {
        $this->clearUserSpecificCache($userPreference);
    }
}
