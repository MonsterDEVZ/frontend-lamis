import type { FC, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Heart } from 'lucide-react';
import Nav from './Nav';
import { cn } from '@/styles';
import { useFavoritesStore } from '@/store/favoritesStore';

interface ITopBarProps {
  isActive: boolean;
  mini_nav: {
    href: string;
    title: string;
    target?: boolean;
  }[];
}

const TopBar: FC<ITopBarProps> = ({ mini_nav, isActive }) => {
  return (
    <div className={cn('border-b border-white/10 w-full h-8', isActive ? 'bg-[#272b2b]' : '')}>
      <div className="flex items-stretch justify-between wrapper_centering px-5">
        {/* Top Left Links */}
        <div className="flex items-center gap-6">
          {mini_nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="opacity-70 hover:opacity-100 transition-opacity text-xs text-white"
              target={item.target ? '_blank' : undefined}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Top Right CTA */}
        <button className="text-white font-medium hover:opacity-90 transition-all whitespace-nowrap px-5 h-8 text-sm bg-green-100">
          Сервисный центр
        </button>
      </div>
    </div>
  );
};

interface IMainNavigationDescProps {
  isActive: boolean;
  nav: {
    href: string;
    title: string;
    list?: {
      img: string;
      href: string;
      title: string;
    }[];
  }[];
  setActiveSubList: (
    value: SetStateAction<
      | {
          img: string;
          href: string;
          title: string;
        }[]
      | undefined
    >
  ) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
  currentSearchValue: string;
  onSearchValueChange: (value: string) => void;
}

const MainNavigationDesc: FC<IMainNavigationDescProps> = ({
  isActive,
  nav,
  setActiveSubList,
  isSearchOpen,
  setIsSearchOpen,
  currentSearchValue,
  onSearchValueChange,
}) => {
  const { favorites } = useFavoritesStore();
  const favoritesCount = favorites.length;

  return (
    <div className="flex items-center justify-between gap-5 w-full h-full">
      <div className="flex items-center gap-[46px] h-full">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src={isActive ? '/logo-dark.svg' : '/logo-white.svg'}
            alt="LAMIS"
            width={156}
            height={32}
            priority
          />
        </Link>

        <div className="block h-full">
          <Nav
            isDarkText={isActive}
            list={nav}
            onItemEnter={(item) => setActiveSubList(item.list)}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        {isSearchOpen ? (
          <div className="relative w-60">
            <input
              type="text"
              value={currentSearchValue}
              onChange={(e) => onSearchValueChange(e.target.value)}
              placeholder="Поиск..."
              className={cn(
                'w-full h-10 pl-4 pr-10 rounded-full border transition-colors duration-300',
                'focus:outline-none focus:ring-2 focus:ring-green-100',
                isActive
                  ? 'bg-white border-gray-300 text-gray-900'
                  : 'bg-transparent border-white/50 text-white placeholder:text-white/70'
              )}
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className={cn(
                'absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors',
                isActive ? 'text-gray-600 hover:bg-gray-100' : 'text-white/80 hover:bg-white/20'
              )}
              aria-label="Close search"
            >
              <Search size={20} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsSearchOpen(true)}
            className={cn(
              'hover:opacity-80 transition-opacity flex items-center gap-2',
              isActive ? 'text-gray-900 hover:text-gray-700' : 'text-white'
            )}
            aria-label="Search"
          >
            <Search size={20} />
            <span style={{ fontSize: '14px' }}>Поиск</span>
          </button>
        )}

        <Link
          href="/favorites"
          className={cn(
            'hover:opacity-80 transition-opacity relative flex items-center',
            isActive ? 'text-gray-900 hover:text-gray-700' : 'text-white'
          )}
          aria-label="Wishlist"
        >
          <Heart size={20} />
          {favoritesCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-green-100 text-white text-[10px] font-medium min-w-4 h-4 flex items-center justify-center rounded-full pointer-events-none px-0.5">
              {favoritesCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export { TopBar, MainNavigationDesc };
