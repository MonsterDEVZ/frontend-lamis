'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Search, Heart } from 'lucide-react';
import Nav from './Nav';
import { useFavoritesStoreHydrated } from '@/hooks/useFavoritesStoreHydrated';
import { useScroll } from '@/hooks/useScroll';
import { cn } from '@/styles';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { favorites, isHydrated } = useFavoritesStoreHydrated();
  const favoritesCount = favorites.length;

  // Use scroll hook to track scroll position and direction
  const { scrollY, scrollDirection } = useScroll();

  // Navbar becomes "active" (opaque) if we scroll down or are not on homepage
  const isActive = scrollY > 50 || pathname !== '/';

  // Determine if text should be dark
  const isDarkText = pathname !== '/' || scrollY > 50;

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: scrollDirection === 'down' && scrollY > 200 ? '-100%' : '0%',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        "z-50 w-full justify-center flex flex-col fixed transition-colors duration-300",
        isActive ? "bg-white shadow-md" : "bg-transparent"
      )}
    >
      {/* Top Bar */}
      <div className="border-b border-white/10 w-full">
        <div className="mx-auto flex items-stretch justify-between max-w-[1250px] h-10 px-5">
          {/* Top Left Links */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/about"
              className={cn(
                "hover:opacity-80 transition-opacity",
                isDarkText ? "text-gray-900 hover:text-gray-700" : "text-white"
              )}
              style={{ fontSize: '12px' }}
            >
              О нас
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className={cn(
                "hover:opacity-80 transition-opacity",
                isDarkText ? "text-gray-900 hover:text-gray-700" : "text-white"
              )}
              style={{ fontSize: '12px' }}
            >
              instagram
            </Link>
            <Link
              href="/contacts"
              className={cn(
                "hover:opacity-80 transition-opacity",
                isDarkText ? "text-gray-900 hover:text-gray-700" : "text-white"
              )}
              style={{ fontSize: '12px' }}
            >
              Контакты
            </Link>
          </div>

          {/* Top Right CTA */}
          <button
            className="hidden lg:block text-white font-medium hover:opacity-90 transition-all whitespace-nowrap"
            style={{
              backgroundColor: '#00D856',
              fontSize: '12px',
              padding: '8px 20px',
            }}
          >
            Сервисный центр
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={'border-b border-white/10 w-full'}>
      <div className="mx-auto max-w-[1250px] w-full">
        <div className="flex items-center justify-between relative px-5" style={{ height: '70px' }}>
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src={isDarkText ? "/logo-dark.svg" : "/logo-white.svg"}
              alt="LAMIS"
              width={156}
              height={32}
              priority
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
            <Nav isDarkText={isDarkText} />
          </div>

          {/* Right Icons */}
          <div className="w-[147px] hidden lg:flex items-center gap-4">
            <button
              className={cn(
                "hover:opacity-80 transition-opacity flex items-center gap-2",
                isDarkText ? "text-gray-900 hover:text-gray-700" : "text-white"
              )}
              aria-label="Search"
            >
              <Search size={20} />
              <span style={{ fontSize: '14px' }}>Поиск</span>
            </button>
            <Link
              href="/favorites"
              className={cn(
                "hover:opacity-80 transition-opacity relative flex items-center",
                isDarkText ? "text-gray-900 hover:text-gray-700" : "text-white"
              )}
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {isHydrated && favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#009B3E] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full pointer-events-none">
                  {favoritesCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 transition-colors",
              isDarkText ? "text-gray-900" : "text-white"
            )}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden" style={{ backgroundColor: '#000000' }}>
          <div className="mx-auto px-6 py-6" style={{ maxWidth: '1250px', width: '100%' }}>
            <nav className="flex flex-col gap-4">
              {/* Top Links */}
              <Link
                href="/about"
                className="text-white py-2 text-sm hover:opacity-80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                О нас
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-white py-2 text-sm hover:opacity-80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                instagram
              </Link>
              <Link
                href="/contacts"
                className="text-white py-2 text-sm hover:opacity-80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Контакты
              </Link>

              <div className="border-t border-white/10 my-2"></div>

              {/* Main Navigation */}
              <Link
                href="/bathroom-furniture-lamis"
                className="text-white py-3 border-b border-white/10 hover:opacity-80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Мебель для ванны Lamis
              </Link>
              <Link
                href="/plumbing-caiser"
                className="text-white py-3 border-b border-white/10 hover:opacity-80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Сантехника Caiser
              </Link>
              <Link
                href="/water-heaters"
                className="text-white py-3 border-b border-white/10 hover:opacity-80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Водонагреватели Blesk
              </Link>
              <Link
                href="/mirrors"
                className="text-white py-3 border-b border-white/10 hover:opacity-80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Дизайнерские зеркала Lamis
              </Link>

              <button
                className="mt-4 text-white py-3 rounded-md font-medium hover:opacity-90 transition-all"
                style={{ backgroundColor: '#00D856' }}
              >
                Сервисный центр
              </button>
            </nav>
          </div>
        </div>
      )}
    </motion.header>
  );
}
