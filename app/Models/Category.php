<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    protected $fillable = ['name', 'slug'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($category) {
            $slug = Str::slug($category->name);
            $count = static::where('slug', 'like', "{$slug}%")->count();
            $category->slug = $count ? "{$slug}-{$count}" : $slug;
        });
    }

    public function articles()
    {
        return $this->belongsToMany(Article::class);
    }
}
