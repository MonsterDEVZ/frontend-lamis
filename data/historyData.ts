export interface TimelineItem {
  type: 'intro' | 'event';
  year?: string;
  title: string;
  description: string[];
  image?: string;
}

export const historyData: TimelineItem[] = [
  {
    type: 'intro',
    title: 'Наша история',
    description: ['Lamis® — это российский производитель сантехники...'],
  },
  {
    type: 'event',
    year: '2004',
    title: 'Основание компании и создание бренда Lamis®.',
    description: [
      'Запуск первых товарных категорий: «Смесители», «Душевые аксессуары»,',
      '«Санитарная керамика».',
    ],
    image: '/images/about-brand.png',
  },
  {
    type: 'event',
    year: '2006',
    title: 'Выход продукции Lamis® на рынок СНГ.',
    description: ['Открытие собственного производства изделий...'],
    image: '/images/about-brand.png',
  },
  {
    type: 'event',
    year: '2007',
    title: 'Выход продукции Lamis® на рынок СНГ.',
    description: ['Открытие собственного производства изделий...'],
    image: '/images/about-brand.png',
  },
  {
    type: 'event',
    year: '2008',
    title: 'Выход продукции Lamis® на рынок СНГ.',
    description: ['Открытие собственного производства изделий...'],
    image: '/images/about-brand.png',
  },
  {
    type: 'event',
    year: '2009',
    title: 'Выход продукции Lamis® на рынок СНГ.',
    description: ['Открытие собственного производства изделий...'],
    image: '/images/about-brand.png',
  },
];