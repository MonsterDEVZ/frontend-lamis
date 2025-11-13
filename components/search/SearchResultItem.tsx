'use client';

import type { FC } from 'react';
import { Package, Layers, FolderOpen, Tag } from 'lucide-react';
import type { SearchResult } from '@/types/product';

interface SearchResultItemProps {
  result: SearchResult;
  onClick: (result: SearchResult) => void;
}

/**
 * Single search result item component
 * Displays icon, name, and breadcrumb for each result type
 */
const SearchResultItem: FC<SearchResultItemProps> = ({ result, onClick }) => {
  // Get icon based on result type
  const getIcon = () => {
    switch (result.type) {
      case 'product':
        return <Package size={18} className="text-green-600" />;
      case 'collection':
        return <Layers size={18} className="text-blue-600" />;
      case 'category':
        return <FolderOpen size={18} className="text-purple-600" />;
      case 'brand':
        return <Tag size={18} className="text-orange-600" />;
      default:
        return <Package size={18} className="text-gray-600" />;
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
      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-3 border-b border-gray-100 last:border-b-0"
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        {getIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Name */}
        <div className="font-medium text-gray-900 text-sm truncate">
          {result.name}
        </div>

        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mt-0.5 truncate">
          {result.breadcrumb}
        </div>

        {/* Type label */}
        <div className="text-xs text-gray-400 mt-1">
          {getTypeLabel()}
        </div>
      </div>
    </button>
  );
};

export default SearchResultItem;
