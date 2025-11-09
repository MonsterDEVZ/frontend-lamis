'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useScroll } from '@/hooks/useScroll';
import { cn } from '@/styles';
import NavItemMoreList from './NavItemMoreList';
import BurgerMenu from './BurgerMenu';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MainNavigationDesc, TopBar } from './IsDesktop';
import { MainNavigationMob } from './IsMobile';
import MobileSearchOverlay from './MobileSearchOverlay';

const mini_nav = [
  {
    href: '/about',
    title: 'О нас',
  },
  {
    href: 'https://www.instagram.com/lamis_kgz/',
    title: 'instagram',
    target: true,
  },
  {
    href: '/contacts',
    title: 'Контакты',
  },
];

const nav = [
  {
    href: '/catalog?brandId=1',
    title: 'Мебель для ванны Lamis',
    list: [
      {
        img: '',
        href: '',
        title: 'Смесители для ванной',
      },
      {
        img: '',
        href: '',
        title: 'Душевые системы',
      },
      {
        img: '',
        href: '',
        title: 'Смесители для кухни',
      },
      {
        img: '',
        href: '',
        title: 'Санитарный фарфор и сиденья',
      },
      {
        img: '',
        href: '',
        title: 'Мебель и зеркала',
      },
      {
        img: '',
        href: '',
        title: 'Аксессуары для душа',
      },
      {
        img: '',
        href: '',
        title: 'Мойки',
      },
      {
        img: '',
        href: '',
        title: 'Инсталляции и клавиши',
      },
    ],
  },
  {
    href: '/catalog?brandId=2',
    title: 'Сантехника Caizer',
  },
  {
    href: '/catalog?brandId=3',
    title: 'Водонагреватели Blesk',
  },
  {
    href: '/catalog?brandId=1&categoryId=mirrors',
    title: 'Дизайнерские зеркала Lamis',
  },
];

interface IActiveSubList {
  img: string;
  href: string;
  title: string;
}

const transparentHeaderPaths = ['/', '/bathroom-furniture-lamis', '/about'];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSubList, setActiveSubList] = useState<IActiveSubList[] | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentSearchValue, setCurrentSearchValue] = useState('');
  const isTablet = useMediaQuery('(min-width: 1024px)');

  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const { scrollY, scrollDirection } = useScroll();

  // Paths that should have a transparent header when at the top of the page.
  const transparentHeaderPaths = ['/'];

  const isActive =
    !transparentHeaderPaths.includes(pathname) ||
    scrollY > 50 ||
    isHovered ||
    isMobileMenuOpen ||
    isSearchOpen;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchOpen &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node) &&
        currentSearchValue === ''
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen, currentSearchValue]);

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: 0 }}
      animate={{
        y: scrollDirection === 'down' && scrollY > 200 ? '-100%' : '0%',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'z-50 w-full justify-center flex flex-col fixed transition-colors duration-300 border-b',
        isActive ? 'bg-white border-[#1d1d1d1a]' : 'bg-transparent border-white/10'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveSubList(undefined);
        if (currentSearchValue === '') {
          setIsSearchOpen(false);
        }
      }}
    >
      {/* Top Bar */}
      {isTablet ? <TopBar mini_nav={mini_nav} isActive={isActive} /> : null}

      {/* Main Navigation */}
      <div className="w-full">
        <div className="wrapper_centering w-full">
          <div className="relative flex items-center justify-between" style={{ height: '70px' }}>
            {isTablet ? (
              <MainNavigationDesc
                isActive={isActive}
                nav={nav}
                setActiveSubList={setActiveSubList}
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
                currentSearchValue={currentSearchValue}
                onSearchValueChange={setCurrentSearchValue}
              />
            ) : (
              <MainNavigationMob
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                isActive={isActive}
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
              />
            )}
          </div>

          {/* Nav Item More List */}
        </div>
      </div>

      {isHovered && activeSubList && <NavItemMoreList activeSubList={activeSubList} />}

      {/* Mobile Search Overlay */}
      {isSearchOpen && !isTablet && (
        <MobileSearchOverlay
          setIsSearchOpen={setIsSearchOpen}
          currentSearchValue={currentSearchValue}
          onSearchValueChange={setCurrentSearchValue}
        />
      )}

      {/* Mobile Menu */}
      {!isTablet && isMobileMenuOpen ? (
        <BurgerMenu setIsMobileMenuOpen={setIsMobileMenuOpen} mini_nav={mini_nav} nav={nav} />
      ) : null}
    </motion.header>
  );
}
