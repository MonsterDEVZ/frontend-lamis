import React from 'react';
import Image from 'next/image';
import { ArrowRight} from 'lucide-react';

interface ServiceCardProps {
  title: string;
  subtitle: string;
  image: string;
  onClick: () => void;
}

export default function ServiceCard({ title, subtitle, image, onClick }: ServiceCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl h-[400px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={image} alt={title} fill className="object-cover object-top" quality={100} />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8">
        <div>
          <h3
            className="text-white font-bold mb-2"
            style={{
              fontSize: '28px',
              lineHeight: '1.2',
            }}
          >
            {title}
          </h3>
          <p
            className="text-white"
            style={{
              fontSize: '14px',
              opacity: '0.9',
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Arrow Button */}
        
        <button
        onClick={onClick}
          className="flex items-center justify-center text-white hover:opacity-90 transition-all self-start bg-green-100"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <ArrowRight size={24} />
        </button>
        
      </div>
    </div>
  );
}
