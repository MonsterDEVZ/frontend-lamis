'use client';
import { useState, useMemo, useEffect, type FC } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/header/Header';
import CatalogCard from '@/components/ui/CatalogCard';
import { Button } from '@/components/ui/Button';
import { Select, SelectOption } from '../ui/Select';
import PaginationControls from '../ui/PaginationControls';
import { productsData } from '@/data/products';
import { useFiltersStore } from '@/store/filtersStore';

// Маппинг категорий к ключам productsData
const categoryKeyMap: Record<string, string> = {
  heaters: 'heaters',
  mirrors: 'mirrors',
  blesk: 'blesk',
  caizer: 'caizer',
  furniture: 'furniture',
};

// Маппинг категорий к brandId
const categoryToBrandId: Record<string, number> = {
  furniture: 1, // Lamis
  mirrors: 1, // Lamis
  heaters: 1, // Lamis
  caizer: 2, // Caizer
  blesk: 3, // Blesk
};

const Catalog: FC = () => {
  // Подключаемся к Zustand store для фильтров (НОВАЯ ТРЕХУРОВНЕВАЯ СИСТЕМА)
  const {
    // Новая трехуровневая система
    selectedBrandId,
    selectedCategoryId,
    selectedCollectionId,
    availableCategories,
    availableCollections,
    setBrandId,
    setCategoryId,
    setCollectionId,
    sortBy,
    setSortBy,
  } = useFiltersStore();

  // Получаем параметры из URL
  const searchParams = useSearchParams();
  const brandIdFromUrl = searchParams.get('brandId');
  const categoryIdFromUrl = searchParams.get('categoryId');

  // Локальное состояние для пагинации
  const [itemsPerPage, setItemsPerPage] = useState('12');
  const [currentPage, setCurrentPage] = useState(1);

  // Получаем все продукты из productsData (мемоизированно)
  const allProducts = useMemo(() => {
    const products = [];

    for (const category in productsData) {
      const categoryProducts = productsData[category];
      for (const product of categoryProducts) {
        const priceNumber = parseInt(product.price.replace(/[^\d]/g, ''), 10);
        // Определяем brandId на основе категории
        const brandId = product.brandId || categoryToBrandId[category] || 1;
        // Определяем имя бренда на основе brandId
        const brandNames: Record<number, string> = {
          1: 'Lamis',
          2: 'Caizer',
          3: 'Blesk',
        };
        const collectionName = brandNames[brandId] || 'Lamis';

        products.push({
          id: product.id,
          category: product.category,
          categoryKey: category, // Добавляем ключ категории для фильтрации (deprecated)
          categoryId: product.categoryId || category, // НОВОЕ: categoryId из данных
          collectionId: product.collectionId, // НОВОЕ: collectionId из данных
          name: product.name,
          price: priceNumber,
          status: product.isNew ? 'Новинка' : undefined,
          image: product.image,
          hoverImage: product.images?.[1] || product.image,
          slug: product.slug,
          collection: collectionName,
          isNew: product.isNew,
          brandId: brandId,
        });
      }
    }

    return products;
  }, []);

  // НОВОЕ: Инициализация фильтров из URL (ТРЕХУРОВНЕВАЯ СИСТЕМА)
  useEffect(() => {
    console.log('--- CATALOG COMPONENT: URL PARAMS CHANGED ---');
    console.log('Brand ID from URL:', brandIdFromUrl);
    console.log('Category ID from URL:', categoryIdFromUrl);

    // УРОВЕНЬ 1: Устанавливаем фильтр по бренду из URL
    if (brandIdFromUrl) {
      const brandId = parseInt(brandIdFromUrl, 10);
      if (!isNaN(brandId)) {
        console.log('🔹 [Level 1] Setting brand filter from URL:', brandId);
        setBrandId(brandId, allProducts); // Автоматически обновляет availableCategories
      }
    } else {
      // Если нет фильтра по бренду, сбрасываем всё
      console.log('🔹 No brand filter, resetting filters');
      setBrandId(null, allProducts);
    }

    // УРОВЕНЬ 2: Устанавливаем фильтр по категории из URL (только если есть бренд)
    if (categoryIdFromUrl && brandIdFromUrl) {
      console.log('🔹 [Level 2] Setting category filter from URL:', categoryIdFromUrl);
      setCategoryId(categoryIdFromUrl, allProducts); // Автоматически обновляет availableCollections
    }
  }, [brandIdFromUrl, categoryIdFromUrl, allProducts, setBrandId, setCategoryId]);

  // КРИТИЧЕСКИ ВАЖНО: useMemo для фильтрации и сортировки (ТРЕХУРОВНЕВАЯ СИСТЕМА)
  const filteredAndSortedProducts = useMemo(() => {
    console.log('🔍 Filtering products with THREE-LEVEL system:');
    console.log('  - Selected Brand ID:', selectedBrandId);
    console.log('  - Selected Category ID:', selectedCategoryId);
    console.log('  - Selected Collection ID:', selectedCollectionId);
    console.log('  - Total products:', allProducts.length);

    let result = [...allProducts];

    // УРОВЕНЬ 1: ФИЛЬТРАЦИЯ ПО БРЕНДУ
    if (selectedBrandId !== null) {
      console.log('  - Applying brand filter...');
      result = result.filter((product) => product.brandId === selectedBrandId);
      console.log('  - After brand filter:', result.length, 'products');
    }

    // УРОВЕНЬ 2: ФИЛЬТРАЦИЯ ПО КАТЕГОРИИ
    if (selectedCategoryId !== null) {
      console.log('  - Applying category filter...');
      result = result.filter((product) => {
        const prodCatId = product.categoryId || product.categoryKey;
        return prodCatId === selectedCategoryId;
      });
      console.log('  - After category filter:', result.length, 'products');
    }

    // УРОВЕНЬ 3: ФИЛЬТРАЦИЯ ПО КОЛЛЕКЦИИ
    if (selectedCollectionId !== null) {
      console.log('  - Applying collection filter...');
      result = result.filter((product) => product.collectionId === selectedCollectionId);
      console.log('  - After collection filter:', result.length, 'products');
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
  }, [allProducts, selectedBrandId, selectedCategoryId, selectedCollectionId, sortBy]);

  // УРОВЕНЬ 2: Обработчик клика по категории
  const handleCategoryClick = (categoryValue: string) => {
    console.log('🔹 [Level 2] Category clicked:', categoryValue);
    if (categoryValue === 'all') {
      // Если выбрали "Все", сбрасываем фильтр по категории
      setCategoryId(null, allProducts);
    } else {
      // Устанавливаем выбранную категорию (автоматически обновит availableCollections)
      setCategoryId(categoryValue, allProducts);
    }
    setCurrentPage(1);
  };

  // УРОВЕНЬ 3: Обработчик клика по коллекции
  const handleCollectionClick = (collectionId: string) => {
    console.log('🔹 [Level 3] Collection clicked:', collectionId);
    if (collectionId === 'all') {
      // Если выбрали "Все коллекции", сбрасываем фильтр
      setCollectionId(null);
    } else {
      setCollectionId(collectionId);
    }
    setCurrentPage(1);
  };

  // Проверяем, активна ли категория
  const isCategoryActive = (categoryValue: string) => {
    if (categoryValue === 'all') {
      return selectedCategoryId === null;
    }
    return selectedCategoryId === categoryValue;
  };

  // Проверяем, активна ли коллекция
  const isCollectionActive = (collectionId: string) => {
    if (collectionId === 'all') {
      return selectedCollectionId === null;
    }
    return selectedCollectionId === collectionId;
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
        className="w-full h-[200px] sm:h-[300px] md:h-[400px] bg-cover bg-center pb-8 sm:pb-16 md:pb-24 flex items-end"
        style={{ backgroundImage: "url('/images/hero/screen_1.png')" }}
      >
        <div className="wrapper_centering px-4">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold">
            Каталог товаров
          </h1>
        </div>
      </div>

      <div className="wrapper_centering mt-8 sm:mt-12 md:mt-50 pb-8 px-4 !overflow-hidden">
        {/* УРОВЕНЬ 2: ДИНАМИЧЕСКИЕ ТАБЫ для фильтрации по категориям */}
        {selectedBrandId !== null && availableCategories.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Категории</h3>
            <div className="flex flex-wrap gap-3.5">
              {/* Кнопка "Все категории" */}
              <Button
                variant={selectedCategoryId === null ? 'primary' : 'outline'}
                onClick={() => handleCategoryClick('all')}
              >
                Все категории
              </Button>

              {/* Динамически генерируемые категории из store */}
              {availableCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={isCategoryActive(category.id) ? 'primary' : 'outline'}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* УРОВЕНЬ 3: ДИНАМИЧЕСКИЕ ТАБЫ для фильтрации по коллекциям */}
        {selectedCategoryId !== null && availableCollections.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Коллекции</h3>
            <div className="flex flex-wrap gap-3.5">
              {/* Кнопка "Все коллекции" */}
              <Button
                variant={selectedCollectionId === null ? 'primary' : 'outline'}
                onClick={() => handleCollectionClick('all')}
              >
                Все коллекции
              </Button>

              {/* Динамически генерируемые коллекции из store */}
              {availableCollections.map((collection) => (
                <Button
                  key={collection.id}
                  variant={isCollectionActive(collection.id) ? 'primary' : 'outline'}
                  onClick={() => handleCollectionClick(collection.id)}
                >
                  {collection.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-start gap-3.5 mt-6 sm:mt-8 md:mt-50 mb-8">
          {/* Сортировка - интегрирована с Zustand store */}
          <div className="w-full sm:w-48">
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
          {/*  FIX: ВРЕМЕННО УБРАЛ */}
          {/*  <div className="w-full sm:w-52">*/}
          {/*    <Select*/}
          {/*      placeholder="Цвет изделия"*/}
          {/*      intent="outline"*/}
          {/*      multiple*/}
          {/*      value={[]}*/}
          {/*      onChange={() => {}}*/}
          {/*    >*/}
          {/*      <SelectOption value="beige">Бежевый</SelectOption>*/}
          {/*      <SelectOption value="white">Белый</SelectOption>*/}
          {/*      <SelectOption value="white_glossy">Белый глянцевый</SelectOption>*/}
          {/*      <SelectOption value="white_matte">Белый матовый</SelectOption>*/}
          {/*      <SelectOption value="bronze_matte">Бронза матовая</SelectOption>*/}
          {/*      <SelectOption value="beech_light">Бук светлый</SelectOption>*/}
          {/*    </Select>*/}
          {/*  </div>*/}
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
      <div className="wrapper_centering overflow-x-hidden">
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
