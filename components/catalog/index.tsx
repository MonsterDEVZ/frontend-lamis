'use client';
import { useState, useMemo, type FC } from 'react';
import Header from '@/components/Header';
import CatalogCard from '@/components/ui/CatalogCard';
import { Button } from '@/components/ui/Button';
import { Select, SelectOption } from '../ui/Select';
import PaginationControls from '../ui/PaginationControls';
import { productsData } from '@/data/products';
import { useFiltersStore } from '@/store/filtersStore';

const tabs = [
  { label: 'Все', value: 'all' },
  { label: 'Умные водонагреватели', value: 'heaters' },
  { label: 'Зеркала Lamis', value: 'mirrors' },
  { label: 'Умные водонагреватели Blesk', value: 'blesk' },
  { label: 'Сантехника Caizer', value: 'caizer' },
  { label: 'Мебель для ванн Lamis', value: 'furniture' },
];

// Маппинг категорий к ключам productsData
const categoryKeyMap: Record<string, string> = {
  heaters: 'heaters',
  mirrors: 'mirrors',
  blesk: 'blesk',
  caizer: 'caizer',
  furniture: 'furniture',
};

const Catalog: FC = () => {
  // Подключаемся к Zustand store для фильтров
  const { selectedCategories, sortBy, toggleCategory, setSortBy } = useFiltersStore();

  // Локальное состояние для пагинации и цветов
  const [itemsPerPage, setItemsPerPage] = useState('12');
  const [currentPage, setCurrentPage] = useState(1);

  // Получаем все продукты из productsData (мемоизированно)
  const allProducts = useMemo(() => {
    const products = [];

    for (const category in productsData) {
      const categoryProducts = productsData[category];
      for (const product of categoryProducts) {
        const priceNumber = parseInt(product.price.replace(/[^\d]/g, ''), 10);
        products.push({
          id: product.id,
          category: product.category,
          categoryKey: category, // Добавляем ключ категории для фильтрации
          name: product.name,
          price: priceNumber,
          status: product.isNew ? 'Новинка' : undefined,
          image: product.image,
          hoverImage: product.images?.[1] || product.image,
          slug: product.slug,
          collection: 'Caiser',
          isNew: product.isNew,
        });
      }
    }

    return products;
  }, []);

  // КРИТИЧЕСКИ ВАЖНО: useMemo для фильтрации и сортировки
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProducts];

    // ФИЛЬТРАЦИЯ ПО КАТЕГОРИЯМ
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.categoryKey)
      );
    }

    // СОРТИРОВКА
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
      case 'sale':
        // Пока нет данных о скидках, оставляем как есть
        break;
      case 'default':
      default:
        // Без сортировки
        break;
    }

    return result;
  }, [allProducts, selectedCategories, sortBy]);

  // Обработчики для категорий (с интеграцией в store)
  const handleCategoryClick = (categoryValue: string) => {
    if (categoryValue === 'all') {
      // Если выбрали "Все", очищаем выбранные категории
      useFiltersStore.setState({ selectedCategories: [] });
    } else {
      // Переключаем категорию
      toggleCategory(categoryValue);
    }
    setCurrentPage(1);
  };

  // Проверяем, активна ли категория
  const isCategoryActive = (categoryValue: string) => {
    if (categoryValue === 'all') {
      return selectedCategories.length === 0;
    }
    return selectedCategories.includes(categoryValue);
  };

  const totalPages = Math.ceil(filteredAndSortedProducts.length / parseInt(itemsPerPage));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleShowMore = () => {
    // логика для "показать еще"
  };

  return (
    <div className="pb-24">
      <Header />
      {/* Секция заголовка страницы каталога с фоновым изображением */}
      <div
        className="w-full h-[400px] bg-cover bg-center pb-24 flex items-end"
        style={{ backgroundImage: "url('/images/hero/screen_1.png')" }}
      >
        <div className="container">
          <h1 className="text-white text-[64px] font-bold">Каталог товаров</h1>
        </div>
      </div>

      <div className="container mt-50 pb-8">
        {/* Табы для фильтрации по категориям - интегрированы с Zustand store */}
        <div className="flex flex-wrap gap-3.5 mb-8">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant={isCategoryActive(tab.value) ? 'primary' : 'outline'}
              onClick={() => handleCategoryClick(tab.value)}
            >
              {tab.label}
              {tab.value !== 'all' && selectedCategories.includes(tab.value) && (
                <span className="ml-2 text-xs">✓</span>
              )}
            </Button>
          ))}
        </div>

        {/* Отображение активных фильтров */}
        {selectedCategories.length > 0 && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-gray-600">Выбрано категорий: {selectedCategories.length}</span>
            <button
              onClick={() => useFiltersStore.setState({ selectedCategories: [] })}
              className="text-sm text-red-500 hover:underline"
            >
              Очистить все
            </button>
          </div>
        )}

        <div className="flex justify-start gap-3.5 mt-50 mb-8">
          {/* Сортировка - интегрирована с Zustand store */}
          <div className="w-48">
            <Select
              placeholder="Сортировка"
              intent="filled"
              value={sortBy}
              onChange={(val) => setSortBy(val as string)}
            >
              <SelectOption value="default">По умолчанию</SelectOption>
              <SelectOption value="newest">Новинки</SelectOption>
              <SelectOption value="price_asc">Сначала дешёвые</SelectOption>
              <SelectOption value="price_desc">Сначала дорогие</SelectOption>
              <SelectOption value="sale">Товары по акции</SelectOption>
            </Select>
          </div>

          {/* Выпадающий список для фильтрации по цвету (будущий функционал) */}
          <div className="w-52">
            <Select
              placeholder="Цвет изделия"
              intent="outline"
              multiple
              value={[]}
              onChange={() => {}}
            >
              <SelectOption value="beige">Бежевый</SelectOption>
              <SelectOption value="white">Белый</SelectOption>
              <SelectOption value="white_glossy">Белый глянцевый</SelectOption>
              <SelectOption value="white_matte">Белый матовый</SelectOption>
              <SelectOption value="bronze_matte">Бронза матовая</SelectOption>
              <SelectOption value="beech_light">Бук светлый</SelectOption>
            </Select>
          </div>
        </div>

        {/* Отображение количества найденных товаров */}
        <div className="mb-4 text-sm text-gray-600">
          Найдено товаров: {filteredAndSortedProducts.length}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <CatalogCard key={product.id} {...product} />
          ))}
        </div>
      </div>

      {/* Секция пагинации и управления количеством отображаемых товаров */}
      <div className="container">
        <div className="flex justify-between items-center gap-4 mt-12 w-full">
          <PaginationControls
              className={'w-full'}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            onShowMore={handleShowMore}
          />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
