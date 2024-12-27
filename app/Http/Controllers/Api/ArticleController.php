<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ArticleResource;
use App\Models\Article;
use App\Services\ArticleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ArticleController extends Controller
{
    public function __construct(
        private ArticleService $articleService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $articles = $this->articleService->getFilteredArticles($request->all());

        return ArticleResource::collection($articles)->additional([
            'message' => 'Articles retrieved successfully',
        ])->response();
    }

    public function show(Article $article): JsonResponse
    {
        return ArticleResource::make($article->load(['source', 'categories']))->additional([
            'message' => 'Article retrieved successfully',
        ])->response();
    }

    public function personalizedFeed(Request $request): JsonResponse
    {
        $articles = $this->articleService->getPersonalizedFeed($request->user());

        return ArticleResource::collection($articles)->additional([
            'message' => 'Personalized feed retrieved successfully',
        ])->response();
    }
}
