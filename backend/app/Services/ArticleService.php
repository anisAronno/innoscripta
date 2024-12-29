<?php

namespace App\Services;

use App\Models\Article;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class ArticleService
{
    public function getFilteredArticles(array $filters): LengthAwarePaginator
    {
        $perPage = $filters['limit'] ?? 20;
        $page = $filters['page'] ?? 1;

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

        return $query->latest('published_at')->paginate($perPage, ['*'], 'page', $page);
    }

    public function getPersonalizedFeed(User $user, array $request = [])
    {
        $preferences = $user->preferences;
        $perPage = $request['limit'] ?? $preferences->articles_per_page ?? 20;
        $page = $request['page'] ?? 1;

        $query = Article::with(['source', 'categories']);

        // Handle source filtering
        if (isset($request['sources']) && ! empty($request['sources'])) {
            $sourceIds = is_array($request['sources'])
                ? $request['sources']
                : explode(',', $request['sources']);
            $query->whereIn('source_id', $sourceIds);
        } elseif (! empty($preferences->preferred_sources)) {
            $query->whereIn('source_id', $preferences->preferred_sources);
        }

        // Handle category filtering
        if (isset($request['categories']) && ! empty($request['categories'])) {
            $categoryIds = is_array($request['categories'])
                ? $request['categories']
                : explode(',', $request['categories']);

            $query->whereHas('categories', function ($q) use ($categoryIds) {
                $q->whereIn('categories.id', $categoryIds);
            });
        } elseif (! empty($preferences->preferred_categories)) {
            $query->whereHas('categories', function ($q) use ($preferences) {
                $q->whereIn('categories.id', $preferences->preferred_categories);
            });
        }

        return $query->latest('published_at')
            ->paginate($perPage, ['*'], 'page', $page);
    }
}
