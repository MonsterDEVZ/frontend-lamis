'use client';

import type { FC } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import type { SearchResult } from '@/types/product';
import SearchResultItem from './SearchResultItem';

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  query: string;
  onResultClick: (result: SearchResult) => void;
  onShowAll?: () => void;
  maxResults?: number;
}

/**
 * Search results dropdown component
 * Displays search results with "Show All" button
 */
const SearchResults: FC<SearchResultsProps> = ({
  results,
  isLoading,
  query,
  onResultClick,
  onShowAll,
  maxResults = 6,
}) => {
  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="animate-spin text-green-600" size={24} />
          <span className="ml-2 text-sm text-gray-600">Поиск...</span>
        </div>
      </div>
    );
  }

  if (!query) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
        <div className="px-4 py-6 text-center">
          <p className="text-sm text-gray-600">
            Ничего не найдено по запросу &quot;{query}&quot;
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Попробуйте изменить запрос
          </p>
        </div>
      </div>
    );
  }

  const displayedResults = results.slice(0, maxResults);
  const hasMore = results.length > maxResults;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[500px] overflow-y-auto">
      {/* Results */}
      <div className="divide-y divide-gray-100">
        {displayedResults.map((result) => (
          <SearchResultItem
            key={`${result.type}-${result.id}`}
            result={result}
            onClick={onResultClick}
          />
        ))}
      </div>

      {/* Show All button */}
      {(hasMore || onShowAll) && (
        <div className="border-t border-gray-200 px-4 py-3">
          {onShowAll ? (
            <button
              onClick={onShowAll}
              className="w-full text-center text-sm text-green-600 hover:text-green-700 font-medium"
            >
              Показать все ({results.length})
            </button>
          ) : (
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              className="block w-full text-center text-sm text-green-600 hover:text-green-700 font-medium"
            >
              Показать все ({results.length})
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
