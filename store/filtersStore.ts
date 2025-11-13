import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchBrands, fetchCategories, fetchCollections, fetchTypes } from '@/services/api/products';
import type { Brand, Category, Collection, Type } from '@/types/product';

// Re-export types for convenience
export type { Brand, Category, Collection, Type };

export interface Product {
  id: string;
  categoryKey?: string; // deprecated, используем categoryId
  categoryId?: string;
  collectionId?: string;
  typeId?: string;
  sectionId: number; // Level 1
  brandId: number; // Level 2 (НОВОЕ! ОБЯЗАТЕЛЬНО)
  [key: string]: any;
}

interface FiltersState {
  // ===== ПЯТИУРОВНЕВОЕ СОСТОЯНИЕ (НОВАЯ АРХИТЕКТУРА) =====
  selectedSectionId: number | null; // Уровень 1: Section (одиночный выбор)
  selectedBrandId: number | null; // Уровень 2: Brand (НОВОЕ! одиночный выбор)
  selectedCategoryId: number | null; // Уровень 3: Категория (одиночный выбор)
  selectedCollectionId: number | null; // Уровень 4a: Коллекция (одиночный выбор)
  selectedTypeId: number | null; // Уровень 4b: Type (одиночный выбор)

  // Доступные опции для каждого уровня
  availableBrands: Brand[]; // НОВОЕ! Бренды, доступные для выбранной секции
  availableCategories: Category[]; // Категории, доступные для секции+бренда
  availableCollections: Collection[]; // Коллекции, доступные для бренда+категории
  availableTypes: Type[]; // Типы, доступные для категории

  // Loading states
  brandsLoading: boolean; // НОВОЕ!
  categoriesLoading: boolean;
  collectionsLoading: boolean;
  typesLoading: boolean;
  isLoading: boolean; // НОВОЕ! Глобальный loading для UI

  // Дополнительные фильтры
  sortBy: string;
  selectedColors: string[];

  // ===== ДЕЙСТВИЯ (НОВАЯ АРХИТЕКТУРА) =====
  // Уровень 1: Установка секции (сбрасывает бренд, категорию, коллекцию и тип)
  setSectionId: (sectionId: number | null) => Promise<void>;

  // Уровень 2: Установка бренда (НОВОЕ! сбрасывает категорию, коллекцию и тип)
  setBrandId: (brandId: number | null) => Promise<void>;

  // Уровень 3: Установка категории (сбрасывает коллекцию и тип)
  setCategoryId: (categoryId: number | null) => Promise<void>;

  // Уровень 4a: Установка коллекции (сбрасывает тип)
  setCollectionId: (collectionId: number | null) => void;

  // Уровень 4b: Установка типа (сбрасывает коллекцию)
  setTypeId: (typeId: number | null) => void;

  // Загрузка данных из API
  loadBrands: (sectionId: number | null) => Promise<void>; // НОВОЕ!
  loadCategories: (sectionId: number | null, brandId: number | null) => Promise<void>; // Изменено!
  loadCollections: (brandId: number | null, categoryId: number | null) => Promise<void>; // Изменено!
  loadTypes: (categoryId: number | null) => Promise<void>; // Изменено!

  // Вспомогательные действия
  setSortBy: (sort: string) => void;
  setIsLoading: (loading: boolean) => void; // НОВОЕ! Управление глобальным loading
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
      // ===== НАЧАЛЬНОЕ СОСТОЯНИЕ (НОВАЯ АРХИТЕКТУРА) =====
      selectedSectionId: null,
      selectedBrandId: null, // НОВОЕ! Теперь это настоящий Level 2
      selectedCategoryId: null,
      selectedCollectionId: null,
      selectedTypeId: null,
      availableBrands: [], // НОВОЕ!
      availableCategories: [],
      availableCollections: [],
      availableTypes: [],
      brandsLoading: false, // НОВОЕ!
      categoriesLoading: false,
      collectionsLoading: false,
      typesLoading: false,
      isLoading: false, // НОВОЕ! Глобальный loading
      sortBy: 'default',
      selectedColors: [],

      // Deprecated fields (для обратной совместимости)
      selectedCategories: [],
      selectedBrandIds: [],

      // ===== ЗАГРУЗКА БРЕНДОВ ИЗ API (НОВОЕ!) =====
      loadBrands: async (sectionId: number | null) => {
        console.log('🔄 [Level 2] loadBrands for sectionId:', sectionId);
        set({ brandsLoading: true });

        try {
          const brands = await fetchBrands(sectionId);
          console.log('✓ Loaded brands:', brands);
          set({ availableBrands: brands });
        } catch (error) {
          console.error('❌ Failed to load brands:', error);
          set({ availableBrands: [] });
        } finally {
          set({ brandsLoading: false });
        }
      },

      // ===== ЗАГРУЗКА КАТЕГОРИЙ ИЗ API (ОБНОВЛЕНО!) =====
      loadCategories: async (sectionId: number | null, brandId: number | null) => {
        console.log('🔄 [Level 3] loadCategories for section:', sectionId, 'brand:', brandId);
        set({ categoriesLoading: true });

        try {
          const categories = await fetchCategories(sectionId, brandId);
          console.log('✓ Loaded categories:', categories);
          set({ availableCategories: categories });
        } catch (error) {
          console.error('❌ Failed to load categories:', error);
          set({ availableCategories: [] });
        } finally {
          set({ categoriesLoading: false });
        }
      },

