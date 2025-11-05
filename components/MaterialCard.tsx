import React from 'react';
import Image from 'next/image';

interface MaterialCardProps {
  title: string;
  description: string;
  fileInfo: string;
  image: string;
}

export default function MaterialCard({ title, description, fileInfo, image }: MaterialCardProps) {
  return (
    <div className="flex flex-col h-[340px] bg-gray-50 rounded-2xl overflow-hidden">
      {/* Image */}
      <div className="relative h-[150px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          quality={100}
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold mb-3 line-clamp-3 text-lg leading-[1.15] text-gray-900">
          {title}
        </h3>

        {description && (
          <p className="mb-4 flex-1 line-clamp-2 text-sm leading-[1.6] text-gray-600">
            {description}
          </p>
        )}

        <p className="mt-auto text-xs text-gray-400">
          {fileInfo}
        </p>
      </div>
    </div>
  );
}
