import type { FC } from 'react';
import { Button } from './Button';
import { cn } from '@/styles';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={cn('flex justify-center items-center gap-2', className)}>
      {/* Блок с кнопками пагинации */}
      {pages.map((num) => (
        <Button
          key={num}
          variant={num === currentPage ? 'primary' : 'outline'}
          size="icon"
          onClick={() => onPageChange(num)}
        >
          {num}
        </Button>
      ))}
    </div>
  );
};

export default PaginationControls;
