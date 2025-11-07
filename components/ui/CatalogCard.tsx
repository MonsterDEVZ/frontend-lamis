'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { cn } from '@/styles';
import { useFavoritesStoreHydrated } from '@/hooks/useFavoritesStoreHydrated';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

  const { toggleFavorite, isFavorite, isHydrated } = useFavoritesStoreHydrated();
  const productId = String(id || `${category}-${name}`);
  const isFav = isHydrated ? isFavorite(productId) : false;

  const formattedPrice = `${price.toLocaleString('ru-RU')}`;
  const productSlug = slug || `product-${productId}`;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(productId);
  };

  return (
    <div
      className="relative bg-white group cursor-pointer transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Link */}
      <Link href={`/product/${productSlug}`} className="block">
        {/* Image Container - 260x260px as per IDDIS */}
        {/* bg-gray-50 */}
        <div className="relative w-full h-[260px] bg-transparent overflow-hidden">
          {/* Hover Image */}
          <Image
            src={hoverImage}
            alt={`${name} - вид 2`}
            fill
            sizes="260px"
            className={cn(
              'object-cover p-0 transition-opacity duration-300 ease-in-out',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
            // style={{padding: "0"}}
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
          {/* Brand Name - Design Spec: #B8B8B9, 16px, 500, 24px line-height */}
          <div className="mb-2">
            <span className="text-[#B8B8B9] text-base font-medium leading-6">{collection}</span>
          </div>

          {/* Product Name - Design Spec: 16px, 500, 24px line-height, hover: #009B3E */}
          <h3 className="text-base font-medium leading-6 transition-colors group-hover:text-[#009B3E] mb-2">
            {name}
          </h3>

          {/* Price */}
          <div className="text-xl font-semibold text-gray-900 mb-3">
            {formattedPrice} <u className="underline">С</u>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="px-4 pb-4 flex items-center gap-2">
        {/* Add to Favorites */}
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>{isFav ? 'Удалить из избранного' : 'Добавить в избранное'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
