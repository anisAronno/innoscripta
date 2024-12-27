<?php

namespace App\Services;

use App\Models\Source;
use Illuminate\Database\Eloquent\Collection;

class SourceService
{
    public function getAllActiveSources(): Collection
    {
        return Source::where('is_active', true)
            ->orderBy('name')
            ->get();
    }

    public function getSourcesWithStats(): Collection
    {
        return Source::where('is_active', true)
            ->withCount(['articles' => function ($query) {
                $query->whereBetween('created_at', [now()->subDays(30), now()]);
            }])
            ->withAvg(['articles' => function ($query) {
                $query->whereBetween('created_at', [now()->subDays(30), now()]);
            }], 'id')
            ->orderBy('name')
            ->get();
    }
}