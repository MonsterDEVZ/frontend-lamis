'use client';

import type { FC } from 'react';
import { X, Search } from 'lucide-react';

interface IMobileSearchOverlayProps {
  setIsSearchOpen: (value: boolean) => void;
  currentSearchValue: string;
  onSearchValueChange: (value: string) => void;
}

/**
 * @param {function} setIsSearchOpen - Функция для закрытия оверлея поиска.
 * @param {string} currentSearchValue - Текущее значение в поле поиска.
 * @param {function} onSearchValueChange - Функция для обновления значения поиска.
 * @returns JSX.Element
 * @description Оверлей для мобильного поиска, который появляется на весь экран.
 * Управляется состоянием из родительского компонента Header.tsx для унификации с десктопным поиском.
 */
const MobileSearchOverlay: FC<IMobileSearchOverlayProps> = ({
  setIsSearchOpen,
  currentSearchValue,
  onSearchValueChange,
}) => {
  const handleSearch = () => {
    // TODO: Implement search logic (e.g., navigate to search results page)
    console.log('Searching for:', currentSearchValue);
    setIsSearchOpen(false);
  };

  return (
    <div className="border-t border-[#1d1d1d1a]">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={currentSearchValue}
          onChange={(e) => onSearchValueChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Поиск по сайту..."
          autoFocus
          className="w-full h-12 pl-4 pr-[90px] text-gray-900 outline-none"
        />

        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-3 pr-5">
          <button
            onClick={handleSearch}
            className="rounded-full text-gray-600 hover:text-[#009B3E]"
            aria-label="Submit search"
          >
            <Search size={24} />
          </button>

          <button
            onClick={handleSearch}
            className="rounded-full text-gray-600 hover:text-[#009B3E]"
            aria-label="Submit Close Search"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSearchOverlay;
