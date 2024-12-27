<?php

namespace App\Http\Controllers\Api;

use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{
    public function __construct(
        private CategoryService $categoryService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $categories = $this->categoryService->getAllCategories();

        return CategoryResource::collection($categories)->additional([
            'message' => 'List of all categories',
        ])->response();
    }
}
