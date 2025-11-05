'use client';

import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import type { ProductColor } from '@/types/product';

interface ProductInfoProps {
  id: string | number;
  name: string;
  sku: string;
  price: string;
  shortDescription?: string;
  colors?: ProductColor[];
  isNew?: boolean;
  onAddToFavorites: () => void;
  isFavorite: boolean;
}

export default function ProductInfo({
  id,
  name,
  sku,
  price,
  shortDescription,
  colors,
  isNew,
  onAddToFavorites,
  isFavorite,
}: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(
    colors?.find((c) => c.available)?.name || null
  );

  const handleAddToCart = () => {
    console.log('Добавлен в корзину:', {
      id,
      name,
      price,
      color: selectedColor,
    });
    // TODO: Интеграция с cartStore
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        {isNew && (
          <span className="inline-block px-3 py-1 bg-[#009B3E] text-white text-sm font-medium rounded-full mb-3">
            Новинка
          </span>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {name}
        </h1>
        <p className="text-sm text-gray-500">Артикул: {sku}</p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
      </div>

      {/* Short Description */}
      {shortDescription && (
        <p className="text-gray-600 leading-relaxed">{shortDescription}</p>
      )}

      {/* Color Selection */}
      {colors && colors.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Цвет:{' '}
            {selectedColor && (
              <span className="text-gray-600">{selectedColor}</span>
            )}
          </h3>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => color.available && setSelectedColor(color.name)}
                disabled={!color.available}
                className={`w-12 h-12 rounded-full border-2 transition-all relative ${
                  selectedColor === color.name
                    ? 'border-[#009B3E] ring-2 ring-[#009B3E] ring-offset-2'
                    : 'border-gray-300 hover:border-gray-400'
                } ${!color.available ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Выбрать цвет ${color.name}`}
              >
                {!color.available && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gray-400 rotate-45"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#009B3E] text-white font-medium rounded-lg hover:bg-[#008534] transition-colors"
        >
          <ShoppingCart size={20} />
          <span>В корзину</span>
        </button>

        <button
          onClick={onAddToFavorites}
          className={`flex items-center justify-center w-14 h-14 rounded-lg border-2 transition-colors ${
            isFavorite
              ? 'border-[#009B3E] bg-[#009B3E] text-white'
              : 'border-gray-300 text-gray-600 hover:border-[#009B3E] hover:text-[#009B3E]'
          }`}
          aria-label={
            isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'
          }
        >
          <Heart
            size={24}
            className={isFavorite ? 'fill-current' : ''}
          />
        </button>
      </div>

      {/* Additional Info */}
      <div className="pt-6 border-t border-gray-200">
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2 text-gray-600">
            <svg
              className="w-5 h-5 text-[#009B3E]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Бесплатная доставка по городу
          </li>
          <li className="flex items-center gap-2 text-gray-600">
            <svg
              className="w-5 h-5 text-[#009B3E]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Гарантия качества
          </li>
          <li className="flex items-center gap-2 text-gray-600">
            <svg
              className="w-5 h-5 text-[#009B3E]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Доставка в течение 2-3 дней
          </li>
        </ul>
      </div>
    </div>
  );
}
