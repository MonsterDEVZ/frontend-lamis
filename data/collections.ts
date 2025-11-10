/**
 * Collections Data
 * Полный справочник коллекций/интерьеров с привязкой к брендам и категориям
 */

import { Collection } from '@/types/product';

/**
 * Все коллекции, сгруппированные иерархически
 * Бренд -> Категория -> Коллекция
 */
export const collections: Collection[] = [
  // ========== LAMIS FURNITURE COLLECTIONS (brandId: 1, categoryId: furniture) ==========
  {
    id: 'accent',
    name: 'Accent',
    brandId: 1,
    categoryId: 'furniture',
    slug: 'accent',
    description: 'Современная коллекция мебели для ванной в стиле минимализм',
    image: '/catalog/Lamis/Accent/AKTSENT-Closet-Black-400x300x1750-2017-2024.2.22-3DDD3DSKY.png',
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    brandId: 1,
    categoryId: 'furniture',
    slug: 'amsterdam',
    description: 'Элегантная коллекция с европейским дизайном',
    image: '/catalog/Lamis/Amsterdam/AMSTERDAM-1000x600x450-2017-2024.5.17-3DDD3DSKY.png',
  },
  {
    id: 'andalusia',
    name: 'Andalusia',
    brandId: 1,
    categoryId: 'furniture',
    slug: 'andalusia',
    description: 'Коллекция в средиземноморском стиле',
    image: '/catalog/Lamis/Andalusia/ANDALUSIA-1000x600x450-2017-2024.5.4-3DDD3DSKY.png',
  },
  {
    id: 'appalon-lamis',
    name: 'Appalon Lamis',
    brandId: 1,
    categoryId: 'furniture',
    slug: 'appalon-lamis',
    description: 'Премиум коллекция с инновационным дизайном',
    image: '/catalog/Lamis/Appalon lamis/1/APPALON-700x1000-2017-2024.5.14-3DDD3DSKY.png',
  },
  {
    id: 'arizona',
    name: 'Arizona',
    brandId: 1,
    categoryId: 'furniture',
    slug: 'arizona',
    description: 'Коллекция в современном американском стиле',
    image: '/catalog/Lamis/Arizona/1/ARIZONA-1000x600x450-02-2017-2024.5.3-3DDD3DSKY.png',
  },
  {
    id: 'atlanta',
    name: 'Atlanta',
    brandId: 1,
    categoryId: 'furniture',
    slug: 'atlanta',
    description: 'Стильная коллекция с контрастными решениями',
    image: '/catalog/Lamis/Atlanta/2/ATLANTA-Black-1000x450x600-2017-2024.5.19-3DDD3DSKY.png',
  },
  {
    id: 'deluxe',
    name: 'Deluxe',
    brandId: 1,
    categoryId: 'furniture',
    slug: 'deluxe',
    description: 'Роскошная коллекция премиум класса',
    image: '/catalog/Lamis/Deluxe/DELUXE-Blak-600x850x450-2017-2024.5.6-3DDD3DSKY.png',
  },
  {
    id: 'eklips',
    name: 'Eklips',
    brandId: 1,
    categoryId: 'furniture',
    slug: 'eklips',
    description: 'Коллекция с уникальными формами',
    image: '/catalog/Lamis/Eklips/EKLIPS-1000x450x300-01-2017-2024.5.3-3DDD3DSKY.png',
  },
  {
    id: 'granat',
    name: 'Granat',
    brandId: 1,
    categoryId: 'furniture',
    slug: 'granat',
    description: 'Классическая коллекция с богатой отделкой',
    image: '/catalog/Lamis/Granat/1/GRANAT-900x700x450-2017-2024.4.28-3DDD3DSKY.png',
  },
  {
    id: 'kapetown',
    name: 'Kapetown',
    brandId: 1,
    categoryId: 'furniture',
    slug: 'kapetown',
    description: 'Модерновая коллекция с африканскими мотивами',
    image: '/catalog/Lamis/Kapetown/1/CAPETOWN-Pencil-case-blak-1000x500x45-2017-2024.5.6-3DDD3DSKY.png',
  },
  {
    id: 'lamis',
    name: 'Lamis',
    brandId: 1,
    categoryId: 'furniture',
    slug: 'lamis',
    description: 'Флагманская коллекция бренда',
    image: '/catalog/Lamis/Lamis/LAMIS-White-800x450x700-2017-2024.2.21-3DDD3DSKY.png',
  },
  {
    id: 'nora',
    name: 'Nora',
    brandId: 1,
    categoryId: 'furniture',
    slug: 'nora',
    description: 'Элегантная коллекция в современном стиле',
    image: '/catalog/Lamis/Nora/nora-placeholder.png',
  },
  {
    id: 'omega',
    name: 'Omega',
    brandId: 1,
    categoryId: 'furniture',
    slug: 'omega',
    description: 'Современная коллекция с чистыми линиями',
    image: '/catalog/Lamis/Omega/omega-placeholder.png',
  },
  {
    id: 'palermo',
    name: 'Palermo',
    brandId: 1,
    categoryId: 'furniture',
    slug: 'palermo',
    description: 'Итальянский стиль и элегантность',
    image: '/catalog/Lamis/Palermo/palermo-placeholder.png',
  },
  {
    id: 'sanremo',
    name: 'Sanremo',
    brandId: 1,
    categoryId: 'furniture',
    slug: 'sanremo',
    description: 'Изысканная коллекция для современных интерьеров',
    image: '/catalog/Lamis/Sanremo/sanremo-placeholder.png',
  },
  {
    id: 'sevilya',
    name: 'Sevilya',
    brandId: 1,
    categoryId: 'furniture',
    slug: 'sevilya',
    description: 'Коллекция с испанским характером',
    image: '/catalog/Lamis/Sevilya/sevilya-placeholder.png',
  },

  // ========== LAMIS MIRRORS COLLECTION (brandId: 1, categoryId: mirrors) ==========
  {
    id: 'helios',
    name: 'Helios',
    brandId: 1,
    categoryId: 'mirrors',
    slug: 'helios',
    description: 'Умные LED зеркала с подсветкой',
    image: '/catalog/Lamis/Helios/1/HELIOS-01-2017-2024.5.13-3DDD3DSKY.png',
  },

  // ========== CAIZER PLUMBING (brandId: 2, categoryId: caizer) ==========
  {
    id: 'caizer-standard',
    name: 'Caizer Standard',
    brandId: 2,
    categoryId: 'caizer',
    slug: 'caizer-standard',
    description: 'Стандартная линейка сантехники Caizer',
    image: '/plumbing_section/caizer/3016.png',
  },

  // ========== BLESK WATER HEATERS (brandId: 3, categoryId: blesk) ==========
  {
    id: 'blesk-standard',
    name: 'Blesk Standard',
    brandId: 3,
    categoryId: 'blesk',
    slug: 'blesk-standard',
    description: 'Стандартная линейка водонагревателей Blesk',
    image: '/catalog/Blesk/Concept 30-50-80-100.png',
  },
];

/**
 * Вспомогательная функция для получения коллекций по brandId
 */
export const getCollectionsByBrand = (brandId: number): Collection[] => {
  return collections.filter((collection) => collection.brandId === brandId);
};

/**
 * Вспомогательная функция для получения коллекций по brandId и categoryId
 */
export const getCollectionsByBrandAndCategory = (
  brandId: number,
  categoryId: string
): Collection[] => {
  return collections.filter(
    (collection) => collection.brandId === brandId && collection.categoryId === categoryId
  );
};

/**
 * Вспомогательная функция для получения коллекции по id
 */
export const getCollectionById = (id: string): Collection | undefined => {
  return collections.find((collection) => collection.id === id);
};
