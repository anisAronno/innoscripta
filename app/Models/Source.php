<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Source extends Model
{
    /** @use HasFactory<\Database\Factories\SourceFactory> */
    use HasFactory;

    protected $fillable = ['name', 'api_identifier', 'base_url', 'api_key', 'is_active'];

    public function articles()
    {
        return $this->hasMany(Article::class);
    }
}
