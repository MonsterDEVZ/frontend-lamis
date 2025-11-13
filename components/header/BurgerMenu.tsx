'use client';

import Link from 'next/link';
import type { SetStateAction, FC } from 'react';
import { useState, useMemo } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams, usePathname } from 'next/navigation';

/**
 * Utility function to merge new query parameters with existing ones
 */
function mergeQueryParams(currentParams: URLSearchParams, newParamsString: string): string {
  const newParams = new URLSearchParams(newParamsString);
  const merged = new URLSearchParams(currentParams);

  newParams.forEach((value, key) => {
    merged.set(key, value);
  });

  return `/catalog?${merged.toString()}`;
}

interface IProps {
  setIsMobileMenuOpen: (value: SetStateAction<boolean>) => void;

  nav: {
    href: string;
    title: string;
    list?: {
      img: string;
      href: string;
      title: string;
    }[];
  }[];
  mini_nav: {
    href: string;
    title: string;
    target?: boolean;
  }[];
}

type NavItem = IProps['nav'][0];

const BurgerMenu: FC<IProps> = ({ setIsMobileMenuOpen, nav, mini_nav }) => {
  const [activeSubMenu, setActiveSubMenu] = useState<NavItem | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Transform submenu items to preserve query parameters
  const transformedSubMenu = useMemo(() => {
    if (!activeSubMenu || pathname !== '/catalog') return activeSubMenu;

    return {
      ...activeSubMenu,
      list: activeSubMenu.list?.map((item) => {
        if (item.href.startsWith('/catalog?')) {
          const queryString = item.href.split('?')[1];
          return {
            ...item,
            href: mergeQueryParams(searchParams, queryString),
          };
        }
        return item;
      }),
    };
  }, [activeSubMenu, searchParams, pathname]);

  if (transformedSubMenu) {
    // Sub-menu View
    return (
      <div className="bg-white py-6 min-h-screen border-t border-[#1d1d1d1a]">
        {/* Sub-menu Header */}
        <div
          className="flex items-center px-5 cursor-pointer"
          onClick={() => setActiveSubMenu(null)}
          style={{ paddingBottom: '24px' }}
        >
          <button className="p-2 -ml-2 transition-colors" aria-label="Go back">
            <ChevronLeft size={24} className="text-green-100" />
          </button>
          <h2 className="text-lg font-bold text-green-100 ml-2">{transformedSubMenu.title}</h2>
        </div>

        {/* Sub-menu List */}
        <div className="flex flex-col gap-5 border-t border-[#1d1d1d1a] px-5 pt-6">
          {transformedSubMenu.list?.map((item) => (
            <Link
              key={item.href + item.title}
              href={item.href}
              onClick={handleLinkClick}
              className="flex items-center gap-4 group"
            >
              {item.img ? (
                <Image
                  src={item.img}
                  alt={item.title}
                  width={44}
                  height={44}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-100 rounded-full shrink-0"></div>
              )}
              <span className="text-[#1d1d1d] text-base group-hover:text-[#009B3E] transition-colors">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Main Menu View
  return (
    <div className="bg-white px-5 py-6 min-h-screen font-bold border-t border-[#1d1d1d1a]">
      <nav className="flex flex-col gap-6">
        {/* Main Nav */}
        {nav.map((item) => (
          <div key={item.href} className="flex items-center justify-between group">
            <Link
              href={item.href}
              onClick={handleLinkClick}
              className="text-dark-100 hover:text-[#009B3E] transition-colors"
              style={{ fontSize: '18px' }}
            >
              {item.title}
            </Link>
            {item.list && (
              <button
                onClick={() => setActiveSubMenu(item)}
                aria-label={`Open ${item.title} submenu`}
              >
                <ChevronRight size={24} className="text-green-100" />
              </button>
            )}
          </div>
        ))}

        {/* Mini Nav */}
        <div className="flex flex-col gap-6">
          {mini_nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.target ? '_blank' : undefined}
              rel={item.target ? 'noopener noreferrer' : undefined}
              onClick={handleLinkClick}
              className="block text-dark-100 hover:text-[#009B3E] transition-colors"
              style={{ fontSize: '18px' }}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default BurgerMenu;
