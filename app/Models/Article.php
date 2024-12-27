<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    /** @use HasFactory<\Database\Factories\ArticleFactory> */
    use HasFactory;

    protected $fillable = [
        'source_id',
        'title',
        'content',
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
