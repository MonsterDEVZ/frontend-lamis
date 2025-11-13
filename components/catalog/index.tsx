'use client';
import { useState, useMemo, useEffect, type FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Select, SelectOption } from '../ui/Select';
import PaginationControls from '../ui/PaginationControls';
import { useFiltersStore } from '@/store/filtersStore';
import CatalogCardResponsive from '../ui/CatalogCardResponsive';
import EmptyState from '../ui/EmptyState';
import { fetchProducts, PaginatedResponse } from '@/services/api/products';
import { Product } from '@/types/product';

const sortOptions = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'newest', label: 'Новинки' },
  { value: 'price_asc', label: 'Сначала дешёвые' },
  { value: 'price_desc', label: 'Сначала дорогие' },
  { value: 'sale', label: 'Товары по акции' },
];

const Catalog: FC = () => {
  // Подключаемся к Zustand store для фильтров (ЧЕТЫРЕХУРОВНЕВАЯ СИСТЕМА)
  const {
    // Новая четырехуровневая система
    selectedSectionId,
    selectedCategoryId,
    selectedCollectionId,
    selectedTypeId,
    availableCategories,
    availableCollections,
    availableTypes,
    setSectionId,
    setCategoryId,
    setCollectionId,
    setTypeId,
    sortBy,
    setSortBy,
  } = useFiltersStore();

  // Получаем параметры из URL
  const searchParams = useSearchParams();
  const sectionIdFromUrl = searchParams.get('sectionId') || searchParams.get('brandId'); // Support both
  const categoryIdFromUrl = searchParams.get('categoryId');
  const collectionIdFromUrl = searchParams.get('collectionId');
  const typeIdFromUrl = searchParams.get('typeId');

  // Локальное состояние для пагинации
  const [itemsPerPage, setItemsPerPage] = useState('12');
  const [currentPage, setCurrentPage] = useState(1);

  // API state
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);

  // НОВОЕ: Инициализация фильтров из URL (ЧЕТЫРЕХУРОВНЕВАЯ СИСТЕМА)
  useEffect(() => {
    const initializeFilters = async () => {
      // УРОВЕНЬ 1: Устанавливаем фильтр по секции из URL
      if (sectionIdFromUrl) {
        const sectionId = parseInt(sectionIdFromUrl, 10);
        if (!isNaN(sectionId)) {
          await setSectionId(sectionId); // Автоматически загружает availableCategories из API
        }
      } else {
        // Если нет фильтра по секции, сбрасываем всё
        await setSectionId(null);
      }

      // УРОВЕНЬ 2: Устанавливаем фильтр по категории из URL (только если есть секция)
      if (categoryIdFromUrl && sectionIdFromUrl) {
        const categoryId = parseInt(categoryIdFromUrl, 10);
        if (!isNaN(categoryId)) {
          await setCategoryId(categoryId); // Автоматически загружает availableCollections и availableTypes из API
        }
      }

      // УРОВЕНЬ 3a: Устанавливаем фильтр по коллекции из URL
      if (collectionIdFromUrl) {
        const collectionId = parseInt(collectionIdFromUrl, 10);
        if (!isNaN(collectionId)) {
          setCollectionId(collectionId);
        }
      } else {
        setCollectionId(null);
      }

      // УРОВЕНЬ 3b: Устанавливаем фильтр по типу из URL
      if (typeIdFromUrl) {
        const typeId = parseInt(typeIdFromUrl, 10);
        if (!isNaN(typeId)) {
          setTypeId(typeId);
        }
      } else {
        setTypeId(null);
      }

      // Сбрасываем на первую страницу при изменении фильтров
      setCurrentPage(1);
    };

    initializeFilters();
  }, [sectionIdFromUrl, categoryIdFromUrl, collectionIdFromUrl, typeIdFromUrl, setSectionId, setCategoryId, setCollectionId, setTypeId]);

  // Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchProducts({
          sectionId: selectedSectionId,
          categoryId: selectedCategoryId,
          collectionId: selectedCollectionId,
          typeId: selectedTypeId,
          sortBy: sortBy,
          page: currentPage,
          itemsPerPage: parseInt(itemsPerPage, 10),
        });

        setApiProducts(response.data);
        setTotalProducts(response.pagination.totalItems);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to load products');
        setApiProducts([]);
        setTotalProducts(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [selectedSectionId, selectedCategoryId, selectedCollectionId, selectedTypeId, sortBy, currentPage, itemsPerPage]);

  // Products now come from API - no client-side filtering needed
  const filteredAndSortedProducts = useMemo(() => {
    return apiProducts;
  }, [apiProducts]);

  // Сброс страницы при изменении сортировки
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  // УРОВЕНЬ 2: Обработчик клика по категории
  const handleCategoryClick = async (categoryId: number | null) => {
    await setCategoryId(categoryId); // Автоматически загружает коллекции из API
    setCurrentPage(1);
  };

  // УРОВЕНЬ 3a: Обработчик клика по коллекции
  const handleCollectionClick = (collectionId: number | null) => {
    setCollectionId(collectionId);
    setCurrentPage(1);
  };

  // УРОВЕНЬ 3b: Обработчик клика по типу
  const handleTypeClick = (typeId: number | null) => {
    setTypeId(typeId);
    setCurrentPage(1);
  };

  // Проверяем, активна ли категория
  const isCategoryActive = (categoryId: number | null) => {
    return selectedCategoryId === categoryId;
  };

  // Проверяем, активна ли коллекция
  const isCollectionActive = (collectionId: number | null) => {
    return selectedCollectionId === collectionId;
  };

  // Проверяем, активен ли тип
  const isTypeActive = (typeId: number | null) => {
    return selectedTypeId === typeId;
  };

  // Пагинация - now using API total count
  const totalPages = Math.ceil(totalProducts / parseInt(itemsPerPage, 10));

  // Получаем продукты для текущей страницы - API already returns paginated results
  const paginatedProducts = filteredAndSortedProducts;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Прокрутка к началу каталога при смене страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      {/* Hero */}

      <div
        className="w-full h-[350px] md:h-[400px] bg-cover bg-center pb-8 sm:pb-16 md:pb-24 flex items-end"
        style={{ backgroundImage: "url('/images/hero/screen_1.png')" }}
      >
        <div className="wrapper_centering px-4">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold">
            Каталог товаров
          </h1>
        </div>
      </div>

      <div className="wrapper_centering mt-8 sm:mt-12 md:mt-50 pb-8 px-4">
        {/* УРОВЕНЬ 2: ДИНАМИЧЕСКИЕ ТАБЫ для фильтрации по категориям */}
        {selectedSectionId !== null && availableCategories.length > 0 && (
          <div className="flex flex-wrap gap-3 md:gap-3.5 mb-8">
            <Button
              className="h-8 md:h-10 py-1 md:py-2 px-3 md:px-4"
              variant={selectedCategoryId === null ? 'primary' : 'outline'}
              onClick={() => handleCategoryClick(null)}
            >
              Все категории
            </Button>

            {availableCategories.map((category) => (
              <Button
                key={category.id}
                className="h-8 md:h-10 py-1 md:py-2 px-3 md:px-4"
                variant={isCategoryActive(category.id) ? 'primary' : 'outline'}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        )}

        {/* УРОВЕНЬ 3a: ДИНАМИЧЕСКИЕ ТАБЫ для фильтрации по коллекциям */}
        {selectedCategoryId !== null && availableCollections.length > 0 && (
          <div className="flex flex-wrap gap-3 md:gap-3.5 mb-8">
            <Button
              className="h-8 md:h-10 py-1 md:py-2 px-3 md:px-4"
              variant={selectedCollectionId === null && selectedTypeId === null ? 'primary' : 'outline'}
              onClick={() => handleCollectionClick(null)}
            >
              Все коллекции
            </Button>

            {availableCollections.map((collection) => (
              <Button
                key={collection.id}
                className="h-8 md:h-10 py-1 md:py-2 px-3 md:px-4"
                variant={isCollectionActive(collection.id) ? 'primary' : 'outline'}
                onClick={() => handleCollectionClick(collection.id)}
              >
                {collection.name}
              </Button>
            ))}
          </div>
        )}

        {/* УРОВЕНЬ 3b: ДИНАМИЧЕСКИЕ ТАБЫ для фильтрации по типам */}
        {selectedCategoryId !== null && availableTypes.length > 0 && (
          <div className="flex flex-wrap gap-3 md:gap-3.5 mb-8">
            <Button
              className="h-8 md:h-10 py-1 md:py-2 px-3 md:px-4"
              variant={selectedTypeId === null && selectedCollectionId === null ? 'primary' : 'outline'}
              onClick={() => handleTypeClick(null)}
            >
              Все типы
            </Button>

            {availableTypes.map((type) => (
              <Button
                key={type.id}
                className="h-8 md:h-10 py-1 md:py-2 px-3 md:px-4"
                variant={isTypeActive(type.id) ? 'primary' : 'outline'}
                onClick={() => handleTypeClick(type.id)}
              >
                {type.name}
              </Button>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-start gap-3.5 mt-4 mb-10">
          {/* Сортировка - интегрирована с Zustand store */}
          <div className="w-48">
            <Select
              placeholder="Сортировка"
              intent="filled"
              value={sortBy}
              onChange={(val) => setSortBy(val as string)}
            >
              {sortOptions.map((option) => (
                <SelectOption key={option.value} value={option.value}>
                  {option.label}
                </SelectOption>
              ))}
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-100"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <p className="text-red-600 text-lg mb-4">Ошибка загрузки товаров</p>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : paginatedProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 md:gap-6 divide-y divide-dark-50 md:divide-transparent border_y border-dark-50 md:border-transparent">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="py-5 md:py-0">
                <CatalogCardResponsive
                  {...product}
                  collection={product.collection_name || product.brand_name || 'Без коллекции'}
                  image={product.main_image_url || product.image || '/placeholder.webp'}
                  hoverImage={product.hover_image_url || product.main_image_url || product.image || '/placeholder.webp'}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Секция пагинации и управления количеством отображаемых товаров */}
      <div className="wrapper_centering">
        <div className="flex justify-between items-center gap-4 mt-12 w-full">
          <PaginationControls
            className="w-full"
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
