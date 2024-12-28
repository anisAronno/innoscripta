<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'source_id' => $this->source_id,
            'title' => $this->title,
            'slug' => $this->slug,
            'url' => $this->url,
            'image_url' => $this->image_url,
            'published_at' => $this->published_at->diffForHumans(),
            'content' => $this->content,
            'is_active' => $this->is_active,
            'source' => new SourceResource($this->whenLoaded('source')),
            'categories' => CategoryResource::collection($this->whenLoaded('categories')),
            'external_id' => $this->external_id,
            'author' => $this->author,
            'created_at' => $this->created_at?->diffForHumans(),
            'updated_at' => $this->updated_at?->diffForHumans(),
        ];
    }
}
