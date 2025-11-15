'use client';

import type { FC } from 'react';
import { Loader2 } from 'lucide-react';
import type { SearchResult } from '@/types/product';
import SearchResultItem from './SearchResultItem';
import { useSearchModalStore } from '@/store/searchModalStore';

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
  const { openModal } = useSearchModalStore();
  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-b-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-200 border-t-0 z-[1000]">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="animate-spin text-green-100" size={24} />
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
      <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-b-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-200 border-t-0 z-[1000]">
        <div className="px-4 py-6 text-center">
          <p className="text-sm text-gray-600">
            Ничего не найдено по запросу &quot;{query}&quot;
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Попробуйте изменить запрос
          </p>
        </div>
      </div>
    );
  }

  const displayedResults = results.slice(0, maxResults);
  const hasMore = results.length > maxResults;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-b-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-200 border-t-0 z-[1000] max-h-[400px] overflow-y-auto">
      {/* Results */}
      <div>
        {displayedResults.map((result, index) => (
          <SearchResultItem
            key={`${result.type}-${result.id}`}
            result={result}
            onClick={onResultClick}
            isLast={index === displayedResults.length - 1 && !hasMore && !onShowAll}
          />
        ))}
      </div>

      {/* Show All button */}
      {(hasMore || onShowAll) && (
        <div className="border-t border-gray-100">
          <button
            onClick={onShowAll || (() => openModal(query))}
            className="w-full text-center py-3 px-4 text-sm text-green-100 hover:bg-gray-50 font-semibold transition-colors"
          >
            Показать все ({results.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
