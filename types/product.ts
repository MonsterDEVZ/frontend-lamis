/**
 * Product Type Definitions
 * Централизованные типы для всех товаров в системе
 */

export interface Product {
  id: string | number;
  name: string;
  price: string;
  image: string;
  category: string;
  isNew?: boolean;
  slug?: string;
  sku?: string;
  description?: string;
  shortDescription?: string;
  images?: string[];
  colors?: ProductColor[];
  specifications?: ProductSpecification[];
  relatedProducts?: string[]; // slugs of related products
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

export interface Collection {
  name: string;
  image: string;
  slug?: string;
}

export interface Tab {
  id: string;
  label: string;
  count: number;
}

export type ProductsData = Record<string, Product[]>;
