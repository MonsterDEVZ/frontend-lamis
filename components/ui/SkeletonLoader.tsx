import type { FC } from 'react';
import { cn } from '@/styles';

export interface SkeletonLoaderProps {
  isLoading: boolean;
  text?: string;
}

const SkeletonLoader: FC<SkeletonLoaderProps> = ({
  isLoading,
  text = 'Загрузка...',
}) => {
  if (!isLoading) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[999] flex items-center justify-center',
        'bg-white/70 backdrop-blur-sm',
        'transition-all duration-300',
        isLoading ? 'opacity-100 visible' : 'opacity-0 invisible'
      )}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-green-100 rounded-full animate-spin" />

        {/* Loading Text */}
        <p className="text-sm font-medium text-gray-600 m-0">{text}</p>
      </div>
    </div>
  );
};

export default SkeletonLoader;
