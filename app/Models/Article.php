<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Article extends Model
{
    /** @use HasFactory<\Database\Factories\ArticleFactory> */
    use HasFactory;

    protected $fillable = [
        'source_id',
        'title',
        'content',
        'slug',
        'author',
        'url',
        'image_url',
        'published_at',
        'external_id',
    ];

    protected function casts()
    {
        return [
            'published_at' => 'datetime',
        ];
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($category) {
            $slug = Str::slug($category->name);
            $count = static::where('slug', 'like', "{$slug}%")->count();
            $category->slug = $count ? "{$slug}-{$count}" : $slug;
        });
    }

    public function source()
    {
        return $this->belongsTo(Source::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function savedByUsers()
    {
        return $this->belongsToMany(User::class, 'saved_articles');
    }
}
