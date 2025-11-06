import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Типы для категорий, коллекций и продуктов
export interface Category {
  id: string;
  label: string;
  brandId?: number;
}

export interface Collection {
  id: string;
  name: string;
  brandId: number;
  categoryId: string;
  slug?: string;
}

export interface Product {
  id: string;
  categoryKey?: string; // deprecated, используем categoryId
  categoryId?: string;
  collectionId?: string;
  brandId: number;
  [key: string]: any;
}

interface FiltersState {
  // ===== ТРЕХУРОВНЕВОЕ СОСТОЯНИЕ =====
  selectedBrandId: number | null;      // Уровень 1: Бренд (одиночный выбор)
  selectedCategoryId: string | null;   // Уровень 2: Категория (одиночный выбор)
  selectedCollectionId: string | null; // Уровень 3: Коллекция (одиночный выбор)

  // Доступные опции для каждого уровня
  availableCategories: Category[];     // Категории, доступные для выбранного бренда
  availableCollections: Collection[];  // Коллекции, доступные для бренда+категории

  // Дополнительные фильтры
  sortBy: string;
  selectedColors: string[];

  // ===== ДЕЙСТВИЯ =====
  // Уровень 1: Установка бренда (сбрасывает категорию и коллекцию)
  setBrandId: (brandId: number | null, allProducts: Product[]) => void;

  // Уровень 2: Установка категории (сбрасывает коллекцию)
  setCategoryId: (categoryId: string | null, allProducts: Product[]) => void;

  // Уровень 3: Установка коллекции
  setCollectionId: (collectionId: string | null) => void;

  // Вспомогательные действия
  updateAvailableCategories: (allProducts: Product[], brandId: number) => void;
  updateAvailableCollections: (allProducts: Product[], brandId: number, categoryId: string) => void;
  setSortBy: (sort: string) => void;
  toggleColor: (color: string) => void;
  clearFilters: () => void;

