'use client';

import type { FC } from 'react';
import { Package, Layers, FolderOpen, Tag } from 'lucide-react';
import type { SearchResult } from '@/types/product';

interface SearchResultItemProps {
  result: SearchResult;
  onClick: (result: SearchResult) => void;
  isLast?: boolean;
}

/**
 * Single search result item component
 * Displays icon, name, and breadcrumb for each result type
 */
const SearchResultItem: FC<SearchResultItemProps> = ({ result, onClick, isLast = false }) => {
  // Get icon based on result type
  const getIcon = () => {
    switch (result.type) {
      case 'product':
        return <Package size={20} className="text-gray-500" />;
      case 'collection':
        return <Layers size={20} className="text-gray-500" />;
      case 'category':
        return <FolderOpen size={20} className="text-gray-500" />;
      case 'brand':
        return <Tag size={20} className="text-gray-500" />;
      default:
        return <Package size={20} className="text-gray-500" />;
    }
  };

  // Get label based on result type
  const getTypeLabel = () => {
    switch (result.type) {
      case 'product':
        return 'Товар';
      case 'collection':
        return 'Коллекция';
      case 'category':
        return 'Категория';
      case 'brand':
        return 'Бренд';
      default:
        return '';
    }
  };

  return (
    <button
      onClick={() => onClick(result)}
      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-3 ${
        !isLast ? 'border-b border-gray-100' : ''
      }`}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-1">
        {getIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Name */}
        <div className="font-semibold text-gray-900 text-base leading-tight mb-1">
          {result.name}
        </div>

        {/* Breadcrumb */}
        <div className="text-[13px] text-gray-500 leading-snug truncate">
          {result.breadcrumb}
        </div>

        {/* Type label - hidden on mobile */}
        <div className="text-xs text-gray-400 mt-1 hidden sm:block">
          {getTypeLabel()}
        </div>
      </div>
    </button>
  );
};

export default SearchResultItem;
