/**
 * Products Data
 * Централизованное хранилище всех данных о товарах
 */

import { Product, ProductsData, Tab, Collection } from '@/types/product';

/**
 * Табы для категорий товаров
 */
export const productTabs: Tab[] = [
  { id: 'heaters', label: 'Умные водонагреватели', count: 8 },
  { id: 'mirrors', label: 'Зеркала Lamis', count: 12 },
  { id: 'blesk', label: 'Умные водонагреватели Blesk', count: 6 },
  { id: 'caizer', label: 'Сантехника Caizer', count: 16 },
  { id: 'furniture', label: 'Мебель для ванн Lamis', count: 24 },
];

/**
 * Все продукты, сгруппированные по категориям
 */
export const productsData: ProductsData = {
  heaters: [
    {
      id: 'h1',
      name: 'Водонагреватель Smart',
      price: '12 990 С',
      image: '/products/caizer/caizer-product-1.png',
      category: 'Heaters',
      isNew: true,
      slug: 'vodonagrevatel-smart',
      sku: 'WH-SMART-001',
      shortDescription:
        'Умный водонагреватель с Wi-Fi управлением и энергосберегающим режимом',
      description:
        'Водонагреватель Smart - это современное решение для вашего дома. Оснащен интеллектуальной системой управления температурой, Wi-Fi модулем для удаленного контроля через мобильное приложение и энергосберегающим режимом работы. Изготовлен из высококачественной нержавеющей стали с многослойной теплоизоляцией.',
      images: [
        '/products/caizer/caizer-product-1.png',
        '/products/caizer/caizer-product-2.png',
        '/products/caizer/caizer-product-3.png',
        '/products/caizer/caizer-product-4.png',
      ],
      colors: [
        { name: 'Белый', hex: '#FFFFFF', available: true },
        { name: 'Серебристый', hex: '#C0C0C0', available: true },
        { name: 'Черный', hex: '#000000', available: false },
      ],
      specifications: [
        { label: 'Объем', value: '50 литров' },
        { label: 'Мощность', value: '2000 Вт' },
        { label: 'Время нагрева', value: '45 минут' },
        { label: 'Материал бака', value: 'Нержавеющая сталь' },
        { label: 'Гарантия', value: '5 лет' },
        { label: 'Тип управления', value: 'Электронный + Wi-Fi' },
        { label: 'Размеры', value: '450 x 470 x 815 мм' },
        { label: 'Вес', value: '22 кг' },
      ],
      relatedProducts: ['h2', 'h3', 'h4'],
    },
    {
      id: 'h2',
      name: 'Водонагреватель Pro',
      price: '15 490 С',
      image: '/products/caizer/caizer-product-2.png',
      category: 'Heaters',
      isNew: false,
      slug: 'vodonagrevatel-pro',
      sku: 'WH-PRO-002',
    },
    {
      id: 'h3',
      name: 'Водонагреватель Max',
      price: '18 990 С',
      image: '/products/caizer/caizer-product-3.png',
      category: 'Heaters',
      isNew: true,
      slug: 'vodonagrevatel-max',
      sku: 'WH-MAX-003',
    },
    {
      id: 'h4',
      name: 'Водонагреватель Ultra',
      price: '21 490 С',
      image: '/products/caizer/caizer-product-4.png',
      category: 'Heaters',
      isNew: false,
      slug: 'vodonagrevatel-ultra',
      sku: 'WH-ULTRA-004',
    },
  ],
  mirrors: [
    {
      id: 'm1',
      name: 'Зеркало LED Premium',
      price: '8 990 С',
      image: '/products/caizer/caizer-product-1.png',
      category: 'Mirrors',
      isNew: true,
    },
    {
      id: 'm2',
      name: 'Зеркало Smart Touch',
      price: '11 490 С',
      image: '/products/caizer/caizer-product-2.png',
      category: 'Mirrors',
      isNew: true,
    },
    {
      id: 'm3',
      name: 'Зеркало Classic',
      price: '6 490 С',
      image: '/products/caizer/caizer-product-3.png',
      category: 'Mirrors',
      isNew: false,
    },
    {
      id: 'm4',
      name: 'Зеркало Luxury',
      price: '14 990 С',
      image: '/products/caizer/caizer-product-4.png',
      category: 'Mirrors',
      isNew: true,
    },
  ],
  blesk: [
    {
      id: 'b1',
      name: 'Blesk Standard',
      price: '9 990 С',
      image: '/products/caizer/caizer-product-1.png',
      category: 'Blesk',
      isNew: false,
    },
    {
      id: 'b2',
      name: 'Blesk Premium',
      price: '13 990 С',
      image: '/products/caizer/caizer-product-2.png',
      category: 'Blesk',
      isNew: true,
    },
    {
      id: 'b3',
      name: 'Blesk Elite',
      price: '17 490 С',
      image: '/products/caizer/caizer-product-3.png',
      category: 'Blesk',
      isNew: true,
    },
    {
      id: 'b4',
      name: 'Blesk Pro',
      price: '19 990 С',
      image: '/products/caizer/caizer-product-4.png',
      category: 'Blesk',
      isNew: false,
    },
  ],
  caizer: [
    {
      id: 1,
      name: 'Сантехника Caizer',
      price: '4 490 С',
      image: '/products/caizer/caizer-product-1.png',
      category: 'Caizer',
      isNew: true,
    },
    {
      id: 2,
      name: 'Сантехника Caizer',
      price: '4 490 С',
      image: '/products/caizer/caizer-product-2.png',
      category: 'Caizer',
      isNew: true,
    },
    {
      id: 3,
      name: 'Сантехника Caizer',
      price: '4 490 С',
      image: '/products/caizer/caizer-product-3.png',
      category: 'Caizer',
      isNew: true,
    },
    {
      id: 4,
      name: 'Сантехника Caizer',
      price: '4 490 С',
      image: '/products/caizer/caizer-product-4.png',
      category: 'Caizer',
      isNew: true,
    },
  ],
  furniture: [
    {
      id: 'f1',
      name: 'Мебель Lamis Classic',
      price: '24 990 С',
      image: '/products/caizer/caizer-product-1.png',
      category: 'Furniture',
      isNew: false,
    },
    {
      id: 'f2',
      name: 'Мебель Lamis Modern',
      price: '29 990 С',
      image: '/products/caizer/caizer-product-2.png',
      category: 'Furniture',
      isNew: true,
    },
    {
      id: 'f3',
      name: 'Мебель Lamis Premium',
      price: '34 490 С',
      image: '/products/caizer/caizer-product-3.png',
      category: 'Furniture',
      isNew: true,
    },
    {
      id: 'f4',
      name: 'Мебель Lamis Luxury',
      price: '39 990 С',
      image: '/products/caizer/caizer-product-4.png',
      category: 'Furniture',
      isNew: false,
    },
  ],
};

/**
 * Коллекции мебели
 */
export const collections: Collection[] = [
  { name: 'Ламис', image: '/collections/lamis.png', slug: 'lamis' },
  { name: 'Nora', image: '/collections/nora.png', slug: 'nora' },
  { name: 'Akcent', image: '/collections/akcent.png', slug: 'akcent' },
  { name: 'Andalusia', image: '/collections/andalusia.png', slug: 'andalusia' },
];
