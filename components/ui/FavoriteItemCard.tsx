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

  // Моковые цвета если не переданы
  const colors = product.colors || ['#FFFFFF', '#000000', '#C4A574'];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 flex items-center gap-8 relative hover:shadow-sm transition-shadow">
      {/* Image Section */}
      <div className="relative w-64 h-64 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4"
        />
      </div>

      {/* Product Info Section */}
      <div className="flex-grow flex flex-col justify-center">
        {/* SKU */}
        <p className="text-sm text-gray-400 mb-1">
          {product.sku || 'Parker PARSBO3I68'}
        </p>

        {/* Product Name */}
        <h3 className="text-xl font-normal text-gray-900 mb-6">{product.name}</h3>

        {/* Color Selection */}
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
      <div className="flex-shrink-0">
        <p className="text-3xl font-bold text-gray-900">
          {formattedPrice} <span className="text-2xl font-normal">С</span>
        </p>
      </div>

      {/* Remove Button - Positioned absolutely in top-right */}
      <button
        onClick={() => onRemove(product.id)}
        className="absolute top-6 right-6 p-1 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Удалить из избранного"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default FavoriteItemCard;
