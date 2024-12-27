import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AuthContextType, AuthProviderProps, User } from '../types/auth.types';

const API_URL = 'http://innoscripta.test';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      const response = await api.post('/api/login', {
        email,
        password
      });
      
      const { token, data: user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('An error occurred during login')
      );
      throw err;
    }
  }, []);

  const signup = useCallback(async (
    name: string,
    email: string, 
    password: string,
    password_confirmation: string
  ): Promise<void> => {
    try {
      setError(null);
      const response = await api.post('/api/register', {
        name,
        email,
        password,
        password_confirmation
      });
      
      const { token, data: user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('An error occurred during signup')
      );
      throw err;
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      await api.post('/api/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Always clear local storage and state, even if the API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      // Optionally redirect to login page
      window.location.href = '/login';
    }
  }, []);

  const resetPassword = useCallback(async (email: string): Promise<void> => {
    try {
      setError(null);
      await api.post('/api/forgot-password', { email });
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('An error occurred during password reset')
      );
      throw err;
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>): Promise<void> => {
    try {
      setError(null);
      const response = await api.patch('/api/profile', data);
      const updatedUser = response.data;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('An error occurred updating profile')
      );
      throw err;
    }
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};