'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import FavoriteItemCard from '@/components/ui/FavoriteItemCard';
import { Button } from '@/components/ui/Button';
import { useFavoritesStoreHydrated } from '@/hooks/useFavoritesStoreHydrated';
import { Heart, ChevronRight } from 'lucide-react';

// Mock data - в будущем заменить на реальный API запрос
const mockProducts = [
  {
    id: 'mixer-1',
    category: 'Смесители',
    name: 'Смеситель для раковины',
    price: 5999,
    status: 'Новинка',
    image: '/plumbing_section/caizer/3012.png',
    hoverImage: '/plumbing_section/caizer/3012 улучшенный.jpeg',
    colors: ['#FFFFFF', '#000000', '#C4A574'],
    sku: 'Parker PARSBO3I68',
  },
  {
    id: 'sink-1',
    category: 'Раковины',
    name: 'Раковина подвесная',
    price: 8999,
    image: '/plumbing_section/caizer/3014.png',
    hoverImage: '/plumbing_section/caizer/3014 улучшенный.jpeg',
    colors: ['#FFFFFF', '#F5F5F5'],
    sku: 'SINK-2024-001',
  },
  {
    id: 'bath-1',
    category: 'Ванны',
    name: 'Ванна акриловая',
    price: 25999,
    status: 'Хит',
    image: '/plumbing_section/caizer/3016.png',
    hoverImage: '/plumbing_section/caizer/3016 улучшенный.jpeg',
    colors: ['#FFFFFF'],
    sku: 'BATH-ACR-2024',
  },
  {
    id: 'shower-1',
    category: 'Душевые системы',
    name: 'Душевая система с тропическим душем',
    price: 15999,
    image: '/plumbing_section/caizer/3030.png',
    hoverImage: '/plumbing_section/caizer/3030 улучшенный.jpeg',
    colors: ['#C0C0C0', '#000000'],
    sku: 'SHOWER-TRP-001',
  },
  {
    id: 'mixer-2',
    category: 'Смесители',
    name: 'Смеситель для ванны',
    price: 7999,
    image: '/plumbing_section/caizer/3012.png',
    hoverImage: '/plumbing_section/caizer/3012 улучшенный.jpeg',
    colors: ['#C0C0C0', '#B8860B'],
    sku: 'MIX-BATH-2024',
  },
  {
    id: 'sink-2',
    category: 'Раковины',
    name: 'Раковина накладная',
    price: 12999,
    status: 'Новинка',
    image: '/plumbing_section/caizer/3014.png',
    hoverImage: '/plumbing_section/caizer/3014 улучшенный.jpeg',
    colors: ['#FFFFFF', '#F0E68C'],
    sku: 'SINK-SURF-2024',
  },
  {
    id: 'bath-2',
    category: 'Ванны',
    name: 'Ванна чугунная',
    price: 35999,
    image: '/plumbing_section/caizer/3016.png',
    hoverImage: '/plumbing_section/caizer/3016 улучшенный.jpeg',
    colors: ['#FFFFFF'],
    sku: 'BATH-IRON-001',
  },
  {
    id: 'shower-2',
    category: 'Душевые системы',
    name: 'Душевая кабина угловая',
    price: 18999,
    status: 'Хит',
    image: '/plumbing_section/caizer/3030.png',
    hoverImage: '/plumbing_section/caizer/3030 улучшенный.jpeg',
    colors: ['#C0C0C0', '#FFFFFF'],
    sku: 'SHOWER-CORN-001',
  },
];

export default function FavoritesPage() {
  const { favorites, toggleFavorite, clearFavorites, isHydrated } = useFavoritesStoreHydrated();

  // Временная отладка
  console.log('Favorites from FavoritesPage:', favorites);
  console.log('IsHydrated:', isHydrated);

  // Получаем товары, которые есть в избранном
  const favoriteProducts = useMemo(() => {
    return mockProducts.filter((product) => favorites.includes(product.id));
  }, [favorites]);

  const isEmpty = favoriteProducts.length === 0;

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />

      <div className="flex-grow pb-24 pt-32">
        {/* Main Container with max-width and centered */}
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-[#009B3E] transition-colors">
              Главная
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-900">Избранное</span>
          </div>

          {isEmpty ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-32 h-32 mb-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Heart size={64} className="text-gray-300" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ваш список избранного пуст</h2>
              <p className="text-gray-600 mb-8 text-center max-w-md">
                Добавьте товары в избранное, чтобы не потерять их и купить позже
              </p>
              <div className="flex gap-4">
                <Link href="/bathroom-furniture-lamis">
                  <Button variant="primary" size="lg">
                    Перейти к каталогу
                  </Button>
                </Link>
                {/* Временная кнопка для отладки */}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={clearFavorites}
                >
                  🔧 Очистить localStorage (DEBUG)
                </Button>
              </div>
            </div>
          ) : (
            // Products List
            <>
              {/* Header with title and counter */}
              <div className="flex justify-between items-center mb-12">
                <h1 className="text-5xl font-bold text-gray-900">Избранное</h1>
                <span className="text-gray-600">
                  Выбрано:{' '}
                  <span className="font-semibold text-gray-900">{favoriteProducts.length}</span>
                </span>
              </div>

              {/* Products List - Vertical Stack */}
              <div className="flex flex-col gap-6 mb-12">
                {favoriteProducts.map((product) => (
                  <FavoriteItemCard key={product.id} product={product} onRemove={toggleFavorite} />
                ))}
              </div>

              {/* Bottom Pagination and Continue Button */}
              <div className="flex justify-end items-center gap-4 mt-12">
                <span className="text-gray-600">
                  Осталось: <span className="font-semibold">1/2</span>
                </span>
                <Button variant="primary" size="lg">
                  Продолжить
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
