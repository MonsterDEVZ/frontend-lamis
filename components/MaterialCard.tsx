'use client';

import Image from 'next/image';
import { Download } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MaterialCardProps {
  title: string;
  description: string;
  fileUrl: string;
  image: string;
}

export default function MaterialCard({ title, description, fileUrl, image }: MaterialCardProps) {
  const isDirectDownload =
    fileUrl.endsWith('.zip') || fileUrl.endsWith('.rar') || fileUrl.endsWith('.7z');

  return (
    <div className="group flex flex-col bg-gray-50 rounded-2xl overflow-hidden">
      <div className="relative h-[150px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top pointer-events-none group-hover:scale-105 transition-transform duration-300"
          quality={100}
        />
      </div>

      <div className="px-4 pt-3 pb-8 flex flex-col flex-grow relative">
        <div className="flex-grow">
          <h3 className="font-semibold text-lg leading-5 text-dark-100 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 leading-4">{description}</p>
        </div>

        <div className="flex items-center justify-end">

          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={fileUrl}
                  download={isDirectDownload}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center absolute right-4 bottom-2 w-10 h-10 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-green-100 hover:text-white hover:border-green-100 transition-all duration-300"
                >
                  <Download size={20} />
                </a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Скачать файл</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}