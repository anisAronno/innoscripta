<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ArticleResource;
use App\Models\Article;
use App\Services\ArticleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;

class ArticleController extends Controller
{
    private const CACHE_TTL = 3600; // 1 hour

    private const PERSONALIZED_CACHE_TTL = 1800; // 30 minutes

    public function __construct(
        private ArticleService $articleService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $cacheKey = 'articles:'.md5(json_encode($request->all()));

        $articles = Cache::tags(['articles', 'lists'])->remember($cacheKey, self::CACHE_TTL, function () use ($request) {
            return $this->articleService->getFilteredArticles($request->all());
        });

        return ArticleResource::collection($articles)->additional([
            'message' => 'Articles retrieved successfully',
        ])->response();
    }

    public function show(Article $article): JsonResponse
    {
        $cacheKey = 'article:'.$article->id;

        $article = Cache::tags(['articles', 'single'])->remember($cacheKey, self::CACHE_TTL, function () use ($article) {
            return $article->load(['source', 'categories']);
        });

        return ArticleResource::make($article)->additional([
            'message' => 'Article retrieved successfully',
        ])->response();
    }

    public function personalizedFeed(Request $request): JsonResponse
    {
        try {
            $userId = $request->user()->id;
            $cacheKey = 'feed:'.$userId.md5(json_encode($request->all()));

            $articles = Cache::tags(['articles', 'personalized', "user-{$userId}"])->remember($cacheKey, self::PERSONALIZED_CACHE_TTL, function () use ($request) {
                return $this->articleService->getPersonalizedFeed($request->user(), $request->all());
            });

            return ArticleResource::collection($articles)->additional([
                'message' => 'Personalized feed retrieved successfully',
            ])->response();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error occurred while fetching personalized feed',
                'error' => $th->getMessage(),
            ], 400);
        }
    }
}
