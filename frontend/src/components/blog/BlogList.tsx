import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Article, ApiResponse } from '../../types/blog.types';
import { ArticleCard } from './ArticleCard';
import api from '../../utils/api';

export const BlogList: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [initialLoad, setInitialLoad] = useState(true);

    const fetchArticles = useCallback(async (pageNumber: number) => {
        if (loading) return;
        
        try {
            setLoading(true);
            setError(null);
            const response = await api.get<ApiResponse>(`/api/v1/feed?page=${pageNumber}`);
            const newArticles = response.data.data;
            
            setArticles(prev => pageNumber === 1 ? newArticles : [...prev, ...newArticles]);
            setHasMore(pageNumber < response.data.meta.last_page);
            setInitialLoad(false);
        } catch (err) {
            setError('Failed to load articles');
            console.error('Error fetching articles:', err);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    // Initial load
    useEffect(() => {
        if (initialLoad) {
            fetchArticles(1);
        }
    }, [fetchArticles, initialLoad]);

    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchArticles(nextPage);
        }
    }, [loading, hasMore, page, fetchArticles]);

    if (error && articles.length === 0) {
        return <div className="text-center text-red-600 py-8">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <InfiniteScroll
                dataLength={articles.length}
                next={loadMore}
                hasMore={hasMore}
                loader={
                    <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                }
                endMessage={
                    <div className="text-center text-gray-600 py-4">
                        No more articles to load
                    </div>
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default BlogList;