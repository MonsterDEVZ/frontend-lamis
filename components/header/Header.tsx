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
  getFirstBrandForCategory,
  getFirstBrandWithProducts,
  getFirstBrandCategoryWithProducts,
} from '@/services/api/products';
import MobileSearchOverlay from './MobileSearchOverlay';
import SearchModal from '../search/SearchModal';
import { useSearchModalStore } from '@/store/searchModalStore';

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
  {
    href: '/downloads',
    title: 'Материалы',
  },
];

const imageSecTwo = {
  bide: 'https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/NvCl-Bidet.webp',
  rakoviny: 'https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/NvCl-SINK%20(2).webp',
  unitazy: 'https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/NvCl-toilet.webp',
  urinal: 'https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/NvCl-urinal.webp',
};

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

  const { isOpen: isModalOpen, initialQuery, closeModal } = useSearchModalStore();

  const { scrollY, scrollDirection } = useScroll();

  // НОВАЯ АРХИТЕКТУРА: Load dynamic navigation items
  useEffect(() => {
    const loadNavigationData = async () => {
      try {
        // Load collections for Section 1 "Мебель для ванной" (sectionId=1)
        const collections = await fetchCollections(1);
        console.log('Loaded collections for section 1:', collections);

        // НОВОЕ: Для каждой коллекции получаем brand+category с товарами
        const collectionItems = await Promise.all(
          collections.map(async (collection) => {
            try {
              // Получаем ПЕРВЫЙ brand+category который ИМЕЕТ товары в этой коллекции
              const brandCategory = await getFirstBrandCategoryWithProducts(collection.id, 1);

              return {
                img: collection.image || 'https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/catalog/lamis-solo-1-main.webp',
                href: `/catalog?sectionId=1&brandId=${brandCategory.brand_id}&categoryId=${brandCategory.category_id}&collectionId=${collection.id}`,
                title: collection.name,
              };
            } catch (error) {
              // Если нет товаров - используем fallback (первый brand+category)
              console.warn(`No products found for collection ${collection.name}, using fallback`);
              return {
                img: collection.image || 'https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/catalog/lamis-solo-1-main.webp',
                href: `/catalog?sectionId=${collection.section}&brandId=${collection.brand}&categoryId=${collection.category}&collectionId=${collection.id}`,
                title: collection.name,
              };
            }
          })
        );

        // Load categories for Section 2 "Санфарфор" (sectionId=2)
        const categories = await fetchCategories(2);
        console.log('Loaded categories for section 2:', categories);

        // НОВОЕ: Для каждой категории получаем brand с товарами
        const categoryItems = await Promise.all(
          categories.map(async (category) => {
            try {
              // Получаем ПЕРВЫЙ бренд который ИМЕЕТ товары в этой категории
              const brand = await getFirstBrandWithProducts(category.id, 2);

              return {
                img: imageSecTwo[category.slug] || 'https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/NvCl-SINK%20(2).webp',
                href: `/catalog?sectionId=2&brandId=${brand.id}&categoryId=${category.id}`,
                title: category.name,
              };
            } catch (error) {
              // Если нет товаров - используем fallback (первый brand)
              console.warn(`No products found for category ${category.name}, using fallback`);
              return {
                img: imageSecTwo[category.slug] || 'https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/NvCl-SINK%20(2).webp',
                href: `/catalog?sectionId=${category.section}&brandId=${category.brand}&categoryId=${category.id}`,
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

      {/* Search Modal */}
      <SearchModal isOpen={isModalOpen} onClose={closeModal} initialQuery={initialQuery} />
    </motion.header>
  );
}
