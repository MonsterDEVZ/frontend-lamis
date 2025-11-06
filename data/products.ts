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
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
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
      images: [
        '/products/caizer/caizer-product-2.png',
        '/products/caizer/caizer-product-1.png',
        '/products/caizer/caizer-product-3.png',
        '/products/caizer/caizer-product-4.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
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
      images: [
        '/products/caizer/caizer-product-3.png',
        '/products/caizer/caizer-product-4.png',
        '/products/caizer/caizer-product-1.png',
        '/products/caizer/caizer-product-2.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
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
      images: [
        '/products/caizer/caizer-product-4.png',
        '/products/caizer/caizer-product-3.png',
        '/products/caizer/caizer-product-2.png',
        '/products/caizer/caizer-product-1.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
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
      slug: 'zerkalo-led-premium',
      sku: 'SKU-m1',
      images: [
        '/products/caizer/caizer-product-1.png',
        '/products/caizer/caizer-product-2.png',
        '/products/caizer/caizer-product-3.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
    },
    {
      id: 'm2',
      name: 'Зеркало Smart Touch',
      price: '11 490 С',
      image: '/products/caizer/caizer-product-2.png',
      category: 'Mirrors',
      isNew: true,
      slug: 'zerkalo-smart-touch',
      sku: 'SKU-m2',
      images: [
        '/products/caizer/caizer-product-2.png',
        '/products/caizer/caizer-product-3.png',
        '/products/caizer/caizer-product-1.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
    },
    {
      id: 'm3',
      name: 'Зеркало Classic',
      price: '6 490 С',
      image: '/products/caizer/caizer-product-3.png',
      category: 'Mirrors',
      isNew: false,
      slug: 'zerkalo-classic',
      sku: 'SKU-m3',
      images: [
        '/products/caizer/caizer-product-3.png',
        '/products/caizer/caizer-product-4.png',
        '/products/caizer/caizer-product-2.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
    },
    {
      id: 'm4',
      name: 'Зеркало Luxury',
      price: '14 990 С',
      image: '/products/caizer/caizer-product-4.png',
      category: 'Mirrors',
      isNew: true,
      slug: 'zerkalo-luxury',
      sku: 'SKU-m4',
      images: [
        '/products/caizer/caizer-product-4.png',
        '/products/caizer/caizer-product-1.png',
        '/products/caizer/caizer-product-3.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
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
      slug: 'blesk-standard',
      sku: 'BL-STD-001',
      images: [
        '/products/caizer/caizer-product-1.png',
        '/products/caizer/caizer-product-2.png',
        '/products/caizer/caizer-product-3.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
    },
    {
      id: 'b2',
      name: 'Blesk Premium',
      price: '13 990 С',
      image: '/products/caizer/caizer-product-2.png',
      category: 'Blesk',
      isNew: true,
      slug: 'blesk-premium',
      sku: 'BL-PRM-002',
      images: [
        '/products/caizer/caizer-product-2.png',
        '/products/caizer/caizer-product-3.png',
        '/products/caizer/caizer-product-4.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
    },
    {
      id: 'b3',
      name: 'Blesk Elite',
      price: '17 490 С',
      image: '/products/caizer/caizer-product-3.png',
      category: 'Blesk',
      isNew: true,
      slug: 'blesk-elite',
      sku: 'BL-ELT-003',
      images: [
        '/products/caizer/caizer-product-3.png',
        '/products/caizer/caizer-product-4.png',
        '/products/caizer/caizer-product-1.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
    },
    {
      id: 'b4',
      name: 'Blesk Pro',
      price: '19 990 С',
      image: '/products/caizer/caizer-product-4.png',
      category: 'Blesk',
      isNew: false,
      slug: 'blesk-pro',
      sku: 'BL-PRO-004',
      images: [
        '/products/caizer/caizer-product-4.png',
        '/products/caizer/caizer-product-1.png',
        '/products/caizer/caizer-product-2.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
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
      slug: 'santehnika-caizer-1',
      sku: 'CZ-001',
      images: [
        '/products/caizer/caizer-product-1.png',
        '/products/caizer/caizer-product-2.png',
        '/products/caizer/caizer-product-3.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
    },
    {
      id: 2,
      name: 'Сантехника Caizer',
      price: '4 490 С',
      image: '/products/caizer/caizer-product-2.png',
      category: 'Caizer',
      isNew: true,
      slug: 'santehnika-caizer-2',
      sku: 'CZ-002',
      images: [
        '/products/caizer/caizer-product-2.png',
        '/products/caizer/caizer-product-3.png',
        '/products/caizer/caizer-product-4.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
    },
    {
      id: 3,
      name: 'Сантехника Caizer',
      price: '4 490 С',
      image: '/products/caizer/caizer-product-3.png',
      category: 'Caizer',
      isNew: true,
      slug: 'santehnika-caizer-3',
      sku: 'CZ-003',
      images: [
        '/products/caizer/caizer-product-3.png',
        '/products/caizer/caizer-product-4.png',
        '/products/caizer/caizer-product-1.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
    },
    {
      id: 4,
      name: 'Сантехника Caizer',
      price: '4 490 С',
      image: '/products/caizer/caizer-product-4.png',
      category: 'Caizer',
      isNew: true,
      slug: 'santehnika-caizer-4',
      sku: 'CZ-004',
      images: [
        '/products/caizer/caizer-product-4.png',
        '/products/caizer/caizer-product-1.png',
        '/products/caizer/caizer-product-2.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
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
      slug: 'mebel-lamis-classic',
      sku: 'FRN-CLS-001',
      images: [
        '/products/caizer/caizer-product-1.png',
        '/products/caizer/caizer-product-2.png',
        '/products/caizer/caizer-product-3.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
    },
    {
      id: 'f2',
      name: 'Мебель Lamis Modern',
      price: '29 990 С',
      image: '/products/caizer/caizer-product-2.png',
      category: 'Furniture',
      isNew: true,
      slug: 'mebel-lamis-modern',
      sku: 'FRN-MDN-002',
      images: [
        '/products/caizer/caizer-product-2.png',
        '/products/caizer/caizer-product-3.png',
        '/products/caizer/caizer-product-4.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
    },
    {
      id: 'f3',
      name: 'Мебель Lamis Premium',
      price: '34 490 С',
      image: '/products/caizer/caizer-product-3.png',
      category: 'Furniture',
      isNew: true,
      slug: 'mebel-lamis-premium',
      sku: 'FRN-PRM-003',
      images: [
        '/products/caizer/caizer-product-3.png',
        '/products/caizer/caizer-product-4.png',
        '/products/caizer/caizer-product-1.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
    },
    {
      id: 'f4',
      name: 'Мебель Lamis Luxury',
      price: '39 990 С',
      image: '/products/caizer/caizer-product-4.png',
      category: 'Furniture',
      isNew: false,
      slug: 'mebel-lamis-luxury',
      sku: 'FRN-LUX-004',
      images: [
        '/products/caizer/caizer-product-4.png',
        '/products/caizer/caizer-product-1.png',
        '/products/caizer/caizer-product-2.png',
      ],
      colors: [
        { name: 'Матовый графит', hex: '#2C2C2C', available: true },
        { name: 'Хром', hex: '#C0C0C0', available: true },
        { name: 'Золото', hex: '#D4AF37', available: true },
      ],
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
