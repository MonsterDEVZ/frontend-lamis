'use client';

import { useState, useEffect, useRef, type FC } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { searchProducts } from '@/services/api/products';
import type { SearchResult } from '@/types/product';
import SearchResults from '../search/SearchResults';
import { useFiltersStore } from '@/store/filtersStore';

interface SearchInputProps {
  className?: string;
  onClose?: () => void;
}

/**
 * Search input component with dropdown results
 * Features:
 * - Debounced search (300ms)
 * - Dropdown with results
 * - Navigation to catalog with filters on click
 * - ESC to close
 * - Click outside to close
 */
const SearchInput: FC<SearchInputProps> = ({ className, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const containerRef = useRef<HTMLDivElement>(null);

  const { setSectionId, setBrandId, setCategoryId, setCollectionId, setTypeId, setIsLoading: setGlobalLoading } = useFiltersStore();

  // Perform search when debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      if (debouncedQuery.trim().length < 2) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await searchProducts(debouncedQuery);
        setResults(response.results);
        setIsOpen(true);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClose = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    onClose?.();
  };

  const handleResultClick = async (result: SearchResult) => {
    // Show loading
    setGlobalLoading(true);

    try {
      // Build filter parameters based on result type
      const params = new URLSearchParams();

      // Set filters based on what's available in the result
      if (result.section_id) {
        params.append('sectionId', result.section_id.toString());
        await setSectionId(result.section_id);
      }

      if (result.brand_id) {
        params.append('brandId', result.brand_id.toString());
        await setBrandId(result.brand_id);
      }

      if (result.category_id) {
        params.append('categoryId', result.category_id.toString());
        await setCategoryId(result.category_id);
      }

      if (result.collection_id) {
        params.append('collectionId', result.collection_id.toString());
        setCollectionId(result.collection_id);
      }

      if (result.type_id) {
        params.append('typeId', result.type_id.toString());
        setTypeId(result.type_id);
      }

      // Navigate to catalog with filters
      router.push(`/catalog?${params.toString()}`);

      // Close search
      handleClose();
    } finally {
      // Loading will be hidden by catalog component
      setTimeout(() => setGlobalLoading(false), 300);
    }
  };

  const handleShowAll = () => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
    handleClose();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Input container */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск товаров..."
          className="w-full h-10 pl-10 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />

        {/* Search icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </div>

        {/* Clear button */}
        {query && (
          <button
            onClick={handleClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {isOpen && (query.length >= 2) && (
        <SearchResults
          results={results}
          isLoading={isLoading}
          query={query}
          onResultClick={handleResultClick}
          onShowAll={handleShowAll}
          maxResults={6}
        />
      )}
    </div>
  );
};

export default SearchInput;
