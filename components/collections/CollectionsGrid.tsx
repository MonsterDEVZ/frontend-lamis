'use client';

import { useState } from 'react';
import CollectionCard from './CollectionCard';

// 1. ИЗМЕНЕНИЕ ЗДЕСЬ: Импортируем правильный компонент { SlideshowLightbox }
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";

interface CollectionItem {
  id: string;
  imageUrl: string;
  title: string;
}

const mockCollections: CollectionItem[] = [
  { id: '1', imageUrl: '/collections/lamis.jpg', title: 'Ламис' },
  { id: '2', imageUrl: '/collections/nora.jpg', title: 'Nora' },
  { id: '3', imageUrl: '/collections/akcent.jpg', title: 'Akcent' },
  { id: '4', imageUrl: '/collections/andalusia.jpg', title: 'Andalusia' },
  { id: '5', imageUrl: '/collections/elegance.jpg', title: 'Elegance' },
  { id: '6', imageUrl: '/collections/modern.jpg', title: 'Modern' },
  { id: '7', imageUrl: '/collections/classic.jpg', title: 'Classic' },
  { id: '8', imageUrl: '/collections/minimalist.jpg', title: 'Minimalist' },
];

// Преобразуем данные в формат для лайтбокса
const images = mockCollections.map(collection => ({
  src: collection.imageUrl,
  alt: collection.title,
}));

export default function CollectionsGrid() {
  const [activePage, setActivePage] = useState(1);
  const totalPages = 5;

  // Состояние для управления лайтбоксом
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <section>
      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Коллекции</h1>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {mockCollections.map((collection, index) => (
          <div
            key={collection.id}
            className="cursor-pointer"
            onClick={() => {
              setLightboxIndex(index);
              setIsLightboxOpen(true);
            }}
          >
            <CollectionCard
              imageUrl={collection.imageUrl}
              title={collection.title}
            />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center justify-center mt-8 md:mt-12 gap-3 md:gap-4">
        {/* ... ваш код пагинации ... */}
        <div className="flex gap-1.5 md:gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors
                ${
                  activePage === page
                    ? 'bg-[#009B3E] text-white'
                    : 'border border-gray-300 text-gray-700 hover:border-[#009B3E] hover:text-[#009B3E]'
                }
              `}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="px-4 md:px-6 py-2 border border-gray-300 rounded-md text-sm md:text-base text-gray-700 hover:border-[#009B3E] hover:text-[#009B3E] transition-colors font-medium"
        >
          Показать еще
        </button>
        <button
          type="button"
          className="px-4 md:px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm md:text-base font-medium"
        >
          Показать по 12
        </button>
      </div>

      {/* 2. ИЗМЕНЕНИЕ ЗДЕСЬ: Используем правильное имя компонента SlideshowLightbox */}
      <SlideshowLightbox
        images={images}
        open={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        startingSlideIndex={lightboxIndex}
      />
    </section>
  );
}