<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{
    private const CACHE_KEY = 'categories';

    private const CACHE_TTL = 3600; // 1 hour in seconds

    public function __construct(
        private CategoryService $categoryService
    ) {}

    public function index(): JsonResponse
    {
        $categories = Cache::tags(['categories'])->remember(self::CACHE_KEY, self::CACHE_TTL, function () {
            return $this->categoryService->getAllCategories();
        });

        return CategoryResource::collection($categories)->additional([
            'message' => 'List of all categories',
        ])->response();
    }
}
