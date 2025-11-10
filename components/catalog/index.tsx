'use client';
import { useState, useMemo, useEffect, type FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Select, SelectOption } from '../ui/Select';
import PaginationControls from '../ui/PaginationControls';
import { productsData } from '@/data/products';
import { useFiltersStore } from '@/store/filtersStore';
import CatalogCardResponsive from '../ui/CatalogCardResponsive';

// Маппинг категорий к brandId
const categoryToBrandId: Record<string, number> = {
  furniture: 1, // Lamis
  mirrors: 1, // Lamis
  heaters: 1, // Lamis
  caizer: 2, // Caizer
  blesk: 3, // Blesk
};

const listCatalog = [
  { label: 'Смесители для ванной' },
  { label: 'Душевые системы' },
  { label: 'Смесители для кухни' },
  { label: 'Санитарный фарфор и сиденья' },
  { label: 'Мебель и зеркала' },
  { label: 'Аксессуары для душа' },
  { label: 'Мойки' },
  { label: 'Инсталляции и клавиши' },
];

const sortOptions = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'newest', label: 'Новинки' },
  { value: 'price_asc', label: 'Сначала дешёвые' },
  { value: 'price_desc', label: 'Сначала дорогие' },
  { value: 'sale', label: 'Товары по акции' },
];

const Catalog: FC = () => {
  // Подключаемся к Zustand store для фильтров (НОВАЯ ТРЕХУРОВНЕВАЯ СИСТЕМА)
  const {
    // Новая трехуровневая система
    selectedBrandId,
    selectedCategoryId,
    selectedCollectionId,
    availableCategories,
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
    // УРОВЕНЬ 1: Устанавливаем фильтр по бренду из URL
    if (brandIdFromUrl) {
      const brandId = parseInt(brandIdFromUrl, 10);
      if (!isNaN(brandId)) {
        setBrandId(brandId, allProducts); // Автоматически обновляет availableCategories
      }
    } else {
      // Если нет фильтра по бренду, сбрасываем всё
      setBrandId(null, allProducts);
    }

    // УРОВЕНЬ 2: Устанавливаем фильтр по категории из URL (только если есть бренд)
    if (categoryIdFromUrl && brandIdFromUrl) {
      setCategoryId(categoryIdFromUrl, allProducts); // Автоматически обновляет availableCollections
    }
  }, [brandIdFromUrl, categoryIdFromUrl, allProducts, setBrandId, setCategoryId]);

  // КРИТИЧЕСКИ ВАЖНО: useMemo для фильтрации и сортировки (ТРЕХУРОВНЕВАЯ СИСТЕМА)
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProducts];

    // УРОВЕНЬ 1: ФИЛЬТРАЦИЯ ПО БРЕНДУ
    if (selectedBrandId !== null) {
      result = result.filter((product) => product.brandId === selectedBrandId);
    }

    // УРОВЕНЬ 2: ФИЛЬТРАЦИЯ ПО КАТЕГОРИИ
    if (selectedCategoryId !== null) {
      result = result.filter((product) => {
        const prodCatId = product.categoryId || product.categoryKey;
        return prodCatId === selectedCategoryId;
      });
    }

    // УРОВЕНЬ 3: ФИЛЬТРАЦИЯ ПО КОЛЛЕКЦИИ
    if (selectedCollectionId !== null) {
      result = result.filter((product) => product.collectionId === selectedCollectionId);
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
    if (categoryValue === 'all') {
      // Если выбрали "Все", сбрасываем фильтр по категории
      setCategoryId(null, allProducts);
    } else {
      // Устанавливаем выбранную категорию (автоматически обновит availableCollections)
      setCategoryId(categoryValue, allProducts);
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
        {selectedBrandId !== null && availableCategories.length > 0 && (
          <div className="flex flex-wrap gap-3 md:gap-3.5 mb-8">
            <Button
              className="h-8 md:h-10 py-1 md:py-2 px-3 md:px-4"
              variant={selectedCategoryId === null ? 'primary' : 'outline'}
              onClick={() => handleCategoryClick('all')}
            >
              Все категории
            </Button>

            {/* Динамически генерируемые категории из store */}
            {listCatalog.map((el, idx) => (
              // {availableCategories.map((category) => (
              <Button
                key={idx}
                variant={isCategoryActive('primary') ? 'primary' : 'outline'}
                onClick={() => handleCategoryClick(el.label)}
              >
                {el.label}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 md:gap-6 divide-y divide-dark-50 md:divide-transparent border_y border-dark-50 md:border-transparent">
          {filteredAndSortedProducts.map((product) => (
            <div key={product.id} className="py-5 md:py-0">
              <CatalogCardResponsive {...product} />
            </div>
          ))}
        </div>
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
