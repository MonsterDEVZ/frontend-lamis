/**
 * useProducts Hook
 * Хук для получения продуктов (с поддержкой локальных данных и API)
 */

import { useMemo } from 'react';
import { productsData } from '@/data/products';
import { Product } from '@/types/product';

// Feature flag для переключения между локальными данными и API
const USE_API = process.env.NEXT_PUBLIC_USE_API === 'true';

// Маппинг категорий к brandId
const categoryToBrandId: Record<string, number> = {
  furniture: 1, // Lamis
  mirrors: 1, // Lamis
  heaters: 1, // Lamis
  caizer: 2, // Caizer
  blesk: 3, // Blesk
};

interface UseProductsOptions {
  brandId?: number | null;
  categoryId?: string | null;
  collectionId?: string | null;
  sortBy?: string;
}

interface ProcessedProduct extends Product {
  categoryKey: string;
  categoryId: string;
  collectionId?: string;
  price: number;
  status?: string;
  hoverImage: string;
  collection: string;
  isNew?: boolean;
  brandId: number;
  inStock: boolean;
}

/**
 * Хук для получения всех продуктов
 * В будущем здесь можно будет переключиться на API
 */
export function useProducts(options: UseProductsOptions = {}) {
  // Получаем все продукты из локальных данных
  const allProducts = useMemo<ProcessedProduct[]>(() => {
    const products: ProcessedProduct[] = [];

    for (const category in productsData) {
      const categoryProducts = productsData[category];
      for (const product of categoryProducts) {
        const priceNumber = parseInt(product.price.replace(/[^\d]/g, ''), 10);
        const brandId = product.brandId || categoryToBrandId[category] || 1;

        const brandNames: Record<number, string> = {
          1: 'Lamis',
          2: 'Caizer',
          3: 'Blesk',
        };
        const collectionName = brandNames[brandId] || 'Lamis';

        products.push({
          ...product,
          id: product.id,
          category: product.category,
          categoryKey: category,
          categoryId: (product as any).categoryId || category,
          collectionId: (product as any).collectionId,
          name: product.name,
          price: priceNumber,
          status: product.isNew ? 'Новинка' : undefined,
          image: product.image,
          hoverImage: product.images?.[1] || product.image,
          slug: product.slug || '',
          collection: collectionName,
          isNew: product.isNew,
          brandId: brandId,
          inStock: product.inStock !== undefined ? product.inStock : true,
        });
      }
    }

    return products;
  }, []);

  // Фильтрация продуктов
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Фильтрация по бренду
    if (options.brandId !== null && options.brandId !== undefined) {
      result = result.filter((product) => product.brandId === options.brandId);
    }

    // Фильтрация по категории
    if (options.categoryId !== null && options.categoryId !== undefined) {
      result = result.filter((product) => {
        const prodCatId = product.categoryId || product.categoryKey;
        return prodCatId === options.categoryId;
      });
    }

    // Фильтрация по коллекции
    if (options.collectionId !== null && options.collectionId !== undefined) {
      result = result.filter((product) => product.collectionId === options.collectionId);
    }

    // Сортировка
    switch (options.sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
      case 'sale':
        // TODO: Добавить логику для товаров по акции
        break;
      case 'default':
      default:
        // Без сортировки
        break;
    }

    return result;
  }, [allProducts, options.brandId, options.categoryId, options.collectionId, options.sortBy]);

  return {
    products: filteredProducts,
    allProducts,
    isLoading: false, // В будущем здесь будет реальный loading state от API
    error: null, // В будущем здесь будет реальная ошибка от API
  };
}

/**
 * Хук для получения продукта по slug
 */
export function useProduct(slug: string) {
  const { allProducts } = useProducts();

  const product = useMemo(() => {
    return allProducts.find((p) => p.slug === slug);
  }, [allProducts, slug]);

  return {
    product,
    isLoading: false,
    error: null,
  };
}
