'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, GitCompare } from 'lucide-react';
import { cn } from '@/styles';
import { useFavoritesStore } from '@/store/favoritesStore';

interface IProps {
  category: string;
  name: string;
  price: number;
  status?: string;
  image: string;
  hoverImage: string;
  colors?: string[];
  id?: string | number;
  collection?: string;
  slug?: string;
}

const CatalogCard: React.FC<IProps> = ({
  category,
  name,
  price,
  status,
  image,
  hoverImage,
  colors,
  id,
  collection = 'Caiser',
  slug,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCompared, setIsCompared] = useState(false);

  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const productId = String(id || `${category}-${name}`);
  const isFav = isFavorite(productId);

  const formattedPrice = `${price.toLocaleString('ru-RU')}`;
  const productSlug = slug || `product-${productId}`;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(productId);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCompared(!isCompared);
  };

  return (
    <div
      className="relative bg-white group cursor-pointer transition-all duration-300 hover:shadow-lg rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Link */}
      <Link href={`/product/${productSlug}`} className="block">
        {/* Image Container - 260x260px as per IDDIS */}
        <div className="relative w-full h-[260px] bg-gray-50 rounded-t-lg overflow-hidden">
          {/* Hover Image */}
          <Image
            src={hoverImage}
            alt={`${name} - вид 2`}
            fill
            sizes="260px"
            className={cn(
              'object-contain p-4 transition-opacity duration-300 ease-in-out',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          />
          {/* Main Image */}
          <Image
            src={image}
            alt={name}
            fill
            sizes="260px"
            className={cn(
              'object-contain p-4 transition-opacity duration-300 ease-in-out',
              isHovered ? 'opacity-0' : 'opacity-100'
            )}
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Collection & Category */}
          <div className="flex items-center gap-2 text-sm mb-2">
            <span className="text-gray-600 hover:text-[#009B3E] transition-colors">
              {collection}
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600 hover:text-[#009B3E] transition-colors">
              {category}
            </span>
          </div>

          {/* Price */}
          <div className="text-xl font-semibold text-gray-900 mb-3">
            {formattedPrice} ₽
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="px-4 pb-4 flex items-center gap-2">
        {/* Add to Favorites */}
        <button
          onClick={handleFavoriteClick}
          className={cn(
            'flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200',
            isFav
              ? 'bg-[#009B3E] border-[#009B3E] text-white'
              : 'border-gray-300 text-gray-600 hover:border-[#009B3E] hover:text-[#009B3E]'
          )}
          aria-label={isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
        </button>

        {/* Add to Compare */}
        <button
          onClick={handleCompareClick}
          className={cn(
            'flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200',
            isCompared
              ? 'bg-[#009B3E] border-[#009B3E] text-white'
              : 'border-gray-300 text-gray-600 hover:border-[#009B3E] hover:text-[#009B3E]'
          )}
          aria-label={isCompared ? 'Убрать из сравнения' : 'Добавить к сравнению'}
        >
          <GitCompare size={18} />
        </button>
      </div>

      {/* Status Badge (if exists) */}
      {status && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#E0398D] text-white shadow-sm">
            {status}
          </span>
        </div>
      )}
    </div>
  );
};

export default CatalogCard;
