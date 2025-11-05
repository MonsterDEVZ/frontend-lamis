import { FC } from 'react';
import { Button } from './Button';
import { Select, SelectOption } from './Select';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: string;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: string) => void;
  onShowMore: () => void;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  onShowMore,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="container w-full mt-50">
      <div className="flex justify-between items-center gap-5">
        {/* Блок с кнопками пагинации */}
        <div className="flex justify-center items-center gap-2 mb-4">
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

        <Button
          className="transition-all duration-500"
          variant="dark"
          size="lg"
          onClick={onShowMore}
        >
          Показать ещё
        </Button>
        {/* Выпадающий список для выбора количества отображаемых товаров */}
        <div className="w-48">
          <Select
            placeholder="Показывать по"
            intent="default"
            value={itemsPerPage}
            onChange={(val) => onItemsPerPageChange(val as string)}
          >
            <SelectOption value="12">Показывать по 12</SelectOption>
            <SelectOption value="48">Показывать по 48</SelectOption>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
