'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import HeaderWithSuspense from '@/components/header/HeaderWithSuspense';
import Footer from '@/components/Footer';
import FavoriteItemCard from '@/components/ui/FavoriteItemCard';
import { Button } from '@/components/ui/Button';
import { useFavoritesStoreHydrated } from '@/hooks/useFavoritesStoreHydrated';
import { Heart, ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { productsData } from '@/data/products';
import OrderModal from '@/components/ui/OrderModal';
import { sendOrderToTelegram } from '@/lib/telegram';

export default function FavoritesPage() {
  const { favorites, toggleFavorite, clearFavorites, isHydrated } = useFavoritesStoreHydrated();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Временная отладка
  console.log('Favorites from FavoritesPage:', favorites);
  console.log('IsHydrated:', isHydrated);

  // Получаем все продукты из всех категорий
  const allProducts = useMemo(() => {
    const products = [];
    for (const category in productsData) {
      const categoryProducts = productsData[category];
      for (const product of categoryProducts) {
        // Конвертируем цену в число
        const priceNumber = parseInt(product.price.replace(/[^\d]/g, ''), 10);
        products.push({
          id: product.id,
          category: product.category,
          name: product.name,
          price: priceNumber,
          image: product.image,
          sku: product.sku,
          colors: product.colors?.map(c => c.hex) || undefined,
        });
      }
    }
    return products;
  }, []);

  // Получаем товары, которые есть в избранном
  const favoriteProducts = useMemo(() => {
    return allProducts.filter((product) => favorites.includes(String(product.id)));
  }, [favorites, allProducts]);

  const isEmpty = favoriteProducts.length === 0;

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <HeaderWithSuspense />

      <div className="flex-grow pb-24 pt-32">
        {/* Main Container with max-width and centered */}
        <div className="max-w-7xl mx-auto px-4 pt-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              {
                label: 'Главная',
                href: '',
              },
              {
                label: 'Избранное',
              },
            ]}
          />

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
                <Button variant="outline" size="lg" onClick={clearFavorites}>
                  🔧 Очистить localStorage (DEBUG)
                </Button>
              </div>
            </div>
          ) : (
            // Products List
            <>
              {/* Header with title and counter */}
              <div className="flex justify-between items-center mb-12">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Избранное</h1>
                <span className="text-gray-600">
                  Выбрано:{' '}
                  <span className="font-semibold text-gray-900">{favoriteProducts.length}</span>
                </span>
              </div>

              {/* Products List - Vertical Stack */}
              <div className="flex flex-col gap-6 mb-12">
                {favoriteProducts.map((product) => (
                  <FavoriteItemCard
                    key={product.id}
                    product={product}
                    onRemove={(id) => toggleFavorite(String(id))}
                  />
                ))}
              </div>

              {/* Bottom Pagination and Continue Button */}
              <div className="flex justify-end items-center gap-4 mt-12">
                <span className="text-gray-600">
                  Осталось: <span className="font-semibold">1/2</span>
                </span>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setIsOrderModalOpen(true)}
                >
                  Продолжить
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />

      {/* Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        items={favoriteProducts}
        onSubmit={async (data) => {
          try {
            setIsSubmitting(true);
            console.log('Отправка заказа в Telegram:', data);

            // Отправляем заказ в Telegram
            await sendOrderToTelegram(data);

            // Показываем успешное сообщение
            alert('✅ Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.');

            // Закрываем модалку
            setIsOrderModalOpen(false);

            // Очищаем избранное после успешного оформления
            clearFavorites();
          } catch (error) {
            console.error('Ошибка при отправке заказа:', error);
            alert('❌ Произошла ошибка при отправке заказа. Попробуйте еще раз.');
          } finally {
            setIsSubmitting(false);
          }
        }}
      />
    </main>
  );
}
