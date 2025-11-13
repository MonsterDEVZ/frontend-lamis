import type { SetStateAction, FC } from 'react';
import { Menu, X, Search, Heart } from 'lucide-react';
import { cn } from '@/styles';
import Link from 'next/link';
import Image from 'next/image';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useSearchModalStore } from '@/store/searchModalStore';

interface IMainNavigationMobProps {
  setIsMobileMenuOpen: (value: SetStateAction<boolean>) => void;
  isActive: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  setIsSearchOpen: (value: SetStateAction<boolean>) => void;
}

const MainNavigationMob: FC<IMainNavigationMobProps> = ({
  setIsMobileMenuOpen,
  isActive,
  isMobileMenuOpen,
  isSearchOpen,
  setIsSearchOpen,
}) => {
  const { favorites } = useFavoritesStore();
  const favoritesCount = favorites.length;
  const { openModal } = useSearchModalStore();

  return (
    <div className="flex justify-between items-center w-full">
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <Image
          src={isActive ? '/logo-dark.svg' : '/logo-white.svg'}
          alt="LAMIS"
          width={156}
          height={32}
          priority
        />
      </Link>

      <div className="flex gap-8 items-center">
        <button
          onClick={() => openModal()}
          className={cn(
            'hover:opacity-80 transition-opacity flex items-center gap-2',
            isActive ? 'text-gray-900 hover:text-gray-700' : 'text-white'
          )}
          aria-label="Search"
        >
          <Search size={20} />
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
            <span className="absolute -top-1.5 -right-2 bg-green-100 text-white text-[10px] font-medium min-w-4 h-4 flex items-center justify-center rounded-full pointer-events-none px-0.5">
              {favoritesCount}
            </span>
          )}
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn('lg:hidden transition-colors', isActive ? 'text-gray-900' : 'text-white')}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
  );
};

export { MainNavigationMob };
