<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserPreferenceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'preferred_sources' => $this->preferred_sources,
            'preferred_categories' => $this->preferred_categories,
            'preferred_authors' => $this->preferred_authors,
            'articles_per_page' => $this->articles_per_page,
            'sources' => SourceResource::collection(
                $this->whenLoaded('preferredSources')
            ),
            'categories' => CategoryResource::collection(
                $this->whenLoaded('preferredCategories')
            ),
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
        ];
    }
}
