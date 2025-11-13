// Путь: components/VideoCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import { Youtube } from 'lucide-react';

interface VideoCardProps {
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  duration: string;
}

export default function VideoCard({ title, youtubeUrl, thumbnailUrl, duration }: VideoCardProps) {
  return (
    <Link
      href={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Youtube size={48} className="text-white" />
        </div>
        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded">
          {duration}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 leading-tight group-hover:text-green-600 transition-colors">
          {title}
        </h3>
      </div>
    </Link>
  );
}