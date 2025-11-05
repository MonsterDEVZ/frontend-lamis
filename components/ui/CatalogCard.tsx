'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import MyIcon from '@/public/icon/heart.svg';

interface CatalogCardProps {
  category: string;
  name: string;
  price: number;
  status?: string;
  image: string;
  hoverImage: string;
}

const CatalogCard: React.FC<CatalogCardProps> = ({
  category,
  name,
  price,
  status,
  image,
  hoverImage,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formattedPrice = `${price.toLocaleString('ru-RU')}`;

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {status && (
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

      <div
        className={
          'absolute bottom-0.5 right-0 hover:[&_path]:fill-[#009B3E] transition-colors' +
          (isHovered ? ' opacity-100' : ' opacity-0')
        }
      >
        <MyIcon className="" />
      </div>

      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={hoverImage}
          alt={name}
          layout="fill"
          objectFit="contain"
          className={
            'absolute top-0 left-0 transition-all w-full h-full bg-gray-100 z-20' +
            (isHovered ? ' opacity-100' : ' opacity-0')
          }
        />

        <Image src={image} alt={name} layout="fill" objectFit="contain" />
      </div>

      <div className="mt-4 text-left">
        <div className="h-full">
          <p className="text-sm text-[#B8B8B9]">{category}</p>
          <h3 className="mt-1 text-base font-normal text-gray-900 group-hover:text-[#009B3E] transition-colors">
            {name}
          </h3>
        </div>

        <p className="mt-auto text-lg font-medium text-gray-900">
          {formattedPrice} <u>C</u>
        </p>
      </div>
    </div>
  );
};

export default CatalogCard;
