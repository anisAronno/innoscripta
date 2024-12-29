import { Listbox } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  ApiResponse,
  Category,
  Source,
  UserPreferences,
} from '../types/preferences.type';
import api from '../utils/api';

const PreferencesManager: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [localPreferences, setLocalPreferences] =
    useState<UserPreferences | null>(null);
  const [sources, setSources] = useState<Source[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prefsResponse, sourcesResponse, categoriesResponse] =
          await Promise.all([
            api.get<ApiResponse<UserPreferences>>('/api/v1/preferences'),
            api.get<ApiResponse<Source[]>>('/api/v1/sources'),
            api.get<ApiResponse<Category[]>>('/api/v1/categories'),
          ]);

        setPreferences(prefsResponse.data.data);
        setLocalPreferences(prefsResponse.data.data);
        setSources(sourcesResponse.data.data);
        setCategories(categoriesResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage({ type: 'error', text: 'Failed to load preferences' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdatePreferences = async () => {
    if (!localPreferences) return;

    try {
      setUpdating(true);
      const response = await api.put<ApiResponse<UserPreferences>>(
        '/api/v1/preferences',
        localPreferences
      );

      setPreferences(response.data.data);
      setLocalPreferences(response.data.data);
      setMessage({ type: 'success', text: 'Preferences updated successfully' });

      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error updating preferences:', error);
      setMessage({ type: 'error', text: 'Failed to update preferences' });
    } finally {
      setUpdating(false);
    }
  };

  const hasChanges =
    JSON.stringify(preferences) !== JSON.stringify(localPreferences);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">News Preferences</h2>
        <button
          onClick={handleUpdatePreferences}
          disabled={!hasChanges || updating}
          className={`px-4 py-2 rounded-lg font-medium transition-colors
            ${
              hasChanges
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          {updating ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Sources
          </label>
          <Listbox
            value={localPreferences?.preferred_sources || []}
            onChange={(values) =>
              setLocalPreferences((prev) =>
                prev
                  ? {
                      ...prev,
                      preferred_sources: values,
                    }
                  : null
              )
            }
            multiple
          >
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer bg-white py-3 pl-4 pr-10 text-left border rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <span className="block truncate">
                  {localPreferences?.preferred_sources.length
                    ? `${localPreferences.preferred_sources.length} sources selected`
                    : 'Select sources'}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg border">
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
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Categories
          </label>
          <Listbox
            value={localPreferences?.preferred_categories || []}
            onChange={(values) =>
              setLocalPreferences((prev) =>
                prev
                  ? {
                      ...prev,
                      preferred_categories: values,
                    }
                  : null
              )
            }
            multiple
          >
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer bg-white py-3 pl-4 pr-10 text-left border rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <span className="block truncate">
                  {localPreferences?.preferred_categories.length
                    ? `${localPreferences.preferred_categories.length} categories selected`
                    : 'Select categories'}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg border">
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
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Articles Per Page
          </label>
          <select
            className="w-full bg-white py-3 px-4 border rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={localPreferences?.articles_per_page}
            onChange={(e) =>
              setLocalPreferences((prev) =>
                prev
                  ? {
                      ...prev,
                      articles_per_page: parseInt(e.target.value),
                    }
                  : null
              )
            }
          >
            <option value="10">10 articles</option>
            <option value="20">20 articles</option>
            <option value="30">30 articles</option>
            <option value="50">50 articles</option>
          </select>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-500 pt-4 border-t">
          <span>Last updated: {preferences?.updated_at}</span>
          {updating && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreferencesManager;