  // DEPRECATED (для обратной совместимости)
  selectedCategories: string[];
  selectedBrandIds: number[];
  toggleCategory: (category: string) => void;
  toggleBrandId: (brandId: number) => void;
  setBrandIds: (brandIds: number[]) => void;
  setCategoryIds: (categoryIds: string[]) => void;
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set, get) => ({
      // ===== НАЧАЛЬНОЕ СОСТОЯНИЕ =====
      selectedBrandId: null,
      selectedCategoryId: null,
      selectedCollectionId: null,
      availableCategories: [],
      availableCollections: [],
      sortBy: 'default',
      selectedColors: [],

      // Deprecated fields (для обратной совместимости)
      selectedCategories: [],
      selectedBrandIds: [],

      // ===== УРОВЕНЬ 1: УСТАНОВКА БРЕНДА =====
      setBrandId: (brandId: number | null, allProducts: Product[]) => {
        console.log('🔹 [Level 1] setBrandId:', brandId);

        // Сбрасываем категорию и коллекцию
        set({
          selectedBrandId: brandId,
          selectedCategoryId: null,
          selectedCollectionId: null,
          availableCollections: [],
        });

        // Обновляем доступные категории для выбранного бренда
        if (brandId !== null) {
          get().updateAvailableCategories(allProducts, brandId);
        } else {
          set({ availableCategories: [] });
        }
      },

      // ===== УРОВЕНЬ 2: УСТАНОВКА КАТЕГОРИИ =====
      setCategoryId: (categoryId: string | null, allProducts: Product[]) => {
        console.log('🔹 [Level 2] setCategoryId:', categoryId);

        const state = get();

        // Сбрасываем коллекцию
        set({
          selectedCategoryId: categoryId,
          selectedCollectionId: null,
        });

        // Обновляем доступные коллекции для выбранного бренда и категории
        if (categoryId !== null && state.selectedBrandId !== null) {
          get().updateAvailableCollections(allProducts, state.selectedBrandId, categoryId);
        } else {
          set({ availableCollections: [] });
        }
      },

      // ===== УРОВЕНЬ 3: УСТАНОВКА КОЛЛЕКЦИИ =====
      setCollectionId: (collectionId: string | null) => {
        console.log('🔹 [Level 3] setCollectionId:', collectionId);
        set({ selectedCollectionId: collectionId });
      },

      // ===== ОБНОВЛЕНИЕ ДОСТУПНЫХ КАТЕГОРИЙ =====
      updateAvailableCategories: (allProducts: Product[], brandId: number) => {
        console.log('🔄 updateAvailableCategories for brandId:', brandId);

        // Фильтруем продукты по выбранному бренду
        const filteredProducts = allProducts.filter(product => product.brandId === brandId);
        console.log(`  ✓ Filtered ${filteredProducts.length} products for brand ${brandId}`);

        // Собираем уникальные категории
        const categoryIdsSet = new Set<string>();
        filteredProducts.forEach(product => {
          const catId = product.categoryId || product.categoryKey;
          if (catId) {
            categoryIdsSet.add(catId);
          }
        });

        // Маппинг categoryId к читаемым названиям
        const categoryLabels: Record<string, string> = {
          furniture: 'Мебель для ванн',
          mirrors: 'Зеркала',
          heaters: 'Водонагреватели',
          caizer: 'Сантехника Caizer',
          blesk: 'Водонагреватели Blesk',
        };

        const categories: Category[] = Array.from(categoryIdsSet).map(id => ({
          id,
          label: categoryLabels[id] || id,
          brandId,
        }));

        console.log('  ✓ Available categories:', categories);
        set({ availableCategories: categories });
      },

      // ===== ОБНОВЛЕНИЕ ДОСТУПНЫХ КОЛЛЕКЦИЙ =====
      updateAvailableCollections: (allProducts: Product[], brandId: number, categoryId: string) => {
        console.log('🔄 updateAvailableCollections for brand:', brandId, 'category:', categoryId);

        // Фильтруем продукты по бренду и категории
        const filteredProducts = allProducts.filter(product => {
          const prodCatId = product.categoryId || product.categoryKey;
          return product.brandId === brandId && prodCatId === categoryId;
        });

        console.log(`  ✓ Filtered ${filteredProducts.length} products`);

        // Собираем уникальные коллекции
        const collectionsMap = new Map<string, Collection>();
        filteredProducts.forEach(product => {
          if (product.collectionId) {
            if (!collectionsMap.has(product.collectionId)) {
              collectionsMap.set(product.collectionId, {
                id: product.collectionId,
                name: product.collectionId.charAt(0).toUpperCase() + product.collectionId.slice(1).replace(/-/g, ' '),
                brandId,
                categoryId,
                slug: product.collectionId,
              });
            }
          }
        });

        const collections = Array.from(collectionsMap.values());
        console.log('  ✓ Available collections:', collections);
        set({ availableCollections: collections });
      },

      // ===== ВСПОМОГАТЕЛЬНЫЕ ДЕЙСТВИЯ =====
      setSortBy: (sort: string) => set({ sortBy: sort }),

      toggleColor: (color: string) =>
        set((state) => ({
          selectedColors: state.selectedColors.includes(color)
            ? state.selectedColors.filter((c) => c !== color)
            : [...state.selectedColors, color],
        })),

      clearFilters: () => {
        console.log('🧹 clearFilters');
        set({
          selectedBrandId: null,
          selectedCategoryId: null,
          selectedCollectionId: null,
          availableCategories: [],
          availableCollections: [],
          sortBy: 'default',
          selectedColors: [],
          selectedCategories: [],
          selectedBrandIds: [],
        });
      },

      // ===== DEPRECATED METHODS (для обратной совместимости) =====
      toggleCategory: (category: string) =>
        set((state) => ({
          selectedCategories: state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((c) => c !== category)
            : [...state.selectedCategories, category],
        })),

      toggleBrandId: (brandId: number) =>
        set((state) => ({
          selectedBrandIds: state.selectedBrandIds.includes(brandId)
            ? state.selectedBrandIds.filter((id) => id !== brandId)
            : [...state.selectedBrandIds, brandId],
        })),

      setBrandIds: (brandIds: number[]) => {
        console.log('⚠️ [DEPRECATED] setBrandIds called');
        set({ selectedBrandIds: brandIds });
      },

      setCategoryIds: (categoryIds: string[]) => {
        console.log('⚠️ [DEPRECATED] setCategoryIds called');
        set({ selectedCategories: categoryIds });
      },
    }),
    {
      name: 'filters-storage-v3', // Новый ключ для новой версии
    }
  )
);
