<?php

namespace App\Services\NewsSource;

use Exception;
use Illuminate\Support\Facades\Http;

class NewsAPISource implements NewsSourceInterface
{
    private string $apiKey;

    private string $baseUrl;

    public function __construct(private array $config)
    {
        if (! isset($config['api_key']) || ! isset($config['base_url'])) {
            throw new Exception('NewsAPI configuration is incomplete. Required: api_key and base_url');
        }
        $this->apiKey = $config['api_key'];
        $this->baseUrl = $config['base_url'];
    }

    public function fetchArticles(): array
    {
        $response = Http::get("{$this->baseUrl}/v2/top-headlines", [
            'apiKey' => $this->apiKey,
            'language' => 'en',
            'pageSize' => 100,
        ]);

        if (! $response->successful()) {
            throw new \Exception('Failed to fetch from NewsAPI: '.$response->body());
        }

        return array_map(
            fn ($article) => $this->transformArticle($article),
            $response->json('articles', [])
        );
    }

    public function transformArticle(array $article): array
    {
        return [
            'external_id' => md5($article['url']),
            'title' => $article['title'],
            'content' => $article['description'] ?? '',
            'author' => $article['author'],
            'url' => $article['url'],
            'image_url' => $article['urlToImage'] ?? null,
            'published_at' => $article['publishedAt'],
            'categories' => $this->inferCategories($article['title'].' '.($article['description'] ?? '')),
        ];
    }

    private function inferCategories(string $text): array
    {
        // Simple keyword-based category inference
        $categoryKeywords = [
            'technology' => ['tech', 'software', 'ai', 'digital'],
            'business' => ['business', 'economy', 'market', 'stock'],
            'sports' => ['sports', 'football', 'basketball', 'tennis'],
            // Add more categories as needed
        ];

        $text = strtolower($text);
        $categories = [];

        foreach ($categoryKeywords as $category => $keywords) {
            foreach ($keywords as $keyword) {
                if (str_contains($text, $keyword)) {
                    $categories[] = $category;
                    break;
                }
            }
        }

        return array_unique($categories);
    }
}
