import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchCategories, fetchCollections, fetchTypes } from '@/services/api/products';
import type { Category, Collection, Type } from '@/types/product';

// Re-export types for convenience
export type { Category, Collection, Type };

export interface Product {
  id: string;
  categoryKey?: string; // deprecated, используем categoryId
  categoryId?: string;
  collectionId?: string;
  typeId?: string; // NEW: Type ID
  sectionId: number; // Renamed from brandId
  [key: string]: any;

  // Deprecated (for backward compatibility)
  brandId?: number; // Use sectionId instead
}

interface FiltersState {
  // ===== ЧЕТЫРЕХУРОВНЕВОЕ СОСТОЯНИЕ =====
  selectedSectionId: number | null; // Уровень 1: Section (одиночный выбор)
  selectedCategoryId: number | null; // Уровень 2: Категория (одиночный выбор)
  selectedCollectionId: number | null; // Уровень 3a: Коллекция (одиночный выбор)
  selectedTypeId: number | null; // Уровень 3b: Type (одиночный выбор)

  // Доступные опции для каждого уровня
  availableCategories: Category[]; // Категории, доступные для выбранной секции
  availableCollections: Collection[]; // Коллекции, доступные для секции+категории
  availableTypes: Type[]; // Типы, доступные для секции+категории

  // Loading states
  categoriesLoading: boolean;
  collectionsLoading: boolean;
  typesLoading: boolean;

  // Дополнительные фильтры
  sortBy: string;
  selectedColors: string[];

  // ===== ДЕЙСТВИЯ =====
  // Уровень 1: Установка секции (сбрасывает категорию, коллекцию и тип)
  setSectionId: (sectionId: number | null) => Promise<void>;

  // Уровень 2: Установка категории (сбрасывает коллекцию и тип)
  setCategoryId: (categoryId: number | null) => Promise<void>;

  // Уровень 3a: Установка коллекции (сбрасывает тип)
  setCollectionId: (collectionId: number | null) => void;

  // Уровень 3b: Установка типа (сбрасывает коллекцию)
  setTypeId: (typeId: number | null) => void;

  // Загрузка данных из API
  loadCategories: (sectionId: number | null) => Promise<void>;
  loadCollections: (sectionId: number | null, categoryId: number | null) => Promise<void>;
  loadTypes: (sectionId: number | null, categoryId: number | null) => Promise<void>;

  // Вспомогательные действия
  setSortBy: (sort: string) => void;
  toggleColor: (color: string) => void;
  clearFilters: () => void;

