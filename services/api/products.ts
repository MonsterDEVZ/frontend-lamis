/**
 * Products API Service
 * Сервис для работы с API продуктов
 */

import { Product, Section, Category, Collection, Type } from '@/types/product';

// API Response types - Django REST Framework format
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface DjangoPage<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
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
  sectionId?: number | null; // Renamed from brandId
  categoryId?: number | null;
  collectionId?: number | null;
  typeId?: number | null; // NEW: Type filter
  sortBy?: string;
  page?: number;
  itemsPerPage?: number;
  inStock?: boolean;

  // Deprecated (for backward compatibility)
  brandId?: number | null; // Use sectionId instead
}

// API URL configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

/**
 * Получить список продуктов с фильтрами и пагинацией
 */
export async function fetchProducts(
  filters: ProductsFilters = {}
): Promise<PaginatedResponse<Product>> {
  const params = new URLSearchParams();

  // Django backend uses snake_case parameters
  // Support both sectionId (new) and brandId (deprecated)
  const sectionId = filters.sectionId ?? filters.brandId;
  if (sectionId !== null && sectionId !== undefined) {
    params.append('section_id', sectionId.toString());
  }
  if (filters.categoryId !== null && filters.categoryId !== undefined) {
    params.append('category_id', filters.categoryId.toString());
  }
  if (filters.collectionId !== null && filters.collectionId !== undefined) {
    params.append('collection_id', filters.collectionId.toString());
  }
  if (filters.typeId !== null && filters.typeId !== undefined) {
    params.append('type_id', filters.typeId.toString());
  }
  if (filters.sortBy) {
    params.append('ordering', filters.sortBy);
  }
  if (filters.page) {
    params.append('page', filters.page.toString());
  }
  if (filters.itemsPerPage) {
    params.append('limit', filters.itemsPerPage.toString());
  }

  const response = await fetch(`${API_BASE_URL}/products/?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const djangoResponse: DjangoPage<any> = await response.json();

  // Transform Django response to expected format
  const itemsPerPage = filters.itemsPerPage || 20;
  const currentPage = filters.page || 1;
  const totalPages = Math.ceil(djangoResponse.count / itemsPerPage);

  return {
    data: djangoResponse.results,
    pagination: {
      currentPage,
      totalPages,
      totalItems: djangoResponse.count,
      itemsPerPage,
    },
  };
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
 * Получить все секции (Level 1)
 */
export async function fetchSections(): Promise<Section[]> {
  const response = await fetch(`${API_BASE_URL}/sections/`);

  if (!response.ok) {
    throw new Error(`Failed to fetch sections: ${response.statusText}`);
  }

  const data: DjangoPage<Section> = await response.json();
  return data.results;
}

/**
 * Получить все категории (опционально фильтрация по секции)
 */
export async function fetchCategories(sectionId?: number | null): Promise<Category[]> {
  const params = new URLSearchParams();

  if (sectionId !== null && sectionId !== undefined) {
    params.append('section_id', sectionId.toString());
  }

  const url = `${API_BASE_URL}/categories/${params.toString() ? '?' + params.toString() : ''}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }

  const data: DjangoPage<Category> = await response.json();
  return data.results;
}

/**
 * Получить все коллекции (опционально фильтрация по секции и категории)
 */
export async function fetchCollections(
  sectionId?: number | null,
  categoryId?: number | null
): Promise<Collection[]> {
  const params = new URLSearchParams();

  if (sectionId !== null && sectionId !== undefined) {
    params.append('section_id', sectionId.toString());
  }
  if (categoryId !== null && categoryId !== undefined) {
    params.append('category_id', categoryId.toString());
  }

  const url = `${API_BASE_URL}/collections/${params.toString() ? '?' + params.toString() : ''}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch collections: ${response.statusText}`);
  }

  const data: DjangoPage<Collection> = await response.json();
  return data.results;
}

/**
 * Получить все типы (опционально фильтрация по секции и категории)
 */
export async function fetchTypes(
  sectionId?: number | null,
  categoryId?: number | null
): Promise<Type[]> {
  const params = new URLSearchParams();

  if (sectionId !== null && sectionId !== undefined) {
    params.append('section_id', sectionId.toString());
  }
  if (categoryId !== null && categoryId !== undefined) {
    params.append('category_id', categoryId.toString());
  }

  const url = `${API_BASE_URL}/types/${params.toString() ? '?' + params.toString() : ''}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch types: ${response.statusText}`);
  }

  const data: DjangoPage<Type> = await response.json();
  return data.results;
}

// ===== SEO-FRIENDLY CATALOG NAVIGATION API =====

export interface CatalogSectionResponse {
  section: Section;
  categories: Category[];
}

export interface CatalogCategoryResponse {
  section: Section;
  category: Category;
  collections: Collection[];
  types: Type[];
}

export interface CatalogProductsResponse {
  section: Section;
  category: Category;
  collection: Collection | null;
  type: Type | null;
  products: Product[];
}

export interface CatalogStructure {
  section: Section;
  categories: Array<{
    category: Category;
    collections: Collection[];
    types: Type[];
  }>;
}

/**
 * Получить категории для секции
 * GET /catalog/{section_slug}/
 */
export async function fetchCatalogSection(sectionSlug: string): Promise<CatalogSectionResponse> {
  const response = await fetch(`${API_BASE_URL}/catalog/${sectionSlug}/`);

  if (!response.ok) {
    throw new Error(`Failed to fetch catalog section: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Получить коллекции и типы для категории
 * GET /catalog/{section_slug}/{category_slug}/
 */
export async function fetchCatalogCategory(
  sectionSlug: string,
  categorySlug: string
): Promise<CatalogCategoryResponse> {
  const response = await fetch(`${API_BASE_URL}/catalog/${sectionSlug}/${categorySlug}/`);

  if (!response.ok) {
    throw new Error(`Failed to fetch catalog category: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Получить продукты для коллекции или типа
 * GET /catalog/{section_slug}/{category_slug}/{item_slug}/
 */
export async function fetchCatalogProducts(
  sectionSlug: string,
  categorySlug: string,
  itemSlug: string
): Promise<CatalogProductsResponse> {
  const response = await fetch(
    `${API_BASE_URL}/catalog/${sectionSlug}/${categorySlug}/${itemSlug}/`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch catalog products: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Получить полную структуру каталога
 * GET /catalog/browse/
 */
export async function fetchCatalogBrowse(): Promise<{ catalog: CatalogStructure[] }> {
  const response = await fetch(`${API_BASE_URL}/catalog/browse/`);

  if (!response.ok) {
    throw new Error(`Failed to fetch catalog structure: ${response.statusText}`);
  }

  return response.json();
}
