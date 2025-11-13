/**
 * Product Type Definitions
 * Централизованные типы для всех товаров в системе
 */

/**
 * Section (formerly Brand) - Level 1
 */
export interface Section {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

/**
 * Category - Level 2
 */
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  section: number;
  section_name?: string;
  image?: string;
  created_at?: string;
}

/**
 * Collection - Level 3a (parallel with Type)
 */
export interface Collection {
  id: number;
  name: string;
  slug: string;
  description?: string;
  section: number;
  category: number;
  section_name?: string;
  category_name?: string;
  image?: string;
  created_at?: string;
}

/**
 * Type (Вид) - Level 3b (parallel with Collection)
 */
export interface Type {
  id: number;
  name: string;
  slug: string;
  description?: string;
  section: number;
  category: number;
  section_name?: string;
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
  section_id: number; // Level 1: Section ID
  category_id: number; // Level 2: Category ID
  collection_id?: number | null; // Level 3a: Collection ID (mutually exclusive with type_id)
  type_id?: number | null; // Level 3b: Type ID (mutually exclusive with collection_id)

  // Associated names
  section_name?: string;
  category_name?: string;
  collection_name?: string | null;
  type_name?: string | null;

  // Deprecated fields (for backward compatibility, use section_id instead)
  section?: number;
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
