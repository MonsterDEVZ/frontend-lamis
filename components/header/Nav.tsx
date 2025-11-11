'use client';
import Link from 'next/link';
import { cn } from '@/styles';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  title: string;
  showPlaceholder?: boolean;
  list?: {
    img: string;
    href: string;
    title: string;
  }[];
}

interface NavProps {
  list: NavItem[];
  isDarkText?: boolean;
  onItemEnter: (item: NavItem) => void;
}

export default function Nav({ isDarkText = false, list, onItemEnter }: NavProps) {
  const pathname = usePathname();

  const linkClass = cn(
    'hover:opacity-80 transition-opacity text-[13px] leading-[1.3] font-medium hover:text-[#009b3e]',
    isDarkText ? 'text-[#1d1d1d]' : 'text-white'
  );

  return (
    <nav className="flex items-center gap-4 h-full">
      {list.map((item, idx) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            linkClass,
            'relative flex items-center justify-center h-full group text-center max-w-[115px] px-1',
            pathname === item.href ? 'text-green-100' : ''
          )}
          onMouseEnter={() => onItemEnter(item)}
        >
          {item.title}

          <div
            className={cn(
              'absolute -bottom-px bg-green-100 rounded-t-sm w-full h-1 transition-all duration-300',
              pathname === item.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            )}
          />
        </Link>
      ))}
    </nav>
  );
}
