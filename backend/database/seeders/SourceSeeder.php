<?php

namespace Database\Seeders;

use App\Models\Source;
use Illuminate\Database\Seeder;

class SourceSeeder extends Seeder
{
    public function run(): void
    {
        $sources = [
            [
                'name' => 'NewsAPI',
                'api_identifier' => 'newsapi',
                'base_url' => config('services.newsapi.url'),
                'api_key' => config('services.newsapi.key'),
                'is_active' => true,
            ],
            [
                'name' => 'The Guardian',
                'api_identifier' => 'guardian',
                'base_url' => config('services.guardian.url'),
                'api_key' => config('services.guardian.key'),
                'is_active' => true,
            ],
            [
                'name' => 'Reuters',
                'api_identifier' => 'reuters',
                'base_url' => config('services.reuters.url'),
                'api_key' => config('services.reuters.key'),
                'is_active' => true,
            ],
            [
                'name' => 'BBC News',
                'api_identifier' => 'bbc', 
                'base_url' => config('services.bbc.url'),
                'api_key' => config('services.bbc.key'),
                'is_active' => true,
            ],
        ];

        foreach ($sources as $source) {
            Source::updateOrCreate(
                ['api_identifier' => $source['api_identifier']],
                $source
            );
        }
    }
}
