/**
 * Product Type Definitions
 * НОВАЯ АРХИТЕКТУРА: Section → Brand → Category → Collection/Type → Product
 * Централизованные типы для всех товаров в системе
 */

/**
 * Section (Раздел каталога) - Level 1
 * Examples: Мебель для ванной, Санфарфор, Смесители
 */
export interface Section {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  created_at?: string;
}

/**
 * Brand (Производитель) - Level 2
 * НОВАЯ АРХИТЕКТУРА: Brand теперь второй уровень после Section!
 * Examples: Lamis, Caizer, Blesk
 */
export interface Brand {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  created_at?: string;
}

/**
 * Category (Категория) - Level 3
 * НОВАЯ АРХИТЕКТУРА: Category зависит от Section + Brand
 */
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  section: number;
  section_name?: string;
  brand: number; // НОВОЕ! Обязательно
  brand_name?: string; // НОВОЕ!
  image?: string;
  created_at?: string;
}

/**
 * Collection (Коллекция) - Level 4a (parallel with Type)
 * НОВАЯ АРХИТЕКТУРА: Collection зависит от Brand + Category (section убрали!)
 */
export interface Collection {
  id: number;
  name: string;
  slug: string;
  description?: string;
  brand: number; // ИЗМЕНЕНО! Теперь brand вместо section
  brand_name?: string; // НОВОЕ!
  category: number;
  category_name?: string;
  image?: string;
  created_at?: string;
}

/**
 * Type (Вид) - Level 4b (parallel with Collection)
 * НОВАЯ АРХИТЕКТУРА: Type зависит ТОЛЬКО от Category (section убрали!)
 */
export interface Type {
  id: number;
  name: string;
  slug: string;
  description?: string;
  category: number; // ИЗМЕНЕНО! Только category, без section
  category_name?: string;
  image?: string;
  created_at?: string;
}

export interface Product {
  id: string | number;
  name: string;
  price: string;
  image: string;
  category: string;

  // Primary API fields (from Backend)
  // НОВАЯ АРХИТЕКТУРА: 5-уровневая фильтрация
  section_id: number; // Level 1: Section ID
  brand_id: number; // Level 2: Brand ID (НОВОЕ! ОБЯЗАТЕЛЬНО)
  category_id: number; // Level 3: Category ID
  collection_id?: number | null; // Level 4a: Collection ID (mutually exclusive with type_id)
  type_id?: number | null; // Level 4b: Type ID (mutually exclusive with collection_id)

  // Associated names
  section_name?: string;
  brand_name?: string; // НОВОЕ!
  category_name?: string;
  collection_name?: string | null;
  type_name?: string | null;

  // Deprecated fields (for backward compatibility)
  section?: number;
  brand?: number; // Для совместимости
  collection?: number | null;
  type?: number | null;
  isNew?: boolean;
  is_new?: boolean; // API field
  is_on_sale?: boolean; // API field
  inStock?: boolean; // Availability status (default: true)
  slug?: string;
  sku?: string;
  description?: string;
  shortDescription?: string;
  images?: string[];
  main_image_url?: string; // Main product image URL from API
  hover_image_url?: string; // Hover/render image URL from API
  colors?: ProductColor[];
  specifications?: ProductSpecification[];
  relatedProducts?: string[]; // slugs of related products

  // Deprecated fields (for backward compatibility)
  brandId?: number; // Use 'section' instead
}

export interface ProductColor {
  name: string;
  hex: string;
  available: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Tab {
  id: string;
  label: string;
  count: number;
}

export type ProductsData = Record<string, Product[]>;

/**
 * Search Result Type
 * Unified type for search results from different sources
 */
export interface SearchResult {
  id: number;
  name: string;
  type: 'product' | 'collection' | 'category' | 'brand';
  breadcrumb: string;
  section_id: number | null;
  brand_id: number | null;
  category_id: number | null;
  collection_id: number | null;
  type_id: number | null;
  slug?: string;
  image?: string | null;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
}
