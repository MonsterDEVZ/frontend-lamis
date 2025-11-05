'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import MyIcon from '@/public/icon/heart.svg';
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
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeColor, setActiveColor] = useState<string | undefined>(
    colors && colors.length > 0 ? colors[0] : undefined
  );

  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const productId = String(id || `${category}-${name}`);
  const isFav = isFavorite(productId);

  const formattedPrice = `${price.toLocaleString('ru-RU')}`;

  const isHexColor = (str: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(str);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🔍 Debugging Favorites:', { productId, isFav });
    toggleFavorite(productId);
  };

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {status && !isHovered && (
        <div
          className="absolute top-2.5 left-2.5 z-10 flex items-center px-3 py-0.5 text-sm font-medium text-white rounded-full"
          style={{ backgroundColor: '#E0398D' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-1.5"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          {status}
        </div>
      )}

      <div className="relative w-full h-72 overflow-hidden">
        <Image
          src={hoverImage}
          alt={name}
          layout="fill"
          objectFit="contain"
          className={cn(
            'absolute top-0 left-0 transition-all w-full h-full z-20 object-cover',
            isHovered ? ' opacity-100' : ' opacity-0'
          )}
        />

        <Image className={'object-cover'} src={image} alt={name} layout="fill" objectFit="contain" />
      </div>

      <div className="mt-4 text-left">
        <div className="h-full">
          <p className="text-sm text-[#B8B8B9]">{category}</p>
          <h3 className="mt-1 text-base font-normal text-gray-900 group-hover:text-[#009B3E] transition-colors">
            {name}
          </h3>
        </div>

        <div className="flex flex-col mt-2">
          <p className="text-lg font-medium text-gray-900">
            {formattedPrice} <u>C</u>
          </p>

          <button
              onClick={handleFavoriteClick}
              className={cn(
                  'p-1 transition-opacity transition-colors mt-3',
                  isFav
                      ? 'opacity-100 [&_path]:fill-[#009B3E]'
                      : 'opacity-0 group-hover:opacity-100 hover:[&_path]:fill-[#009B3E]'
              )}
              aria-label={isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            <MyIcon />
          </button>
        </div>

        {colors && colors.length > 0 && (
          <div className="flex gap-2 mt-2">
            {colors.map((color, index) => (
              <div
                key={index}
                className={cn(
                  'w-6 h-6 rounded-full cursor-pointer shrink-0 p-0.5',
                  activeColor === color && 'border-2 border-[#009B3E]'
                )}
                onClick={() => setActiveColor(color)}
              >
                {!isHexColor(color) ? (
                  <Image
                    src={color}
                    alt={`Color ${index}`}
                    width={22}
                    height={22}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div
                    className="w-full h-full rounded-full"
                    style={isHexColor(color) ? { backgroundColor: color } : {}}
                  ></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogCard;
