import React from 'react';

interface WarrantyCardProps {
  name: string;
  description: string;
  period: string;
}

const ShieldCheckIcon = () => (
  <svg
    className="w-6 h-6 md:w-7 md:h-7 text-green-100 group-hover:text-white transition-colors"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

export const WarrantyCard: React.FC<WarrantyCardProps> = ({ name, description, period }) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-4 md:p-6 hover:border-green-100 hover:shadow-lg transition-all duration-300 group">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-green-50 rounded-lg flex items-center justify-center mb-3 md:mb-4 group-hover:bg-green-100 transition-colors">
          <ShieldCheckIcon />
        </div>
        <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">{name}</h3>
        <p className="text-xs text-gray-500 mb-3">{description}</p>
        <p className="text-xl md:text-2xl font-bold text-green-100">{period}</p>
      </div>
    </div>
  );
};
