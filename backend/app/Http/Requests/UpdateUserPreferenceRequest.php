<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserPreferenceRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'preferred_sources' => 'array',
            'preferred_sources.*' => 'exists:sources,id',
            'preferred_categories' => 'array',
            'preferred_categories.*' => 'exists:categories,id',
            'preferred_authors' => 'array',
            'preferred_authors.*' => 'string',
            'articles_per_page' => 'integer|min:5|max:100',
        ];
    }
}
