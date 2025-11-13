import type { FC } from 'react';
import { Button } from './Button';
import { cn } from '@/styles';

export interface FilterSectionProps {
  title: string;
  items: Array<{ id: number; name: string }>;
  selectedId: number | null;
  onSelect: (id: number | null) => void;
  allLabel?: string;
  className?: string;
}

const FilterSection: FC<FilterSectionProps> = ({
  title,
  items,
  selectedId,
  onSelect,
  allLabel = 'Все',
  className,
}) => {
  return (
    <div className={cn('mt-5 first:mt-0', className)}>
      {/* Заголовок фильтра */}
      <h3 className="text-[13px] font-medium text-gray-500 mb-2.5 tracking-wide">
        {title}
      </h3>

      {/* Кнопки фильтров */}
      <div className="flex flex-wrap gap-3 md:gap-3.5">
        {/* Кнопка "Все" */}
        <Button
          className="h-8 md:h-10 py-1 md:py-2 px-3 md:px-4"
          variant={selectedId === null ? 'primary' : 'outline'}
          onClick={() => onSelect(null)}
        >
          {allLabel}
        </Button>

        {/* Остальные кнопки */}
        {items.map((item) => (
          <Button
            key={item.id}
            className="h-8 md:h-10 py-1 md:py-2 px-3 md:px-4"
            variant={selectedId === item.id ? 'primary' : 'outline'}
            onClick={() => onSelect(item.id)}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
