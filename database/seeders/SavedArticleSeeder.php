<?php

namespace Database\Seeders;

use App\Models\SavedArticle;
use Illuminate\Database\Seeder;

class SavedArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SavedArticle::factory()->count(50)->create();
    }
}
