import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/styles';

const breadcrumbsContainerVariants = cva('wrapper_centering', {
  variants: {
    resetPosition: {
      false: 'absolute top-[120px] left-1/2 -translate-x-1/2 z-10 w-full',
      true: 'px-0!',
    },
  },
  defaultVariants: {
    resetPosition: false,
  },
});

interface BreadcrumbItem {
  /** Текст элемента "хлебной крошки". */
  label: string;
  /** URL для ссылки. Если не указан, элемент будет некликабельным (для текущей страницы). */
  href?: string;
}

interface BreadcrumbsProps extends VariantProps<typeof breadcrumbsContainerVariants> {
  /** Массив объектов для построения навигационной цепочки. */
  items: BreadcrumbItem[];
  /** Цветовая схема. 'dark' для темного текста, 'light' для белого. По умолчанию 'dark'. */
  variant?: 'light' | 'dark';
  /** Дополнительные CSS-классы для кастомизации контейнера. */
  className?: string;
}

/**
 * Универсальный компонент "хлебных крошек" для навигации по сайту.
 * Поддерживает две цветовые схемы, абсолютное и статическое позиционирование.
 *
 * @param props - Пропсы компонента.
 * @returns JSX.Element
 *
 * @example
 * // Стандартное использование (темный текст, абсолютная позиция)
 * <Breadcrumbs
 *   items={[
 *     { label: 'Главная', href: '/' },
 *     { label: 'Каталог' },
 *   ]}
 * />
 *
 * @example
 * // Светлая тема на темном фоне
 * <Breadcrumbs
 *   variant="light"
 *   items={[
 *     { label: 'Главная', href: '/' },
 *     { label: 'Каталог' },
 *   ]}
 * />
 *
 * @example
 * // Сброс позиции и добавление своих стилей
 * <Breadcrumbs
 *   resetPosition={true}
 *   className="my-4"
 *   items={[
 *     { label: 'Главная', href: '/' },
 *     { label: 'Профиль' },
 *   ]}
 * />
 */
export default function Breadcrumbs({
  items,
  variant = 'dark',
  className,
  resetPosition,
}: BreadcrumbsProps) {
  const isLight = variant === 'light';

  const linkColor = isLight
    ? 'text-white/70 hover:text-white'
    : 'text-gray-600 hover:text-[#009B3E]';
  const textColor = isLight ? 'text-white' : 'text-gray-900';
  const separatorColor = isLight ? 'text-white/50' : 'text-gray-400';

  return (
    <div className={cn(breadcrumbsContainerVariants({ resetPosition, className }))}>
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {item.href ? (
                <Link href={item.href} className={cn('transition-colors', linkColor)}>
                  {item.label}
                </Link>
              ) : (
                <span className={textColor} aria-current="page">
                  {item.label}
                </span>
              )}
              {index < items.length - 1 && (
                <ChevronRight size={16} className={separatorColor} aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
