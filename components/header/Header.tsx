'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useScroll } from '@/hooks/useScroll';
import { cn } from '@/styles';
import NavItemMoreList from './NavItemMoreList';
import BurgerMenu from './BurgerMenu';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MainNavigationDesc, TopBar } from './IsDesktop';
import { MainNavigationMob } from './IsMobile';
import {
  fetchBrands,
  fetchCollections,
  fetchCategories,
  getFirstBrandForCollection,
  getFirstCategoryForCollection,
  getFirstBrandForCategory
} from '@/services/api/products';
import MobileSearchOverlay from './MobileSearchOverlay';

/**
 * Utility function to merge new query parameters with existing ones
 * @param currentParams - Current URLSearchParams
 * @param newParamsString - New parameters as a query string (e.g., "collection=akcent")
 * @returns Complete URL with merged parameters
 */
function mergeQueryParams(currentParams: URLSearchParams, newParamsString: string): string {
  const newParams = new URLSearchParams(newParamsString);
  const merged = new URLSearchParams(currentParams);

  // Add or update parameters from the new URL
  newParams.forEach((value, key) => {
    merged.set(key, value);
  });

  return `/catalog?${merged.toString()}`;
}

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

// Initial navigation without collections (will be loaded dynamically)
// TODO: Consider using SEO-friendly URLs like /catalog/{section_slug} in the future
const initialNav = [
  {
    href: '/catalog?sectionId=1',
    title: 'Мебель для ванной',
    list: [], // Will be populated from API
  },
  {
    href: '/catalog?sectionId=2',
    title: 'Санфарфор',
    showPlaceholder: true,
    list: [
      {
        img: '',
        href: '',
        title: 'Раковины',
      },
      {
        img: '',
        href: '',
        title: 'Унитазы',
      },
      {
        img: '',
        href: '',
        title: 'Писсуары',
      },
      {
        img: '',
        href: '',
        title: 'Биде',
      },
    ],
  },
  {
    href: '/catalog?sectionId=3',
    title: 'Смесители',
  },
  {
    href: '/catalog?sectionId=4',
    title: 'Инсталяции',
  },
  {
    href: '/catalog?sectionId=5',
    title: 'Водонагреватили (электрические)',
  },
  {
    href: '/catalog?sectionId=6',
    title: 'Дизайнерские и умные зеркала',
  },
];

interface IActiveSubList {
  img: string;
  href: string;
  title: string;
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSubList, setActiveSubList] = useState<IActiveSubList[] | undefined>(undefined);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentSearchValue, setCurrentSearchValue] = useState('');
  const [nav, setNav] = useState(initialNav);
  const isTablet = useMediaQuery('(min-width: 1024px)');

  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { scrollY, scrollDirection } = useScroll();

  // НОВАЯ АРХИТЕКТУРА: Load dynamic navigation items
  useEffect(() => {
    const loadNavigationData = async () => {
      try {
        // Load collections for Section 1 "Мебель для ванной" (sectionId=1)
        const collections = await fetchCollections(1);
        const collectionItems = await Promise.all(
          collections.map(async (collection) => {
            try {
              // Get first brand and category for auto-selection
              const brand = await getFirstBrandForCollection(collection.id);
              const category = await getFirstCategoryForCollection(collection.id);

              return {
                img: collection.image || '/placeholder.webp',
                href: `/catalog?sectionId=1&brandId=${brand.id}&categoryId=${category.id}&collectionId=${collection.id}`,
                title: collection.name,
              };
            } catch (error) {
              console.error(`Failed to get auto-selection data for collection ${collection.id}:`, error);
              // Fallback to simple URL without auto-selection
              return {
                img: collection.image || '/placeholder.webp',
                href: `/catalog?sectionId=1&collectionId=${collection.id}`,
                title: collection.name,
              };
            }
          })
        );

        // Load categories for Section 2 "Санфарфор" (sectionId=2)
        const categories = await fetchCategories(2);
        const categoryItems = await Promise.all(
          categories.map(async (category) => {
            try {
              // Get first brand for auto-selection
              const brand = await getFirstBrandForCategory(category.id);

              return {
                img: category.image || '/placeholder.webp',
                href: `/catalog?sectionId=2&brandId=${brand.id}&categoryId=${category.id}`,
                title: category.name,
              };
            } catch (error) {
              console.error(`Failed to get auto-selection data for category ${category.id}:`, error);
              // Fallback to simple URL without auto-selection
              return {
                img: category.image || '/placeholder.webp',
                href: `/catalog?sectionId=2&categoryId=${category.id}`,
                title: category.name,
              };
            }
          })
        );

        // Update nav with loaded data
        setNav((prevNav) =>
          prevNav.map((item) => {
            if (item.href === '/catalog?sectionId=1') {
              return { ...item, list: collectionItems };
            }
            if (item.href === '/catalog?sectionId=2') {
              return { ...item, list: categoryItems, showPlaceholder: false };
            }
            return item;
          })
        );
      } catch (error) {
        console.error('Failed to load navigation data:', error);
      }
    };

    loadNavigationData();
  }, []);

  // Transform activeSubList to preserve existing query parameters
  const transformedActiveSubList = useMemo(() => {
    if (!activeSubList || pathname !== '/catalog') return activeSubList;

    return activeSubList.map((item) => {
      // Only transform catalog links with query params
      if (item.href.startsWith('/catalog?')) {
        const queryString = item.href.split('?')[1];
        return {
          ...item,
          href: mergeQueryParams(searchParams, queryString),
        };
      }
      return item;
    });
  }, [activeSubList, searchParams, pathname]);

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

      {isHovered && transformedActiveSubList && (
        <NavItemMoreList
          activeSubList={transformedActiveSubList}
          showPlaceholder={showPlaceholder}
        />
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
