export interface Source {
  id: number;
  name: string;
  api_identifier: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  id: number;
  user_id: number;
  preferred_sources: number[];
  preferred_categories: string[];
  preferred_authors: string[];
  articles_per_page: number;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
    articles_count: number;
}