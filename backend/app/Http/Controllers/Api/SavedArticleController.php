<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ArticleResource;
use App\Models\Article;
use App\Services\SavedArticleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class SavedArticleController extends Controller
{
    public function __construct(
        private SavedArticleService $savedArticleService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $savedArticles = $request->user()
            ->savedArticles()
            ->with(['source', 'categories'])
            ->latest()
            ->paginate(20);

        return ArticleResource::collection($savedArticles)->additional([
            'message' => 'Saved articles retrieved successfully',
        ])->response();
    }

    public function store(Request $request, Article $article): JsonResponse
    {
        $isSaved = $this->savedArticleService->toggleSavedArticle($request->user(), $article);

        return response()->json([
            'message' => $isSaved ? 'Article saved successfully' : 'Article removed from saved',
            'is_saved' => $isSaved,
        ]);
    }

    public function destroy(Request $request, Article $article): JsonResponse
    {
        $this->savedArticleService->removeSavedArticle($request->user(), $article);

        return response()->json([
            'message' => 'Article removed from saved successfully',
        ]);
    }
}
