'use client';
import { useState, type FC } from 'react';
import Header from '@/components/Header';
import CatalogCard from '@/components/ui/CatalogCard';
import { Button } from '@/components/ui/Button';
import { Select, SelectOption } from '../ui/Select';

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

const Catalog: FC = () => {
  // Состояния для хранения выбранных значений
  const [sortValue, setSortValue] = useState('default');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [defaultSelectValue, setDefaultSelectValue] = useState('12');

  return (
    <div className="pb-24">
      <Header />
      <div
        className="w-full h-[400px] bg-cover bg-center pb-24 flex items-end"
        style={{ backgroundImage: "url('/images/hero/screen_1.png')" }}
      >
        <div className="container">
          <h1 className="text-white text-[64px] font-bold">Каталог товаров</h1>
        </div>
      </div>

      <div className="container mt-50 pb-8">
        <div className="flex flex-wrap gap-3.5 mb-8">
          {tabs.map((tab, idx) => (
            <Button key={tab} variant={idx === 0 ? 'primary' : 'outline'}>
              {tab}
            </Button>
          ))}
        </div>

        <div className="container flex justify-end gap-3.5 mt-50 mb-8">
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

          {/* Фильтр по цвету (с чекбоксами) */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <CatalogCard key={index} {...product} />
          ))}
        </div>
      </div>

      <div className="container w-full mt-50">
        <div className="flex justify-between items-center gap-5">
          <div className="flex justify-center items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <Button key={num} variant={num === 1 ? 'primary' : 'outline'} size="icon">
                {num}
              </Button>
            ))}
          </div>

          <Button variant="dark" size="lg">
            Показать ещё
          </Button>
          {/* Стандартный селект */}
          <div className="w-64">
            <Select
              placeholder="Показывать по"
              intent="default"
              value={defaultSelectValue}
              onChange={(val) => setDefaultSelectValue(val as string)}
            >
              <SelectOption value="12">Показывать по 12</SelectOption>
              <SelectOption value="48">Показывать по 48</SelectOption>
            </Select>
          </div>
          {/* <Button variant="dark" size="lg">
            Показать по 12
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
