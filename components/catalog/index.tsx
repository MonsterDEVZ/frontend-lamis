'use client';
import { useState, useMemo, type FC } from 'react';
import Header from '@/components/Header';
import CatalogCard from '@/components/ui/CatalogCard';
import { Button } from '@/components/ui/Button';
import { Select, SelectOption } from '../ui/Select';
import PaginationControls from '../ui/PaginationControls';
import { productsData } from '@/data/products';

const tabs = [
  { label: 'Все', value: 'all' },
  { label: 'Умные водонагреватели', value: 'heaters' },
  { label: 'Зеркала Lamis', value: 'mirrors' },
  { label: 'Умные водонагреватели Blesk', value: 'blesk' },
  { label: 'Сантехника Caizer', value: 'caizer' },
  { label: 'Мебель для ванн Lamis', value: 'furniture' },
];

const Catalog: FC = () => {
  // Состояния для управления фильтрами и сортировкой
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortValue, setSortValue] = useState('default');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState('12');
  const [currentPage, setCurrentPage] = useState(1);

  // Получаем и трансформируем продукты из productsData
  const allProducts = useMemo(() => {
    const products = [];

    for (const category in productsData) {
      const categoryProducts = productsData[category];
      for (const product of categoryProducts) {
        const priceNumber = parseInt(product.price.replace(/[^\d]/g, ''), 10);
        products.push({
          id: product.id,
          category: product.category,
          name: product.name,
          price: priceNumber,
          status: product.isNew ? 'Новинка' : undefined,
          image: product.image,
          hoverImage: product.images?.[1] || product.image,
          slug: product.slug,
          collection: 'Caiser',
        });
      }
    }

    return products;
  }, []);

  // Фильтруем продукты по выбранной категории
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return allProducts;
    }

    return allProducts.filter(product => {
      const categoryKey = productsData[activeCategory];
      if (!categoryKey) return false;

      return categoryKey.some(p => p.id === product.id);
    });
  }, [allProducts, activeCategory]);

  const totalPages = Math.ceil(filteredProducts.length / parseInt(itemsPerPage));

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
        {/* Табы для фильтрации по категориям */}
        <div className="flex flex-wrap gap-3.5 mb-8">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant={activeCategory === tab.value ? 'primary' : 'outline'}
              onClick={() => {
                setActiveCategory(tab.value);
                setCurrentPage(1);
              }}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <div className="flex justify-start gap-3.5 mt-50 mb-8">
          {/* Сортировка (зеленый) */}
          <div className="w-48">
            <Select
              placeholder="Сортировка"
              intent="filled"
              value={sortValue}
              onChange={(val) => setSortValue(val as string)}
            >
              <SelectOption value="default">По умолчанию</SelectOption>
              <SelectOption value="newest">Новинки</SelectOption>
              <SelectOption value="price_asc">Сначала дешёвые</SelectOption>
              <SelectOption value="price_desc">Сначала дорогие</SelectOption>
              <SelectOption value="sale">Товары по акции</SelectOption>
            </Select>
          </div>

          {/* Выпадающий список для фильтрации по цвету с возможностью множественного выбора */}
          <div className="w-52">
            <Select
              placeholder="Цвет изделия"
              intent="outline"
              multiple // Включаем режим множественного выбора
              value={selectedColors}
              onChange={(val) => setSelectedColors(val as string[])}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <CatalogCard key={product.id} {...product} />
          ))}
        </div>
      </div>

      {/* Секция пагинации и управления количеством отображаемых товаров */}
      <div className="container">
        <div className="flex justify-end items-center gap-4 mt-12">
          <PaginationControls
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
