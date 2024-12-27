<?php

namespace App\Observers;

use App\Models\Article;
use Illuminate\Support\Facades\Cache;

class ArticleObserver
{
    public function created(Article $article): void
    {
        // Only flush lists cache as new article affects only lists
        Cache::tags(['articles', 'lists'])->flush();
    }

    public function updated(Article $article): void
    {
        // Flush specific caches instead of all article caches
        $singleCacheKey = "article:{$article->id}";
        Cache::tags(['articles', 'lists'])->flush();
        Cache::tags(['articles', 'single'])->forget($singleCacheKey);

        // Clear personalized feeds as they might contain this article
        Cache::tags(['articles', 'personalized'])->flush();
    }

    public function deleted(Article $article): void
    {
        // Same as update, clear all relevant caches
        $singleCacheKey = "article:{$article->id}";
        Cache::tags(['articles', 'lists'])->flush();
        Cache::tags(['articles', 'single'])->forget($singleCacheKey);

        // Clear personalized feeds as they might contain this article
        Cache::tags(['articles', 'personalized'])->flush();
    }
}
