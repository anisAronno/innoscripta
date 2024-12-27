<?php

namespace App\Services\NewsSource;

use Illuminate\Support\Facades\Http;

class GuardianSource implements NewsSourceInterface
{
    private string $apiKey;

    private string $baseUrl;

    public function __construct(private array $config)
    {
        $this->apiKey = $config['api_key'];
        $this->baseUrl = $config['base_url'];
    }

    public function fetchArticles(): array
    {
        $response = Http::get("{$this->baseUrl}/search", [
            'api-key' => $this->apiKey,
            'show-fields' => 'all',
            'page-size' => 50,
        ]);

        if (! $response->successful()) {
            throw new \Exception('Failed to fetch from Guardian: '.$response->body());
        }

        return array_map(
            fn ($article) => $this->transformArticle($article),
            $response->json('response.results', [])
        );
    }

    public function transformArticle(array $article): array
    {
        return [
            'external_id' => $article['id'],
            'title' => $article['webTitle'],
            'content' => $article['fields']['bodyText'] ?? '',
            'author' => $article['fields']['byline'] ?? null,
            'url' => $article['webUrl'],
            'image_url' => $article['fields']['thumbnail'] ?? null,
            'published_at' => $article['webPublicationDate'],
            'categories' => [$article['sectionName']],
        ];
    }
}
