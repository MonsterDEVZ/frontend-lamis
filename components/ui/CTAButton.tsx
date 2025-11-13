import React from 'react';

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function CTAButton({ children, onClick, className = '' }: CTAButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-white font-medium hover:opacity-90 transition-all bg-green-100 ${className}`}
      style={{
        fontSize: '14px',
        padding: '16px 48px',
        borderRadius: '100px',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}
