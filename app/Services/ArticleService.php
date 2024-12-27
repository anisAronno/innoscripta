<?php

namespace App\Services;

use App\Models\Article;
use App\Models\User;

class ArticleService
{
    public function getFilteredArticles(array $filters)
    {
        $query = Article::with(['source', 'categories'])
            ->when(isset($filters['search']), function ($query) use ($filters) {
                $query->where('title', 'like', "%{$filters['search']}%")
                    ->orWhere('content', 'like', "%{$filters['search']}%");
            })
            ->when(isset($filters['category']), function ($query) use ($filters) {
                $query->whereHas('categories', function ($q) use ($filters) {
                    $q->where('slug', $filters['category']);
                });
            })
            ->when(isset($filters['source']), function ($query) use ($filters) {
                $query->where('source_id', $filters['source']);
            })
            ->when(isset($filters['date_from']), function ($query) use ($filters) {
                $query->where('published_at', '>=', $filters['date_from']);
            })
            ->when(isset($filters['date_to']), function ($query) use ($filters) {
                $query->where('published_at', '<=', $filters['date_to']);
            });

        return $query->latest('published_at')->paginate(20);
    }

    public function getPersonalizedFeed(User $user)
    {
        $preferences = $user->preferences;
        
        return Article::with(['source', 'categories'])
            ->when(!empty($preferences->preferred_sources), function ($query) use ($preferences) {
                $query->whereIn('source_id', $preferences->preferred_sources);
            })
            ->when(!empty($preferences->preferred_categories), function ($query) use ($preferences) {
                $query->whereHas('categories', function ($q) use ($preferences) {
                    $q->whereIn('id', $preferences->preferred_categories);
                });
            })
            ->when(!empty($preferences->preferred_authors), function ($query) use ($preferences) {
                $query->whereIn('author', $preferences->preferred_authors);
            })
            ->latest('published_at')
            ->paginate(20);
    }
}
