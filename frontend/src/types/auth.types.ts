import { ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at?: string | null;
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}