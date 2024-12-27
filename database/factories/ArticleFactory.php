<?php

namespace Database\Factories;

use App\Models\Source;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraphs(3, true),
            'author' => $this->faker->name,
            'url' => $this->faker->unique()->url,
            'image_url' => $this->faker->imageUrl(),
            'published_at' => $this->faker->dateTime,
            'external_id' => $this->faker->unique()->uuid,
            'source_id' => Source::inRandomOrder()->first()->id,
        ];
    }
}
