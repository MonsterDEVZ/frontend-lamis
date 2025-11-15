'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface VideoCardProps {
  videoId: string;
  title: string;
}

export default function VideoCard({ videoId, title }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageError, setImageError] = useState(false);

  // YouTube thumbnail URL - maxresdefault дает лучшее качество
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  if (isPlaying) {
    // Показать embedded YouTube плеер при клике
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col group">
        <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="p-4 flex-grow">
          <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm md:text-base">
            {title}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col group cursor-pointer">
      {/* Video Preview Container */}
      <div
        className="relative w-full bg-gray-900 overflow-hidden"
        style={{ paddingBottom: '56.25%' }}
        onClick={handlePlayClick}
      >
        {/* Thumbnail Image */}
        <Image
          src={imageError ? fallbackThumbnail : thumbnailUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
        />

        {/* Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
            <Play className="w-8 h-8 md:w-10 md:h-10 text-gray-900 fill-gray-900 ml-1" />
          </div>
        </div>

        {/* Duration badge (опционально, если есть данные) */}
        {/* <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          10:24
        </div> */}
      </div>

      {/* Video Title */}
      <div className="p-4 flex-grow bg-white">
        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm md:text-base group-hover:text-green-600 transition-colors">
          {title}
        </h3>
      </div>
    </div>
  );
}
