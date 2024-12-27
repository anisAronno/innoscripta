<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Category;
use App\Models\Source;
use App\Services\NewsSource\NewsSourceInterface;
use Illuminate\Support\Facades\Log;

class NewsAggregatorService
{
    private array $sources = [];

    public function registerSource(string $identifier, NewsSourceInterface $source): void
    {
        $this->sources[$identifier] = $source;
    }

    public function aggregateFromAllSources(): void
    {
        $sources = Source::where('is_active', true)->get();

        foreach ($sources as $source) {
            try {
                $this->aggregateFromSource($source);
            } catch (\Exception $e) {
                Log::error("Failed to aggregate from {$source->name}: ".$e->getMessage());
            }
        }
    }

    private function aggregateFromSource(Source $source): void
    {
        if (! isset($this->sources[$source->api_identifier])) {
            throw new \Exception("Source handler not found for: {$source->api_identifier}");
        }

        $articles = $this->sources[$source->api_identifier]->fetchArticles();

        foreach ($articles as $articleData) {
            $this->processArticle($source, $articleData);
        }
    }

    private function processArticle(Source $source, array $articleData): void
    {
        $article = Article::updateOrCreate(
            [
                'external_id' => $articleData['external_id'],
                'source_id' => $source->id,
            ],
            [
                'title' => $articleData['title'],
                'content' => $articleData['content'],
                'author' => $articleData['author'],
                'url' => $articleData['url'],
                'image_url' => $articleData['image_url'],
                'published_at' => $articleData['published_at'],
            ]
        );

        // Process categories
        $categoryIds = [];
        foreach ($articleData['categories'] as $categoryName) {
            $category = Category::firstOrCreate(
                ['name' => $categoryName],
                ['slug' => str($categoryName)->slug()]
            );
            $categoryIds[] = $category->id;
        }

        $article->categories()->sync($categoryIds);
    }
}
