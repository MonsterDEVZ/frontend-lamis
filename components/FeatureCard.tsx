import React from 'react';
import Image from 'next/image';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="rounded-2xl p-8 flex flex-col" style={{ backgroundColor: '#F3F4F6' }}>
      {/* Icon */}
      <div
        className="rounded-full mb-6 flex items-center justify-center"
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Image src={icon} alt="" width={32} height={32} />
      </div>

      {/* Title */}
      <h3
        className="font-bold mb-4"
        style={{
          fontSize: '20px',
          lineHeight: '1.4',
          color: '#111827',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: '#6B7280',
          whiteSpace: 'pre-line',
        }}
      >
        {description}
      </p>
    </div>
  );
}
