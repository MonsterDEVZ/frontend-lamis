'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Изображение недоступно</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full bg-white rounded-lg overflow-hidden border border-gray-200">
        <Image
          src={images[selectedImage]}
          alt={`${productName} - фото ${selectedImage + 1}`}
          fill
          className="object-contain p-4"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all hover:border-[#009B3E] ${
                selectedImage === index
                  ? 'border-[#009B3E] ring-2 ring-[#009B3E] ring-offset-2'
                  : 'border-gray-200'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - миниатюра ${index + 1}`}
                fill
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
