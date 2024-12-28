import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Article } from '../../types/blog.types';
import api from '../../utils/api';

const ArticleDetailView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);
        const response = await api.get<{ data: Article }>(
          `/api/v1/articles/${slug}`
        );
        setArticle(response.data.data);
      } catch (err) {
        setError('Failed to load article');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="text-center text-red-600 py-8">
        {error || 'Article not found'}
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-7xl">
      <img
        src={article.image_url}
        alt={article.title}
        className="w-full h-96 object-cover rounded-lg mb-8"
      />
      <div className="prose lg:prose-xl max-w-none">
        <h1>{article.title}</h1>
        <div className="flex items-center space-x-4 text-gray-600 mb-8">
          <span>{article.source.name}</span>
          <span>•</span>
          <span>{article.published_at}</span>
          <span>•</span>
          <span>By {article.author}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </article>
  );
};

export { ArticleDetailView };
export default ArticleDetailView;
