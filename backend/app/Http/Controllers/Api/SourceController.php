<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\SourceResource;
use App\Services\SourceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class SourceController extends Controller
{
    public function __construct(
        private SourceService $sourceService
    ) {}

    public function index(): JsonResponse
    {
        $sources = $this->sourceService->getAllActiveSources();

        return SourceResource::collection($sources)->additional([
            'message' => 'List of all active sources',
        ])->response();
    }

    public function stats(): JsonResponse
    {
        $sourceStats = $this->sourceService->getSourcesWithStats();

        return SourceResource::collection($sourceStats)->additional([
            'message' => 'List of all sources with stats',
        ])->response();
    }
}
