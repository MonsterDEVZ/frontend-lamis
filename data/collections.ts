import { Collection } from '@/types';

/**
 * Collections Data Source
 * Centralized data for all LAMIS furniture collections
 */
export const collections: Collection[] = [
  {
    id: '1',
    name: 'Ламис',
    slug: 'lamis',
    image: '/images/collections/lamis.png',
    description: 'Классическая коллекция мебели для ванной комнаты',
  },
  {
    id: '2',
    name: 'Nora',
    slug: 'nora',
    image: '/images/collections/nora.png',
    description: 'Современный дизайн с элегантными формами',
  },
  {
    id: '3',
    name: 'Akcent',
    slug: 'akcent',
    image: '/images/collections/akcent.png',
    description: 'Яркие акценты для современного интерьера',
  },
  {
    id: '4',
    name: 'Andalusia',
    slug: 'andalusia',
    image: '/images/collections/andalusia.png',
    description: 'Изысканная коллекция в средиземноморском стиле',
  },
];
