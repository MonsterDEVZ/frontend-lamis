'use client';
import { useState, useMemo, useEffect, type FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import PaginationControls from '../ui/PaginationControls';
import FilterSection from '../ui/FilterSection';
import SkeletonLoader from '../ui/SkeletonLoader';
import { useFiltersStore } from '@/store/filtersStore';
import CatalogCardResponsive from '../ui/CatalogCardResponsive';
import EmptyState from '../ui/EmptyState';
import { fetchProducts, fetchSections, PaginatedResponse } from '@/services/api/products';
import { Product, Section } from '@/types/product';

const Catalog: FC = () => {
  // Подключаемся к Zustand store для фильтров (ПЯТИУРОВНЕВАЯ СИСТЕМА)
  const {
    // Новая пятиуровневая система: Section → Brand → Category → Collection/Type
    selectedSectionId,
    selectedBrandId, // НОВОЕ! Level 2
    selectedCategoryId,
    selectedCollectionId,
    selectedTypeId,
    availableBrands, // НОВОЕ! Level 2
    availableCategories,
    availableCollections,
    availableTypes,
    isLoading, // НОВОЕ! Глобальный loading
    setSectionId,
    setBrandId, // НОВОЕ! Level 2
    setCategoryId,
    setCollectionId,
    setTypeId,
    setIsLoading, // НОВОЕ! Управление loading состоянием
  } = useFiltersStore();

  // Получаем параметры из URL (ПЯТИУРОВНЕВАЯ СИСТЕМА)
  const searchParams = useSearchParams();
  const sectionIdFromUrl = searchParams.get('sectionId');
  const brandIdFromUrl = searchParams.get('brandId'); // НОВОЕ! Level 2
  const categoryIdFromUrl = searchParams.get('categoryId');
  const collectionIdFromUrl = searchParams.get('collectionId');
  const typeIdFromUrl = searchParams.get('typeId');

  // Локальное состояние для пагинации
  const itemsPerPage = 20; // ФИКСИРОВАНО: всегда 20 товаров на странице
  const [currentPage, setCurrentPage] = useState(1);

  // API state
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);

  // Section description state
  const [currentSection, setCurrentSection] = useState<Section | null>(null);

  // НОВОЕ: Инициализация фильтров из URL (ПЯТИУРОВНЕВАЯ СИСТЕМА)
  useEffect(() => {
    const initializeFilters = async () => {
      // Показываем loading при инициализации фильтров из URL (например, при переходе из Header)
      setIsLoading(true);

      try {
        // УРОВЕНЬ 1: Устанавливаем фильтр по секции из URL
        if (sectionIdFromUrl) {
          const sectionId = parseInt(sectionIdFromUrl, 10);
          if (!isNaN(sectionId)) {
            await setSectionId(sectionId); // Автоматически загружает availableBrands из API
          }
        } else {
          // Если нет фильтра по секции, сбрасываем всё
          await setSectionId(null);
        }

        // УРОВЕНЬ 2: Устанавливаем фильтр по бренду из URL (НОВОЕ! только если есть секция)
        if (brandIdFromUrl && sectionIdFromUrl) {
          const brandId = parseInt(brandIdFromUrl, 10);
          if (!isNaN(brandId)) {
            await setBrandId(brandId); // Автоматически загружает availableCategories из API
          }
        }

        // УРОВЕНЬ 3: Устанавливаем фильтр по категории из URL (только если есть секция и бренд)
        if (categoryIdFromUrl && sectionIdFromUrl && brandIdFromUrl) {
          const categoryId = parseInt(categoryIdFromUrl, 10);
          if (!isNaN(categoryId)) {
            await setCategoryId(categoryId); // Автоматически загружает availableCollections и availableTypes из API
          }
        }

        // УРОВЕНЬ 4a: Устанавливаем фильтр по коллекции из URL
        if (collectionIdFromUrl) {
          const collectionId = parseInt(collectionIdFromUrl, 10);
          if (!isNaN(collectionId)) {
            setCollectionId(collectionId);
          }
        } else {
          setCollectionId(null);
        }

        // УРОВЕНЬ 4b: Устанавливаем фильтр по типу из URL
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
      } finally {
        // Скрываем loading после завершения инициализации
        setIsLoading(false);
      }
    };

    initializeFilters();
  }, [
    sectionIdFromUrl,
    brandIdFromUrl,
    categoryIdFromUrl,
    collectionIdFromUrl,
    typeIdFromUrl,
    setSectionId,
    setBrandId,
    setCategoryId,
    setCollectionId,
    setTypeId,
  ]);

  // Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoadingProducts(true);
      setError(null);

      try {
        const response = await fetchProducts({
          sectionId: selectedSectionId,
          brandId: selectedBrandId, // НОВОЕ! Level 2
          categoryId: selectedCategoryId,
          collectionId: selectedCollectionId,
          typeId: selectedTypeId,
          page: currentPage,
          itemsPerPage: itemsPerPage,
        });

        setApiProducts(response.data);
        setTotalProducts(response.pagination.totalItems);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to load products');
        setApiProducts([]);
        setTotalProducts(0);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    loadProducts();
  }, [
    selectedSectionId,
    selectedBrandId,
    selectedCategoryId,
    selectedCollectionId,
    selectedTypeId,
    currentPage,
    itemsPerPage,
  ]);

  // Load section data for description
  useEffect(() => {
    const loadSectionData = async () => {
      if (selectedSectionId) {
        try {
          const sections = await fetchSections();
          const section = sections.find((s) => s.id === selectedSectionId);
          setCurrentSection(section || null);
        } catch (err) {
          console.error('Error fetching section data:', err);
          setCurrentSection(null);
        }
      } else {
        setCurrentSection(null);
      }
    };

    loadSectionData();
  }, [selectedSectionId]);

  // Products now come from API - no client-side filtering needed
  const filteredAndSortedProducts = useMemo(() => {
    return apiProducts;
  }, [apiProducts]);

  // УРОВЕНЬ 2: Обработчик клика по бренду (НОВОЕ!)
  const handleBrandClick = async (brandId: number | null) => {
    setIsLoading(true); // Показываем глобальный loading
    try {
      await setBrandId(brandId); // Автоматически загружает категории из API
      setCurrentPage(1);
    } finally {
      setIsLoading(false); // Скрываем глобальный loading
    }
  };

  // УРОВЕНЬ 3: Обработчик клика по категории
  const handleCategoryClick = async (categoryId: number | null) => {
    setIsLoading(true); // Показываем глобальный loading
    try {
      await setCategoryId(categoryId); // Автоматически загружает коллекции из API
      setCurrentPage(1);
    } finally {
      setIsLoading(false); // Скрываем глобальный loading
    }
  };

  // УРОВЕНЬ 4a: Обработчик клика по коллекции
  const handleCollectionClick = (collectionId: number | null) => {
    setIsLoading(true); // Показываем глобальный loading
    try {
      setCollectionId(collectionId);
      setCurrentPage(1);
    } finally {
      // Задержка перед скрытием loading, чтобы дать время на загрузку товаров
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  // УРОВЕНЬ 4b: Обработчик клика по типу
  const handleTypeClick = (typeId: number | null) => {
    setTypeId(typeId);
    setCurrentPage(1);
  };

  // Проверяем, активен ли бренд (НОВОЕ!)
  const isBrandActive = (brandId: number | null) => {
    return selectedBrandId === brandId;
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
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // Получаем продукты для текущей страницы - API already returns paginated results
  const paginatedProducts = filteredAndSortedProducts;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Прокрутка к началу каталога при смене страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-24">
      {/* Глобальный Loading Overlay */}
      <SkeletonLoader isLoading={isLoading} text="Применяем фильтр..." />

      {/* Hero Section с динамическим заголовком и описанием */}
      <div
        className="w-full min-h-[550px] md:min-h-[650px] lg:min-h-[750px] bg-cover bg-center relative flex items-center"
        style={{ backgroundImage: "url('/images/hero/screen_1.png')" }}
      >
        {/* Затемняющий оверлей для лучшей читаемости текста */}
        <div className="absolute inset-0 bg-linear-to-br from-black/70 to-black/50" />

        {/* Контент Hero */}
        <div className="wrapper_centering px-6 md:px-10 lg:px-20 pt-20 md:pt-100 pb-0 md:pb-5 lg:pb-24 relative z-10">
          <div className="max-w-4xl">
            {/* Динамический заголовок */}
            <h1
              className="text-white text-[28px] md:text-[32px] lg:text-[44px]! font-bold mb-6 leading-tight text-balance"
              style={{
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.5)',
                letterSpacing: '-0.5px',
              }}
              dangerouslySetInnerHTML={{
                __html: `${currentSection?.title || 'Каталог товаров'}`,
              }}
            />

            {/* Динамическое описание */}
            {currentSection?.description && (
              <div className="text-white/95 text-[13px] md:text-[14px] lg:text-[15px] space-y-3 md:space-y-4">
                {currentSection.description
                  .split('\n\n')
                  .filter((p: string) => p.trim())
                  .map((paragraph: string, index: number) => (
                    <p
                      key={index}
                      className="leading-normal md:leading-[1.6] lg:leading-[1.65]"
                      style={{
                        textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)',
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="wrapper_centering mt-8 sm:mt-12 md:mt-50 pb-8 px-4">
        <>
          {/* УРОВЕНЬ 2: Фильтрация по брендам (НОВОЕ!) */}
          {selectedSectionId !== null && availableBrands.length > 0 && (
            <FilterSection
              title="Все бренды"
              items={availableBrands}
              selectedId={selectedBrandId}
              onSelect={handleBrandClick}
              allLabel="Все бренды"
            />
          )}

          {/* УРОВЕНЬ 3: Фильтрация по категориям */}
          {selectedBrandId !== null && availableCategories.length > 0 && (
            <FilterSection
              title="Все категории"
              items={availableCategories}
              selectedId={selectedCategoryId}
              onSelect={handleCategoryClick}
              allLabel="Все категории"
            />
          )}

          {/* УРОВЕНЬ 4a: Фильтрация по коллекциям */}
          {selectedCategoryId !== null && availableCollections.length > 0 && (
            <FilterSection
              title="Все коллекции"
              items={availableCollections}
              selectedId={selectedCollectionId}
              onSelect={handleCollectionClick}
              allLabel="Все коллекции"
            />
          )}

          {/* УРОВЕНЬ 4b: Фильтрация по типам */}
          {selectedCategoryId !== null && availableTypes.length > 0 && (
            <FilterSection
              title="Все виды"
              items={availableTypes}
              selectedId={selectedTypeId}
              onSelect={handleTypeClick}
              allLabel="Все виды"
            />
          )}
        </>

        {/* Секция с товарами */}
        <>
          {isLoadingProducts ? (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 md:gap-6 divide-y divide-dark-50 md:divide-transparent border_y border-dark-50 md:border-transparent mt-8">
              {paginatedProducts.map((product) => (
                <div key={product.id} className="py-5 md:py-0">
                  <CatalogCardResponsive
                    {...product}
                    collection={product.collection_name || product.brand_name || 'Без коллекции'}
                    image={product.main_image_url || product.image || '/placeholder.webp'}
                    hoverImage={
                      product.hover_image_url ||
                      product.main_image_url ||
                      product.image ||
                      '/placeholder.webp'
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </>
      </div>

      {/* Секция пагинации и управления количеством отображаемых товаров */}
      <div className="wrapper_centering">
        <div className="flex justify-between items-center gap-4 mt-12 w-full">
          <PaginationControls
            className="w-full"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
