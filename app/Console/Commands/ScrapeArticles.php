<?php

namespace App\Console\Commands;

use App\Services\NewsAggregatorService;
use App\Services\NewsSource\GuardianSource;
use App\Services\NewsSource\NewsAPISource;
use App\Services\NewsSource\ReutersSource;
use Illuminate\Console\Command;

class ScrapeArticles extends Command
{
    protected $signature = 'app:scrape-articles';

    protected $description = 'Scrape articles from all configured sources';

    public function handle(NewsAggregatorService $aggregator)
    {
        // Register sources
        $aggregator->registerSource('newsapi', new NewsAPISource([
            'api_key' => config('services.newsapi.key'),
            'base_url' => config('services.newsapi.url'),
        ]));

        $aggregator->registerSource('guardian', new GuardianSource([
            'api_key' => config('services.guardian.key'),
            'base_url' => config('services.guardian.url'),
        ]));

        $aggregator->registerSource('reuters', new ReutersSource([
            'api_key' => config('services.reuters.key'),
            'base_url' => config('services.reuters.url'),
        ]));

        // Run aggregation
        $this->info('Starting article aggregation...');
        $aggregator->aggregateFromAllSources();
        $this->info('Article aggregation completed!');

        return Command::SUCCESS;
    }
}
