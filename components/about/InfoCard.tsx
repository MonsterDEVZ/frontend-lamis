'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface InfoCardProps {
  title: string;
  description: string;
  imageUrl: string;
  align?: 'left' | 'right' | 'center';
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, imageUrl, align = 'left' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const textAlignClass = {
    left: 'text-left',
    right: 'text-right',
    center: 'text-center',
  };

  const buttonContainerClass = {
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center',
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="relative w-full h-[300px]">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>
      <div className={`p-8 ${textAlignClass[align]}`}>
        <h3 className="text-3xl font-bold mb-4">{title}</h3>
        <div
          className="relative overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: isExpanded ? '1000px' : '90px' }}
        >
          <p className="text-gray-600 whitespace-pre-line">{description}</p>
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 w-full h-10 bg-linear-to-t from-white to-transparent"></div>
          )}
        </div>
        <div className={`mt-6 flex ${buttonContainerClass[align]}`}>
          <Button onClick={() => setIsExpanded(!isExpanded)} variant="secondary">
            {isExpanded ? 'Свернуть' : 'Читать дальше'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
