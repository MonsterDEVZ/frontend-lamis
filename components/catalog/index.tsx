'use client';
import { useState, type FC } from 'react';
import Header from '@/components/Header';
import CatalogCard from '@/components/ui/CatalogCard';
import { Button } from '@/components/ui/Button';
import { Select, SelectOption } from '../ui/Select';
import PaginationControls from '../ui/PaginationControls';

const tabs = ['Все', 'Смесители', 'Раковины', 'Ванны', 'Душевые системы'];

const products = [
  {
    category: 'Смесители',
    name: 'Смеситель для раковины',
    price: 5999,
    status: 'Новинка',
    image: '/plumbing_section/caizer/3012.png',
    hoverImage: '/plumbing_section/caizer/3012 улучшенный.jpeg',
  },
  {
    category: 'Раковины',
    name: 'Раковина подвесная',
    price: 8999,
    image: '/plumbing_section/caizer/3014.png',
    hoverImage: '/plumbing_section/caizer/3014 улучшенный.jpeg',
  },
  {
    category: 'Ванны',
    name: 'Ванна акриловая',
    price: 25999,
    status: 'Хит',
    image: '/plumbing_section/caizer/3016.png',
    hoverImage: '/plumbing_section/caizer/3016 улучшенный.jpeg',
  },
  {
    category: 'Душевые системы',
    name: 'Душевая система с тропическим душем',
    price: 15999,
    image: '/plumbing_section/caizer/3030.png',
    hoverImage: '/plumbing_section/caizer/3030 улучшенный.jpeg',
  },
];

/**
 * Компонент каталога товаров.
 *
 * @returns {JSX.Element} Страница каталога с фильтрами, сортировкой и списком товаров.
 *
 * @example
 * <Catalog />
 */
const Catalog: FC = () => {
  // Состояния для управления фильтрами и сортировкой
  const [sortValue, setSortValue] = useState('default'); // Состояние для текущего метода сортировки
  const [selectedColors, setSelectedColors] = useState<string[]>([]); // Состояние для выбранных цветов
  const [itemsPerPage, setItemsPerPage] = useState('12'); // Состояние для количества отображаемых товаров
  const [currentPage, setCurrentPage] = useState(1); // Состояние для текущей страницы
  const totalPages = 5; // Пример, должно быть вычислено

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // логика для загрузки данных для страницы
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value);
    // логика для сброса страницы и перезагрузки данных
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
          {tabs.map((tab, idx) => (
            <Button key={tab} variant={idx === 0 ? 'primary' : 'outline'}>
              {tab}
            </Button>
          ))}
        </div>

        {/* Секция с элементами управления сортировкой и фильтрацией */}
        <div className="container flex justify-end gap-3.5 mt-50 mb-8">
          {/* Выпадающий список для сортировки товаров */}
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

        {/* Сетка для отображения карточек товаров */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <CatalogCard key={index} {...product} />
          ))}
        </div>
      </div>

      {/* Секция пагинации и управления количеством отображаемых товаров */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        onShowMore={handleShowMore}
      />
    </div>
  );
};

export default Catalog;
