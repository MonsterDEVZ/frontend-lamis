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
