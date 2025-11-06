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
      <div className="flex items-stretch justify-between max-w-[1250px] mx-auto px-5">
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
        <button
          className="text-white font-medium hover:opacity-90 transition-all whitespace-nowrap px-5 h-8 text-sm"
          style={{
            backgroundColor: '#009b3e',
          }}
        >
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
}

const MainNavigationDesc: FC<IMainNavigationDescProps> = ({ isActive, nav, setActiveSubList }) => {
  const { favorites } = useFavoritesStore();
  const favoritesCount = favorites.length;

  return (
    <div className="flex items-center justify-between w-full h-full">
      <div className="flex items-center gap-[46px] h-full">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src={isActive ? '/logo-dark.svg' : '/logo-white.svg'}
            alt="LAMIS"
            width={156}
            height={32}
            priority
          />
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="block h-full">
          <Nav
            isDarkText={isActive}
            list={nav}
            onItemEnter={(item) => setActiveSubList(item.list)}
          />
        </div>
      </div>

      {/* Right Icons */}
      <div className="w-[147px] flex items-center gap-4">
        <button
          className={cn(
            'hover:opacity-80 transition-opacity flex items-center gap-2',
            isActive ? 'text-gray-900 hover:text-gray-700' : 'text-white'
          )}
          aria-label="Search"
        >
          <Search size={20} />
          <span style={{ fontSize: '14px' }}>Поиск</span>
        </button>
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
            <span className="absolute -top-1.5 -right-2 bg-[#009B3E] text-white text-[10px] font-medium min-w-4 h-4 flex items-center justify-center rounded-full pointer-events-none px-0.5">
              {favoritesCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export { TopBar, MainNavigationDesc };
