<?php

namespace App\Services\NewsSource;

use Exception;
use Illuminate\Support\Facades\Http;

class ReutersSource implements NewsSourceInterface
{
    private string $apiKey;

    private string $baseUrl;

    public function __construct(private array $config)
    {
        if (! isset($config['api_key']) || ! isset($config['base_url'])) {
            throw new Exception('Reuters News API configuration is incomplete. Required: api_key and base_url');
        }
        $this->apiKey = $config['api_key'];
        $this->baseUrl = $config['base_url'];
    }

    public function fetchArticles(): array
    {
        $response = Http::withToken($this->apiKey)->get("{$this->baseUrl}/v2/news", [
            'limit' => 50,
            'language' => 'en',
        ]);

        if (! $response->successful()) {
            throw new \Exception('Failed to fetch from Reuters: '.$response->body());
        }

        return array_map(
            fn ($article) => $this->transformArticle($article),
            $response->json('results', [])
        );
    }

    public function transformArticle(array $article): array
    {
        return [
            'external_id' => $article['id'],
            'title' => $article['headline'],
            'content' => $article['body'] ?? '',
            'author' => $article['author'] ?? null,
            'url' => $article['url'],
            'image_url' => $article['image_url'] ?? null,
            'published_at' => $article['published_at'],
            'categories' => [$article['category'] ?? 'general'],
        ];
    }
}