      // ===== ЗАГРУЗКА КОЛЛЕКЦИЙ ИЗ API (ОБНОВЛЕНО!) =====
      loadCollections: async (brandId: number | null, categoryId: number | null) => {
        console.log('🔄 [Level 4a] loadCollections for brand:', brandId, 'category:', categoryId);
        set({ collectionsLoading: true });

        try {
          const collections = await fetchCollections(null, brandId, categoryId);
          console.log('✓ Loaded collections:', collections);
          set({ availableCollections: collections });
        } catch (error) {
          console.error('❌ Failed to load collections:', error);
          set({ availableCollections: [] });
        } finally {
          set({ collectionsLoading: false });
        }
      },

      // ===== ЗАГРУЗКА ТИПОВ ИЗ API (ОБНОВЛЕНО!) =====
      loadTypes: async (categoryId: number | null) => {
        console.log('🔄 [Level 4b] loadTypes for category:', categoryId);
        set({ typesLoading: true });

        try {
          const types = await fetchTypes(categoryId);
          console.log('✓ Loaded types:', types);
          set({ availableTypes: types });
        } catch (error) {
          console.error('❌ Failed to load types:', error);
          set({ availableTypes: [] });
        } finally {
          set({ typesLoading: false });
        }
      },

      // ===== УРОВЕНЬ 1: УСТАНОВКА СЕКЦИИ (ОБНОВЛЕНО!) =====
      setSectionId: async (sectionId: number | null) => {
        console.log('🔹 [Level 1] setSectionId:', sectionId);

        // Сбрасываем ВСЕ нижние уровни (brand, category, collection, type)
        set({
          selectedSectionId: sectionId,
          selectedBrandId: null, // Сбрасываем бренд!
          selectedCategoryId: null,
          selectedCollectionId: null,
          selectedTypeId: null,
          availableCategories: [],
          availableCollections: [],
          availableTypes: [],
        });

        // Загружаем бренды для выбранной секции
        if (sectionId !== null) {
          await get().loadBrands(sectionId);
        } else {
          set({ availableBrands: [] });
        }
      },

      // ===== УРОВЕНЬ 2: УСТАНОВКА БРЕНДА (НОВОЕ!) =====
      setBrandId: async (brandId: number | null) => {
        console.log('🔹 [Level 2] setBrandId:', brandId);

        const state = get();

        // Сбрасываем категорию, коллекцию и тип
        set({
          selectedBrandId: brandId,
          selectedCategoryId: null,
          selectedCollectionId: null,
          selectedTypeId: null,
          availableCollections: [],
          availableTypes: [],
        });

        // Загружаем категории для выбранной секции и бренда
        if (brandId !== null && state.selectedSectionId !== null) {
          await get().loadCategories(state.selectedSectionId, brandId);
        } else {
          set({ availableCategories: [] });
        }
      },

      // ===== УРОВЕНЬ 3: УСТАНОВКА КАТЕГОРИИ (ОБНОВЛЕНО!) =====
      setCategoryId: async (categoryId: number | null) => {
        console.log('🔹 [Level 3] setCategoryId:', categoryId);

        const state = get();

        // Сбрасываем коллекцию и тип
        set({
          selectedCategoryId: categoryId,
          selectedCollectionId: null,
          selectedTypeId: null,
        });

        // Загружаем коллекции и типы для выбранного бренда и категории
        if (categoryId !== null && state.selectedBrandId !== null) {
          await Promise.all([
            get().loadCollections(state.selectedBrandId, categoryId),
            get().loadTypes(categoryId),
          ]);
        } else {
          set({ availableCollections: [], availableTypes: [] });
        }
      },

      // ===== УРОВЕНЬ 4a: УСТАНОВКА КОЛЛЕКЦИИ =====
      setCollectionId: (collectionId: number | null) => {
        console.log('🔹 [Level 4a] setCollectionId:', collectionId);
        // Если выбираем коллекцию, сбрасываем тип (взаимоисключающие)
        set({
          selectedCollectionId: collectionId,
          selectedTypeId: collectionId !== null ? null : get().selectedTypeId
        });
      },

      // ===== УРОВЕНЬ 4b: УСТАНОВКА ТИПА =====
      setTypeId: (typeId: number | null) => {
        console.log('🔹 [Level 4b] setTypeId:', typeId);
        // Если выбираем тип, сбрасываем коллекцию (взаимоисключающие)
        set({
          selectedTypeId: typeId,
          selectedCollectionId: typeId !== null ? null : get().selectedCollectionId
        });
      },

      // ===== ВСПОМОГАТЕЛЬНЫЕ ДЕЙСТВИЯ =====
      setSortBy: (sort: string) => set({ sortBy: sort }),

      setIsLoading: (loading: boolean) => set({ isLoading: loading }),

      toggleColor: (color: string) =>
        set((state) => ({
          selectedColors: state.selectedColors.includes(color)
            ? state.selectedColors.filter((c) => c !== color)
            : [...state.selectedColors, color],
        })),

      clearFilters: () => {
        console.log('🧹 clearFilters');
        set({
          selectedSectionId: null,
          selectedBrandId: null,
          selectedCategoryId: null,
          selectedCollectionId: null,
          selectedTypeId: null,
          availableBrands: [],
          availableCategories: [],
          availableCollections: [],
          availableTypes: [],
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
      name: 'filters-storage-v5', // V5: НОВАЯ АРХИТЕКТУРА с Brand как Level 2
    }
  )
);
