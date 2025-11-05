import React from 'react';

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * SectionHeading Component
 * Reusable heading component for section titles
 * Exact specification: font-size: 42px, font-weight: bold
 */
export default function SectionHeading({ children, className = '' }: SectionHeadingProps) {
  return (
    <h2
      className={`font-bold text-gray-900 mb-8 ${className}`}
      style={{
        fontSize: '42px',
        lineHeight: '1.2',
      }}
    >
      {children}
    </h2>
  );
}
