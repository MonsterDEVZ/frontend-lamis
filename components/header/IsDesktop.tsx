import type { FC, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Heart } from 'lucide-react';
import Nav from './Nav';
import { cn } from '@/styles';
import { useFavoritesStore } from '@/store/favoritesStore';
import SearchInput from './SearchInput';

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
        <Link
          href="/service-center"
          className="text-white font-medium hover:opacity-90 transition-all whitespace-nowrap px-5 h-8 text-sm bg-green-100 flex items-center justify-center"
        >
          Сервисный центр
        </Link>
      </div>
    </div>
  );
};

interface IMainNavigationDescProps {
  isActive: boolean;
  nav: {
    href: string;
    title: string;
    showPlaceholder?: boolean;
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
  setShowPlaceholder: (value: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
  currentSearchValue: string;
  onSearchValueChange: (value: string) => void;
}

const MainNavigationDesc: FC<IMainNavigationDescProps> = ({
  isActive,
  nav,
  setActiveSubList,
  setShowPlaceholder,
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
            onItemEnter={(item) => {
              setActiveSubList(item.list);
              setShowPlaceholder(item.showPlaceholder !== false);
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        {isSearchOpen ? (
          <div className="w-80">
            <SearchInput
              className="w-full"
              onClose={() => setIsSearchOpen(false)}
            />
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
