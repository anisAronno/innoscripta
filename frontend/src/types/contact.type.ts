// src/types/contact.type.ts
export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp?: Date;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactState {
  formData: FormData;
  isLoading: boolean;
  error: string | null;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SearchFilters {
  searchTerm: string;
  searchBy: 'name' | 'email' | 'message';
}

export interface ContactTableProps {
  contacts: Contact[];
}

export interface SearchFormProps {
  defaultValues: SearchFilters;
  onSearch: (filters: SearchFilters) => void;
}
