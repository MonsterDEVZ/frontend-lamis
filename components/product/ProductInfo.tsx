'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
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
  material?: string;
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
  material = 'Сантехнический фарфор',
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
    <div className="flex flex-col">
      {/* Title and SKU */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}, {sku}</h1>

      {/* Price Section */}
      <div className="mb-6 mt-4">
        <p className="text-sm text-gray-600 mb-1">
          Рекомендованная розничная цена
        </p>
        <div className="text-3xl font-bold text-gray-900">{price}</div>
      </div>

      {/* Material */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-1">Материал</p>
        <p className="text-base font-medium text-gray-900">{material}</p>
      </div>

      {/* Color Selection */}
      {colors && colors.length > 0 && (
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-3">Цвет</p>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => color.available && setSelectedColor(color.name)}
                disabled={!color.available}
                className={`w-10 h-10 rounded-full border-2 transition-all relative ${
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
          className="flex-1 px-8 py-3 bg-[#009B3E] text-white font-medium rounded-lg hover:bg-[#008534] transition-colors"
        >
          Заказать
        </button>

        <button
          onClick={onAddToFavorites}
          className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
            isFavorite
              ? 'border-[#009B3E] bg-[#009B3E] text-white'
              : 'border-gray-300 text-gray-600 hover:border-[#009B3E] hover:text-[#009B3E]'
          }`}
          aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
        </button>
      </div>
    </div>
  );
}
