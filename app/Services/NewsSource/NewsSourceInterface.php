<?php

namespace App\Services\NewsSource;

interface NewsSourceInterface
{
    public function fetchArticles(): array;

    public function transformArticle(array $article): array;
}
