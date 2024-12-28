<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\SavedArticleController;
use App\Http\Controllers\Api\SourceController;
use App\Http\Controllers\Api\UserPreferenceController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    // Public Routes
    Route::get('articles', [ArticleController::class, 'index']);
    Route::get('articles/{article:slug}', [ArticleController::class, 'show']);
    Route::get('categories', [CategoryController::class, 'index']);

    Route::get('sources', [SourceController::class, 'index']);

    // Protected Routes
    Route::middleware('auth:sanctum')->group(function () {

        // User Preferences
        Route::get('preferences', [UserPreferenceController::class, 'show']);
        Route::put('preferences', [UserPreferenceController::class, 'update']);

        // Sources
        Route::get('sources/stats', [SourceController::class, 'stats']);

        // categories
        Route::get('categories', [CategoryController::class, 'index']);

        // Saved Articles
        Route::get('saved-articles', [SavedArticleController::class, 'index']);
        Route::post('saved-articles/{article}', [SavedArticleController::class, 'store']);
        Route::delete('saved-articles/{article}', [SavedArticleController::class, 'destroy']);

        // Personalized Feed
        Route::get('feed', [ArticleController::class, 'personalizedFeed']);
    });
});

// Auth Routes
require __DIR__.'/auth.php';
