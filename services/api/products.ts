/**
 * Products API Service
 * Сервис для работы с API продуктов
 */

import { Product } from '@/types/product';

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface ProductsFilters {
  brandId?: number | null;
  categoryId?: string | null;
  collectionId?: string | null;
  sortBy?: string;
  page?: number;
  itemsPerPage?: number;
  inStock?: boolean;
}

// API URL configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Получить список продуктов с фильтрами и пагинацией
 */
export async function fetchProducts(
  filters: ProductsFilters = {}
): Promise<PaginatedResponse<Product>> {
  const params = new URLSearchParams();

  if (filters.brandId !== null && filters.brandId !== undefined) {
    params.append('brandId', filters.brandId.toString());
  }
  if (filters.categoryId) {
    params.append('categoryId', filters.categoryId);
  }
  if (filters.collectionId) {
    params.append('collectionId', filters.collectionId);
  }
  if (filters.sortBy) {
    params.append('sortBy', filters.sortBy);
  }
  if (filters.page) {
    params.append('page', filters.page.toString());
  }
  if (filters.itemsPerPage) {
    params.append('itemsPerPage', filters.itemsPerPage.toString());
  }
  if (filters.inStock !== undefined) {
    params.append('inStock', filters.inStock.toString());
  }

  const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Получить продукт по slug
 */
export async function fetchProductBySlug(slug: string): Promise<ApiResponse<Product>> {
  const response = await fetch(`${API_BASE_URL}/products/${slug}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Получить доступные категории для бренда
 */
export async function fetchCategoriesByBrand(brandId: number): Promise<ApiResponse<string[]>> {
  const response = await fetch(`${API_BASE_URL}/categories?brandId=${brandId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Получить доступные коллекции для бренда и категории
 */
export async function fetchCollectionsByBrandAndCategory(
  brandId: number,
  categoryId: string
): Promise<ApiResponse<string[]>> {
  const response = await fetch(
    `${API_BASE_URL}/collections?brandId=${brandId}&categoryId=${categoryId}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch collections: ${response.statusText}`);
  }

  return response.json();
}
