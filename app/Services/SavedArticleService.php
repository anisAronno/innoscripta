<?php

namespace App\Services;

use App\Models\Article;
use App\Models\User;

class SavedArticleService
{
    public function toggleSavedArticle(User $user, Article $article): bool
    {
        if ($user->savedArticles()->where('article_id', $article->id)->exists()) {
            $user->savedArticles()->detach($article->id);
            return false;
        }
        
        $user->savedArticles()->attach($article->id);
        return true;
    }

    public function removeSavedArticle(User $user, Article $article): void
    {
        $user->savedArticles()->detach($article->id);
    }
}
