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
    id: 'mixer-1',
    category: 'Смесители',
    name: 'Смеситель для раковины',
    price: 5999,
    status: 'Новинка',
    image: '/plumbing_section/caizer/3012.png',
    hoverImage: '/plumbing_section/caizer/3012 улучшенный.jpeg',
  },
  {
    id: 'sink-1',
    category: 'Раковины',
    name: 'Раковина подвесная',
    price: 8999,
    image: '/plumbing_section/caizer/3014.png',
    hoverImage: '/plumbing_section/caizer/3014 улучшенный.jpeg',
  },
  {
    id: 'bath-1',
    category: 'Ванны',
    name: 'Ванна акриловая',
    price: 25999,
    status: 'Хит',
    image: '/plumbing_section/caizer/3016.png',
    hoverImage: '/plumbing_section/caizer/3016 улучшенный.jpeg',
  },
  {
    id: 'shower-1',
    category: 'Душевые системы',
    name: 'Душевая система с тропическим душем',
    price: 15999,
    image: '/plumbing_section/caizer/3030.png',
    hoverImage: '/plumbing_section/caizer/3030 улучшенный.jpeg',
  },
  {
    id: 'mixer-2',
    category: 'Смесители',
    name: 'Смеситель для ванны',
    price: 7999,
    image: '/plumbing_section/caizer/3012.png',
    hoverImage: '/plumbing_section/caizer/3012 улучшенный.jpeg',
  },
  {
    id: 'sink-2',
    category: 'Раковины',
    name: 'Раковина накладная',
    price: 12999,
    status: 'Новинка',
    image: '/plumbing_section/caizer/3014.png',
    hoverImage: '/plumbing_section/caizer/3014 улучшенный.jpeg',
  },
  {
    id: 'bath-2',
    category: 'Ванны',
    name: 'Ванна чугунная',
    price: 35999,
    image: '/plumbing_section/caizer/3016.png',
    hoverImage: '/plumbing_section/caizer/3016 улучшенный.jpeg',
  },
  {
    id: 'shower-2',
    category: 'Душевые системы',
    name: 'Душевая кабина угловая',
    price: 18999,
    status: 'Хит',
    image: '/plumbing_section/caizer/3030.png',
    hoverImage: '/plumbing_section/caizer/3030 улучшенный.jpeg',
  },
  {
    id: 'mixer-3',
    category: 'Смесители',
    name: 'Смеситель для кухни',
    price: 6499,
    image: '/plumbing_section/caizer/3012.png',
    hoverImage: '/plumbing_section/caizer/3012 улучшенный.jpeg',
  },
  {
    id: 'sink-3',
    category: 'Раковины',
    name: 'Раковина встраиваемая',
    price: 9999,
    image: '/plumbing_section/caizer/3014.png',
    hoverImage: '/plumbing_section/caizer/3014 улучшенный.jpeg',
  },
  {
    id: 'bath-3',
    category: 'Ванны',
    name: 'Ванна гидромассажная',
    price: 45999,
    status: 'Новинка',
    image: '/plumbing_section/caizer/3016.png',
    hoverImage: '/plumbing_section/caizer/3016 улучшенный.jpeg',
  },
  {
    id: 'shower-3',
    category: 'Душевые системы',
    name: 'Душевая панель',
    price: 12999,
    image: '/plumbing_section/caizer/3030.png',
    hoverImage: '/plumbing_section/caizer/3030 улучшенный.jpeg',
  },
  {
    id: 'mixer-4',
    category: 'Смесители',
    name: 'Смеситель настенный',
    price: 8499,
    status: 'Хит',
    image: '/plumbing_section/caizer/3012.png',
    hoverImage: '/plumbing_section/caizer/3012 улучшенный.jpeg',
  },
  {
    id: 'sink-4',
    category: 'Раковины',
    name: 'Раковина двойная',
    price: 16999,
    image: '/plumbing_section/caizer/3014.png',
    hoverImage: '/plumbing_section/caizer/3014 улучшенный.jpeg',
  },
  {
    id: 'bath-4',
    category: 'Ванны',
    name: 'Ванна угловая',
    price: 29999,
    image: '/plumbing_section/caizer/3016.png',
    hoverImage: '/plumbing_section/caizer/3016 улучшенный.jpeg',
  },
  {
    id: 'shower-4',
    category: 'Душевые системы',
    name: 'Душевая стойка',
    price: 9999,
    status: 'Новинка',
    image: '/plumbing_section/caizer/3030.png',
    hoverImage: '/plumbing_section/caizer/3030 улучшенный.jpeg',
  },
  {
    id: 'mixer-5',
    category: 'Смесители',
    name: 'Смеситель с душем',
    price: 7499,
    image: '/plumbing_section/caizer/3012.png',
    hoverImage: '/plumbing_section/caizer/3012 улучшенный.jpeg',
  },
  {
    id: 'sink-5',
    category: 'Раковины',
    name: 'Раковина с тумбой',
    price: 19999,
    status: 'Хит',
    image: '/plumbing_section/caizer/3014.png',
    hoverImage: '/plumbing_section/caizer/3014 улучшенный.jpeg',
  },
  {
    id: 'bath-5',
    category: 'Ванны',
    name: 'Ванна отдельностоящая',
    price: 55999,
    image: '/plumbing_section/caizer/3016.png',
    hoverImage: '/plumbing_section/caizer/3016 улучшенный.jpeg',
  },
  {
    id: 'shower-5',
    category: 'Душевые системы',
    name: 'Душевой гарнитур',
    price: 6999,
    image: '/plumbing_section/caizer/3030.png',
    hoverImage: '/plumbing_section/caizer/3030 улучшенный.jpeg',
  },
  {
    id: 'mixer-6',
    category: 'Смесители',
    name: 'Смеситель термостатический',
    price: 11999,
    status: 'Новинка',
    image: '/plumbing_section/caizer/3012.png',
    hoverImage: '/plumbing_section/caizer/3012 улучшенный.jpeg',
  },
  {
    id: 'sink-6',
    category: 'Раковины',
    name: 'Раковина компактная',
    price: 5999,
    image: '/plumbing_section/caizer/3014.png',
    hoverImage: '/plumbing_section/caizer/3014 улучшенный.jpeg',
  },
  {
    id: 'bath-6',
    category: 'Ванны',
    name: 'Ванна стальная',
    price: 18999,
    status: 'Хит',
    image: '/plumbing_section/caizer/3016.png',
    hoverImage: '/plumbing_section/caizer/3016 улучшенный.jpeg',
  },
  {
    id: 'shower-6',
    category: 'Душевые системы',
    name: 'Душевая система скрытого монтажа',
    price: 24999,
    image: '/plumbing_section/caizer/3030.png',
    hoverImage: '/plumbing_section/caizer/3030 улучшенный.jpeg',
  },
  {
    id: 'mixer-7',
    category: 'Смесители',
    name: 'Смеситель сенсорный',
    price: 13999,
    image: '/plumbing_section/caizer/3012.png',
    hoverImage: '/plumbing_section/caizer/3012 улучшенный.jpeg',
  },
  {
    id: 'sink-7',
    category: 'Раковины',
    name: 'Раковина керамическая',
    price: 7999,
    status: 'Новинка',
    image: '/plumbing_section/caizer/3014.png',
    hoverImage: '/plumbing_section/caizer/3014 улучшенный.jpeg',
  },
  {
    id: 'bath-7',
    category: 'Ванны',
    name: 'Ванна с хромотерапией',
    price: 65999,
    image: '/plumbing_section/caizer/3016.png',
    hoverImage: '/plumbing_section/caizer/3016 улучшенный.jpeg',
  },
  {
    id: 'shower-7',
    category: 'Душевые системы',
    name: 'Душевая лейка тропическая',
    price: 4999,
    status: 'Хит',
    image: '/plumbing_section/caizer/3030.png',
    hoverImage: '/plumbing_section/caizer/3030 улучшенный.jpeg',
  },
  {
    id: 'mixer-8',
    category: 'Смесители',
    name: 'Смеситель каскадный',
    price: 9999,
    image: '/plumbing_section/caizer/3012.png',
    hoverImage: '/plumbing_section/caizer/3012 улучшенный.jpeg',
  },
  {
    id: 'sink-8',
    category: 'Раковины',
    name: 'Раковина угловая',
    price: 11999,
    image: '/plumbing_section/caizer/3014.png',
    hoverImage: '/plumbing_section/caizer/3014 улучшенный.jpeg',
  },
];

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
          {products.map((product, index) => (
            <CatalogCard key={index} {...product} />
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
