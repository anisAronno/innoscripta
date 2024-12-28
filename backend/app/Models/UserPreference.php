<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    /** @use HasFactory<\Database\Factories\UserPreferenceFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'preferred_sources', 'preferred_categories',  'articles_per_page'];

    protected $casts = [
        'preferred_sources' => 'array',
        'preferred_categories' => 'array',
        'articles_per_page' => 'integer'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
