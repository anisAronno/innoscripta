import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../types/blog.types';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const articleUrl = `/articles/${article.slug}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link 
        to={articleUrl}
        className="block relative overflow-hidden group"
        aria-label={`View article: ${article.title}`}
      >
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <span className="text-sm text-gray-500">{article.source.name}</span>
          <span className="mx-2">•</span>
          <span className="text-sm text-gray-500">
            {article.published_at}
          </span>
        </div>
        <Link 
          to={articleUrl}
          className="block hover:text-blue-600 transition-colors duration-200"
        >
          <h2 className="text-xl font-semibold mb-2 line-clamp-2">
            {article.title}
          </h2>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.content}</p>
       
      </div>
    </div>
  );
};

export default ArticleCard;