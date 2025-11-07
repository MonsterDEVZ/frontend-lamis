'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface IProps {
  title: string;
  description: string;
  imageUrl: string;
}

const InfoCardAccordion: React.FC<IProps> = ({ title, description, imageUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white overflow-hidden">
      <div className="relative w-full h-[350px] rounded-2xl overflow-hidden">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>

      <div className="text-left">
        <h3 className="text-[22px] leading-8 font-bold mt-8">{title}</h3>

        <div
          className="relative overflow-hidden transition-all duration-500 ease-in-out mt-5"
          style={{ maxHeight: isExpanded ? '1000px' : '90px' }}
        >
          <p
            className="text-[#1d1d1d] text-sm leading-6 font-medium"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {!isExpanded && (
            <div className="absolute bottom-0 left-0 w-full h-10 bg-linear-to-t from-white to-transparent"></div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline_gr"
            className="px-6 h-12"
          >
            {isExpanded ? 'Свернуть' : 'Читать дальше'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoCardAccordion;
