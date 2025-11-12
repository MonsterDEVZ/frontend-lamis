'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/styles';

interface Product {
  id: string | number;
  category: string;
  name: string;
  price: number;
  image: string;
  colors?: string[];
  sku?: string;
}

interface FavoriteItemCardProps {
  product: Product;
  onRemove: (productId: string | number) => void;
}

const FavoriteItemCard: React.FC<FavoriteItemCardProps> = ({ product, onRemove }) => {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );

  const formattedPrice = `${product.price.toLocaleString('ru-RU')}`;
  const isHexColor = (str: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(str);
  const colors = product.colors || ['#FFFFFF', '#000000', '#C4A574'];

  return (
    // --- ИЗМЕНЕНИЕ 1: Основной контейнер ---
    // p-4 и flex-col для мобильных, p-8 и lg:flex-row для десктопов
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-4 relative hover:shadow-sm transition-shadow lg:flex-row lg:items-center lg:gap-8 lg:p-8">
      
      {/* Image Section */}
      {/* --- ИЗМЕНЕНИЕ 2: Адаптивный размер картинки --- */}
      {/* w-full и h-56 для мобильных, lg:w-64 и lg:h-64 для десктопов */}
      <div className="relative w-full h-56 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden lg:w-64 lg:h-64 lg:flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4"
        />
      </div>

      {/* Product Info Section */}
      <div className="flex-grow flex flex-col justify-center">
        <p className="text-sm text-gray-400 mb-1">
          {product.sku || 'Parker PARSBO3I68'}
        </p>
        {/* --- ИЗМЕНЕНИЕ 3: Уменьшен отступ для мобильных --- */}
        <h3 className="text-xl font-normal text-gray-900 mb-4 lg:mb-6">{product.name}</h3>
        <div className="flex items-center gap-3">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(color)}
              className={cn(
                'w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center',
                selectedColor === color
                  ? 'border-[#009B3E]'
                  : 'border-gray-300 hover:border-gray-400'
              )}
            >
              {!isHexColor(color) ? (
                <Image
                  src={color}
                  alt={`Color ${index}`}
                  width={24}
                  height={24}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: color }}
                ></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price Section */}
      {/* --- ИЗМЕНЕНИЕ 4: Адаптивное выравнивание и размер шрифта --- */}
      <div className="w-full text-right lg:w-auto lg:text-left lg:flex-shrink-0">
        <p className="text-2xl font-bold text-gray-900 lg:text-3xl">
          {formattedPrice} <span className="text-xl font-normal lg:text-2xl">С</span>
        </p>
      </div>

      {/* Remove Button */}
      {/* --- ИЗМЕНЕНИЕ 5: Адаптивные отступы для кнопки --- */}
      <button
        onClick={() => onRemove(product.id)}
        className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors lg:top-6 lg:right-6"
        aria-label="Удалить из избранного"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default FavoriteItemCard;