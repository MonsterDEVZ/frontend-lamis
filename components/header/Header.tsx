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
    title: 'Мебель для ванной',
    list: [
      {
        img: '/catalog/Lamis/Accent/1/example_for_2_image.jpg',
        href: '/catalog?collection=akcent',
        title: 'Akcent',
      },
      {
        img: '',
        href: '/catalog?collection=palermo',
        title: 'Palermo',
      },
      {
        img: '/catalog/Lamis/Lamis/for_example_1.jpg',
        href: '/catalog?collection=lamis',
        title: 'Lamis',
      },
      {
        img: '',
        href: '/catalog?collection=sevilya',
        title: 'Sevilya',
      },
      {
        img: '',
        href: '/catalog?collection=omega',
        title: 'Omega',
      },
      {
        img: '/catalog/Lamis/Deluxe/for_example.jpg',
        href: '/catalog?collection=deluxe',
        title: 'Deluxe',
      },
      {
        img: '/catalog/Lamis/Kapetown/1/for_example.jpg',
        href: '/catalog?collection=capetown',
        title: 'Capetown',
      },
      {
        img: '',
        href: '/catalog?collection=nora',
        title: 'Nora',
      },
      {
        img: '',
        href: '/catalog?collection=sanremo',
        title: 'Sanremo',
      },
      {
        img: '/catalog/Lamis/Andalusia/example_for_all.jpg',
        href: '/catalog?collection=andalusia',
        title: 'Andalusia',
      },
    ],
  },
  {
    href: '/catalog?brandId=2',
    title: 'Санфарфор',
    showPlaceholder: true,
    list: [
      {
        img: 'https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/NvCl-SINK%20(2).webp',
        href: 'https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/NvCl-SINK%20(2).webp',
        title: 'Раковины',
      },
      {
        img: 'https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/NvCl-toilet.webp',
        href: 'https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/NvCl-toilet.webp',
        title: 'Унитазы',
      },
      {
        img: 'https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/NvCl-urinal.webp',
        href: 'https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/NvCl-urinal.webp',
        title: 'Писсуары',
      },
      {
        img: 'https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/NvCl-Bidet.webp',
        href: 'https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/NvCl-Bidet.webp',
        title: 'Биде',
      },
    ],
  },
  {
    href: '/catalog?brandId=3',
    title: 'Смесители',
  },
  {
    href: '/catalog?brandId=4',
    title: 'Инсталяции',
  },
  {
    href: '/catalog?brandId=5',
    title: 'Водонагреватили (электрические)',
  },
  {
    href: '/catalog?brandId=6',
    title: 'Дизайнерские и умные зеркала',
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
  const [showPlaceholder, setShowPlaceholder] = useState(true);
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
        'z-99 w-full justify-center flex flex-col fixed transition-colors duration-300 border-b',
        isActive ? 'bg-white border-dark-50' : 'bg-transparent border-white/10'
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
      <div className="wrapper_centering w-full">
        <div className="relative flex items-center justify-between" style={{ height: '70px' }}>
          {isTablet ? (
            <MainNavigationDesc
              isActive={isActive}
              nav={nav}
              setActiveSubList={setActiveSubList}
              setShowPlaceholder={setShowPlaceholder}
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
      </div>

      {isHovered && activeSubList && (
        <NavItemMoreList activeSubList={activeSubList} showPlaceholder={showPlaceholder} />
      )}

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
