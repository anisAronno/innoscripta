<?php

namespace App\Services\NewsSource;

use Exception;
use Illuminate\Support\Facades\Http;

class BBCSource implements NewsSourceInterface
{
    private string $apiKey;

    private string $baseUrl;

    private const DEFAULT_LIMIT = 50;

    private const DEFAULT_LANGUAGE = 'en';

    public function __construct(private array $config)
    {
        if (! isset($config['api_key']) || ! isset($config['base_url'])) {
            throw new Exception('BBC News API configuration is incomplete. Required: api_key and base_url');
        }

        $this->apiKey = $config['api_key'];
        $this->baseUrl = rtrim($config['base_url'], '/');
    }

    public function fetchArticles(int $limit = self::DEFAULT_LIMIT, string $language = self::DEFAULT_LANGUAGE): array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.$this->apiKey,
                'Accept' => 'application/json',
            ])->get("{$this->baseUrl}/v1/articles", [
                'limit' => $limit,
                'language' => $language,
            ]);

            if (! $response->successful()) {
                throw new Exception("Failed to fetch from BBC: HTTP {$response->status()}, {$response->body()}");
            }

            return array_map(
                fn ($article) => $this->transformArticle($article),
                $response->json('articles', [])
            );
        } catch (Exception $e) {
            throw new Exception("BBC News API Error: {$e->getMessage()}");
        }
    }

    public function transformArticle(array $article): array
    {
        if (! isset($article['id']) || ! isset($article['title'])) {
            throw new Exception('Invalid article data: missing required fields');
        }

        return [
            'external_id' => $article['id'],
            'title' => $article['title'],
            'content' => $article['body'] ?? $article['description'] ?? '',
            'author' => $article['author'] ?? null,
            'url' => $article['url'] ?? '',
            'image_url' => $article['image']['url'] ?? null,
            'published_at' => $article['published_at'] ?? null,
            'categories' => $this->inferCategories($article['category'] ?? 'general'),
        ];
    }

    private function inferCategories(string $category): array
    {
        $categoryMap = [
            'news' => 'general',
            'sport' => 'sports',
            'business' => 'business',
            'politics' => 'politics',
            'technology' => 'technology',
            'science' => 'science',
            'health' => 'health',
            'entertainment' => 'entertainment',
        ];

        $normalizedCategory = strtolower(trim($category));

        return [
            $categoryMap[$normalizedCategory] ?? 'general',
        ];
    }
}
