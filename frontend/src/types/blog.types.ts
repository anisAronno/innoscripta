export interface Source {
  id: number;
  name: string;
  api_identifier: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: number;
  source_id: number;
  title: string;
  slug: string;
  url: string;
  image_url: string;
  published_at: string;
  content: string;
  source: Source;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  data: Article[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
  };
}
