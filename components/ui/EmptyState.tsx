import React from 'react';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Товары не найдены',
  description = 'Попробуйте изменить фильтры или вернуться к полному каталогу',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <PackageOpen className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-md">{description}</p>
    </div>
  );
};

export default EmptyState;