  // DEPRECATED (для обратной совместимости)
  selectedBrandId: number | null; // Use selectedSectionId instead
  selectedCategories: string[];
  selectedBrandIds: number[];
  setBrandId: (brandId: number | null) => Promise<void>; // Use setSectionId instead
  toggleCategory: (category: string) => void;
  toggleBrandId: (brandId: number) => void;
  setBrandIds: (brandIds: number[]) => void;
  setCategoryIds: (categoryIds: string[]) => void;
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set, get) => ({
      // ===== НАЧАЛЬНОЕ СОСТОЯНИЕ =====
      selectedSectionId: null,
      selectedCategoryId: null,
      selectedCollectionId: null,
      selectedTypeId: null,
      availableCategories: [],
      availableCollections: [],
      availableTypes: [],
      categoriesLoading: false,
      collectionsLoading: false,
      typesLoading: false,
      sortBy: 'default',
      selectedColors: [],

      // Deprecated fields (для обратной совместимости)
      selectedBrandId: null, // Mirrors selectedSectionId
      selectedCategories: [],
      selectedBrandIds: [],

      // ===== ЗАГРУЗКА КАТЕГОРИЙ ИЗ API =====
      loadCategories: async (sectionId: number | null) => {
        console.log('🔄 loadCategories for sectionId:', sectionId);
        set({ categoriesLoading: true });

        try {
          const categories = await fetchCategories(sectionId);
          console.log('✓ Loaded categories:', categories);
          set({ availableCategories: categories });
        } catch (error) {
          console.error('❌ Failed to load categories:', error);
          set({ availableCategories: [] });
        } finally {
          set({ categoriesLoading: false });
        }
      },

      // ===== ЗАГРУЗКА КОЛЛЕКЦИЙ ИЗ API =====
      loadCollections: async (sectionId: number | null, categoryId: number | null) => {
        console.log('🔄 loadCollections for section:', sectionId, 'category:', categoryId);
        set({ collectionsLoading: true });

        try {
          const collections = await fetchCollections(sectionId, categoryId);
          console.log('✓ Loaded collections:', collections);
          set({ availableCollections: collections });
        } catch (error) {
          console.error('❌ Failed to load collections:', error);
          set({ availableCollections: [] });
        } finally {
          set({ collectionsLoading: false });
        }
      },

      // ===== ЗАГРУЗКА ТИПОВ ИЗ API =====
      loadTypes: async (sectionId: number | null, categoryId: number | null) => {
        console.log('🔄 loadTypes for section:', sectionId, 'category:', categoryId);
        set({ typesLoading: true });

        try {
          const types = await fetchTypes(sectionId, categoryId);
          console.log('✓ Loaded types:', types);
          set({ availableTypes: types });
        } catch (error) {
          console.error('❌ Failed to load types:', error);
          set({ availableTypes: [] });
        } finally {
          set({ typesLoading: false });
        }
      },

      // ===== УРОВЕНЬ 1: УСТАНОВКА СЕКЦИИ =====
      setSectionId: async (sectionId: number | null) => {
        console.log('🔹 [Level 1] setSectionId:', sectionId);

        // Сбрасываем категорию, коллекцию и тип
        set({
          selectedSectionId: sectionId,
          selectedBrandId: sectionId, // Mirror for backward compatibility
          selectedCategoryId: null,
          selectedCollectionId: null,
          selectedTypeId: null,
          availableCollections: [],
          availableTypes: [],
        });

        // Загружаем категории для выбранной секции
        if (sectionId !== null) {
          await get().loadCategories(sectionId);
        } else {
          set({ availableCategories: [] });
        }
      },

      // ===== УРОВЕНЬ 2: УСТАНОВКА КАТЕГОРИИ =====
      setCategoryId: async (categoryId: number | null) => {
        console.log('🔹 [Level 2] setCategoryId:', categoryId);

        const state = get();

        // Сбрасываем коллекцию и тип
        set({
          selectedCategoryId: categoryId,
          selectedCollectionId: null,
          selectedTypeId: null,
        });

        // Загружаем коллекции и типы для выбранной секции и категории
        if (categoryId !== null && state.selectedSectionId !== null) {
          await Promise.all([
            get().loadCollections(state.selectedSectionId, categoryId),
            get().loadTypes(state.selectedSectionId, categoryId),
          ]);
        } else {
          set({ availableCollections: [], availableTypes: [] });
        }
      },

      // ===== УРОВЕНЬ 3a: УСТАНОВКА КОЛЛЕКЦИИ =====
      setCollectionId: (collectionId: number | null) => {
        console.log('🔹 [Level 3a] setCollectionId:', collectionId);
        // Если выбираем коллекцию, сбрасываем тип (взаимоисключающие)
        set({
          selectedCollectionId: collectionId,
          selectedTypeId: collectionId !== null ? null : get().selectedTypeId
        });
      },

      // ===== УРОВЕНЬ 3b: УСТАНОВКА ТИПА =====
      setTypeId: (typeId: number | null) => {
        console.log('🔹 [Level 3b] setTypeId:', typeId);
        // Если выбираем тип, сбрасываем коллекцию (взаимоисключающие)
        set({
          selectedTypeId: typeId,
          selectedCollectionId: typeId !== null ? null : get().selectedCollectionId
        });
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
          selectedSectionId: null,
          selectedBrandId: null, // Mirror for backward compatibility
          selectedCategoryId: null,
          selectedCollectionId: null,
          selectedTypeId: null,
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
      setBrandId: async (brandId: number | null) => {
        console.log('⚠️ [DEPRECATED] setBrandId called, using setSectionId instead');
        await get().setSectionId(brandId);
      },

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
      name: 'filters-storage-v4', // V4: Added Type support and renamed Brand → Section
    }
  )
);
