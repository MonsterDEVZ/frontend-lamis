'use client';

import { useState, useEffect, useRef, type FC } from 'react';
import { X, Search, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { searchProducts } from '@/services/api/products';
import type { SearchResult } from '@/types/product';
import SearchResultItem from './SearchResultItem';
import { useFiltersStore } from '@/store/filtersStore';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

/**
 * Full-screen search modal component
 * - Desktop: centered modal with filters sidebar
 * - Mobile: full-screen overlay
 */
const SearchModal: FC<SearchModalProps> = ({ isOpen, onClose, initialQuery = '' }) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'product' | 'collection' | 'category' | 'brand'>('all');
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { setSectionId, setBrandId, setCategoryId, setCollectionId, setTypeId, setIsLoading: setGlobalLoading } = useFiltersStore();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Perform search when query changes
  useEffect(() => {
    const performSearch = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await searchProducts(query);
        setResults(response.results);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(performSearch, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle result click
  const handleResultClick = async (result: SearchResult) => {
    setGlobalLoading(true);

    try {
      const params = new URLSearchParams();

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

      router.push(`/catalog?${params.toString()}`);
      onClose();
    } finally {
      setTimeout(() => setGlobalLoading(false), 300);
    }
  };

  // Filter results based on selected filter
  const filteredResults = selectedFilter === 'all'
    ? results
    : results.filter(r => r.type === selectedFilter);

  // Count by type
  const countByType = {
    all: results.length,
    product: results.filter(r => r.type === 'product').length,
    collection: results.filter(r => r.type === 'collection').length,
    category: results.filter(r => r.type === 'category').length,
    brand: results.filter(r => r.type === 'brand').length,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50">
      {/* Modal content */}
      <div
        ref={modalRef}
        className="relative w-full h-full md:w-[90%] md:h-[90%] md:max-w-[1200px] md:rounded-lg bg-white shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex-shrink-0 border-b border-gray-200 p-4 md:p-6">
          <div className="flex items-center gap-4">
            {/* Search input */}
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Унитаз, Omega, Caizer..."
                className="w-full h-12 pl-12 pr-4 text-base border-2 border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-green-100 transition-colors"
                autoComplete="off"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <Search size={20} />
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Закрыть"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Results count */}
          {query.length >= 2 && !isLoading && (
            <div className="mt-3 text-sm text-gray-600">
              Найдено результатов: <span className="font-semibold">{results.length}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Sidebar - только на desktop */}
          <div className="hidden md:block w-64 border-r border-gray-200 p-6 overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Быстрые ссылки
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                  selectedFilter === 'all'
                    ? 'bg-green-50 text-green-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Все ({countByType.all})
              </button>
              <button
                onClick={() => setSelectedFilter('product')}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                  selectedFilter === 'product'
                    ? 'bg-green-50 text-green-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Товары ({countByType.product})
              </button>
              <button
                onClick={() => setSelectedFilter('collection')}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                  selectedFilter === 'collection'
                    ? 'bg-green-50 text-green-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Коллекции ({countByType.collection})
              </button>
              <button
                onClick={() => setSelectedFilter('category')}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                  selectedFilter === 'category'
                    ? 'bg-green-50 text-green-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Категории ({countByType.category})
              </button>
              <button
                onClick={() => setSelectedFilter('brand')}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                  selectedFilter === 'brand'
                    ? 'bg-green-50 text-green-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Бренды ({countByType.brand})
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="animate-spin text-green-100" size={32} />
                <span className="ml-3 text-gray-600">Поиск...</span>
              </div>
            ) : query.length < 2 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                Введите минимум 2 символа для поиска
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-gray-600 mb-2">
                    Ничего не найдено по запросу &quot;{query}&quot;
                  </p>
                  <p className="text-sm text-gray-400">
                    Попробуйте изменить запрос
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 md:p-6">
                <div className="space-y-0">
                  {filteredResults.map((result, index) => (
                    <SearchResultItem
                      key={`${result.type}-${result.id}`}
                      result={result}
                      onClick={handleResultClick}
                      isLast={index === filteredResults.length - 1}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
