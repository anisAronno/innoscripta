import { Listbox } from '@headlessui/react';
import { Check, ChevronDown, Filter, X } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ApiResponse, Article, Category, Source } from '../../types/blog.types';
import api from '../../utils/api';
import { ArticleCard } from './ArticleCard';

interface FilterState {
  sources: number[];
  categories: number[];
  limit: number;
}

export const BlogList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sources, setSources] = useState<Source[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    sources: [],
    categories: [],
    limit: 20,
  });

  const fetchFilters = async () => {
    try {
      const [sourcesResponse, categoriesResponse] = await Promise.all([
        api.get<ApiResponse<Source[]>>('/api/v1/sources'),
        api.get<ApiResponse<Category[]>>('/api/v1/categories'),
      ]);
      setSources(sourcesResponse.data.data);
      setCategories(categoriesResponse.data.data);
    } catch (err) {
      console.error('Error fetching filters:', err);
    }
  };

  

  const fetchArticles = useCallback(
    async (pageNumber: number) => {
      if (loading) return;

      const cacheKey = `articles-${pageNumber}-${filters.limit}-${filters.sources.join(',')}-${filters.categories.join(',')}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      if (cachedData) {
        setArticles(JSON.parse(cachedData));
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const queryParams = new URLSearchParams({
          page: pageNumber.toString(),
          limit: filters.limit.toString(),
          ...(filters.sources.length && { sources: filters.sources.join(',') }),
          ...(filters.categories.length && { categories: filters.categories.join(',') }),
        });

        const response = await api.get<ApiResponse<Article[]>>(
          `/api/v1/feed?${queryParams}`
        );
        const newArticles = response.data.data;

        sessionStorage.setItem(cacheKey, JSON.stringify(newArticles));
        setArticles((prev) =>
          pageNumber === 1 ? newArticles : [...prev, ...newArticles]
        );
        setHasMore(pageNumber < response.data.meta.last_page);
        setInitialLoad(false);
      } catch (err) {
        setError('Failed to load articles');
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    },
    [loading, filters]
  );

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    if (initialLoad || page === 1) {
      fetchArticles(1);
    }
  }, [fetchArticles, initialLoad, filters, page]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchArticles(nextPage);
    }
  }, [loading, hasMore, page, fetchArticles]);

  const handleFilterChange = (
    type: keyof FilterState,
    value: number[] | number
  ) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    setPage(1);
  };

  const handleSourceChange = (values: number[]) => {
    handleFilterChange('sources', values);
    if (values.length === 0) {
      fetchArticles(1);
    }
  };

  const handleCategoryChange = (values: number[]) => {
    handleFilterChange('categories', values);
    if (values.length === 0) {
      fetchArticles(1);
    }
  };

  const FilterSidebar = () => (
    <div className="w-full md:w-72 bg-white p-6 rounded-lg shadow-md space-y-8 relative">
      <div className="flex justify-between items-center md:hidden">
        <h3 className="font-semibold">Filters</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowFilters(false);
          }}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Articles per page
          </label>
          <select
            className="w-full bg-white py-3 px-4 border rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={filters.limit}
            onChange={(e) => {
              e.stopPropagation();
              handleFilterChange('limit', parseInt(e.target.value));
            }}
          >
            <option value={10}>10 articles</option>
            <option value={20}>20 articles</option>
            <option value={30}>30 articles</option>
            <option value={50}>50 articles</option>
          </select>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sources
          </label>
          <Listbox
            value={filters.sources}
            onChange={handleSourceChange}
            multiple
          >
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer bg-white py-3 pl-4 pr-10 text-left border rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <span className="block truncate">
                  {filters.sources.length
                    ? `${filters.sources.length} sources selected`
                    : 'Select sources'}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute z-[60] mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg border">
                {sources.map((source) => (
                  <Listbox.Option
                    key={source.id}
                    value={source.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {source.name}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <Check className="h-5 w-5" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categories
          </label>
          <Listbox
            value={filters.categories}
            onChange={handleCategoryChange}
            multiple
          >
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer bg-white py-3 pl-4 pr-10 text-left border rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <span className="block truncate">
                  {filters.categories.length
                    ? `${filters.categories.length} categories selected`
                    : 'Select categories'}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute z-[60] mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg border">
                {categories.map((category) => (
                  <Listbox.Option
                    key={category.id}
                    value={category.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {category.name}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <Check className="h-5 w-5" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  );

  if (error && articles.length === 0) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex md:hidden justify-end mb-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowFilters(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* Main Content */}
        <div className="flex-1">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </InfiniteScroll>
        </div>

        {/* Mobile Filter Overlay */}
        {showFilters && (
          <div
            className="fixed inset-0 z-50 md:hidden"
            onClick={(e) => {
              e.stopPropagation();
              setShowFilters(false);
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div
              className="absolute right-0 top-0 h-full w-80 bg-white p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* Desktop Filter Sidebar - Now on the right */}
        <div className="hidden md:block sticky top-4">
          <FilterSidebar />
        </div>
      </div>
    </div>
  );
};

export default BlogList;