'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto" style={{ maxWidth: '1250px', width: '100%', padding: '0 40px' }}>
        <div className="flex items-center justify-between" style={{ height: '80px' }}>
          {/* Logo */}
          <Link
            href="/"
            className="text-white font-bold hover:opacity-80 transition-opacity"
            style={{ fontSize: '24px', letterSpacing: '0.1em' }}
          >
            LAMIS
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center mx-12">
            <Link
              href="/bathroom-furniture"
              className="text-white hover:opacity-80 transition-opacity whitespace-nowrap"
              style={{ fontSize: '14px' }}
            >
              Мебель для ванны<br />Lamis
            </Link>
            <Link
              href="/plumbing-caiser"
              className="text-white hover:opacity-80 transition-opacity whitespace-nowrap"
              style={{ fontSize: '14px' }}
            >
              Сантехника<br />Caiser
            </Link>
            <Link
              href="/water-heaters"
              className="text-white hover:opacity-80 transition-opacity whitespace-nowrap"
              style={{ fontSize: '14px' }}
            >
              Водонагреватели<br />Blesk
            </Link>
            <Link
              href="/mirrors"
              className="text-white hover:opacity-80 transition-opacity whitespace-nowrap"
              style={{ fontSize: '14px' }}
            >
              Дизайнерские<br />зеркала Lamis
            </Link>
          </nav>

          {/* CTA Button - Desktop */}
          <button
            className="hidden lg:block text-white font-medium hover:opacity-90 transition-all whitespace-nowrap"
            style={{
              backgroundColor: '#00D856',
              fontSize: '14px',
              padding: '12px 24px',
              borderRadius: '8px',
            }}
          >
            Сервисный центр
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-md">
          <div className="mx-auto px-6 py-6" style={{ maxWidth: '1250px', width: '100%' }}>
            <nav className="flex flex-col gap-4">
              <Link
                href="/bathroom-furniture"
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
              <button className="mt-4 bg-[#00D856] text-white py-3 rounded-md font-medium hover:bg-[#00C24D] transition-colors">
                Сервисный центр
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
