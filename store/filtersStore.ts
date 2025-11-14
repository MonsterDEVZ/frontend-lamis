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
  [key: string]: any;
}

interface FiltersState {
  // ===== 4-LEVEL FILTERING =====
  selectedSectionId: number | null; // Level 1: Section
  selectedCategoryId: number | null; // Level 2: Category
  selectedCollectionId: number | null; // Level 3a: Collection
  selectedTypeId: number | null; // Level 3b: Type

  // Available options for each level
  availableCategories: Category[]; // Categories available for selected section
  availableCollections: Collection[]; // Collections available for selected category
  availableTypes: Type[]; // Types available for selected category

  // Loading states
  categoriesLoading: boolean;
  collectionsLoading: boolean;
  typesLoading: boolean;
  isLoading: boolean; // Global loading for UI

  // Additional filters
  sortBy: string;
  selectedColors: string[];

  // ===== ACTIONS =====
  // Level 1: Set section (resets category, collection, type)
  setSectionId: (sectionId: number | null) => Promise<void>;

  // Level 2: Set category (resets collection and type)
  setCategoryId: (categoryId: number | null) => Promise<void>;

  // Level 3a: Set collection (resets type)
  setCollectionId: (collectionId: number | null) => void;

  // Level 3b: Set type (resets collection)
  setTypeId: (typeId: number | null) => void;

  // Load data from API
  loadCategories: (sectionId: number | null) => Promise<void>;
  loadCollections: (categoryId: number | null) => Promise<void>;
  loadTypes: (categoryId: number | null) => Promise<void>;

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
      // ===== INITIAL STATE (4-LEVEL FILTERING) =====
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
      isLoading: false,
      sortBy: 'default',
      selectedColors: [],

      // Deprecated fields (для обратной совместимости)
      selectedCategories: [],
      selectedBrandIds: [],

      // ===== LOAD CATEGORIES FROM API =====
      loadCategories: async (sectionId: number | null) => {
        console.log('🔄 [Level 2] loadCategories for section:', sectionId);
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

      // ===== LOAD COLLECTIONS FROM API =====
      loadCollections: async (categoryId: number | null) => {
        console.log('🔄 [Level 3a] loadCollections for category:', categoryId);
        set({ collectionsLoading: true });

        try {
          const collections = await fetchCollections(null, null, categoryId);
          console.log('✓ Loaded collections:', collections);
          set({ availableCollections: collections });
        } catch (error) {
          console.error('❌ Failed to load collections:', error);
          set({ availableCollections: [] });
        } finally {
          set({ collectionsLoading: false });
        }
      },

      // ===== LOAD TYPES FROM API =====
      loadTypes: async (categoryId: number | null) => {
        console.log('🔄 [Level 3b] loadTypes for category:', categoryId);
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

      // ===== LEVEL 1: SET SECTION =====
      setSectionId: async (sectionId: number | null) => {
        console.log('🔹 [Level 1] setSectionId:', sectionId);

        // Reset all lower levels (category, collection, type)
        set({
          selectedSectionId: sectionId,
          selectedCategoryId: null,
          selectedCollectionId: null,
          selectedTypeId: null,
          availableCollections: [],
          availableTypes: [],
        });

        // Load categories for selected section
        if (sectionId !== null) {
          await get().loadCategories(sectionId);
        } else {
          set({ availableCategories: [] });
        }
      },

      // ===== LEVEL 2: SET CATEGORY =====
      setCategoryId: async (categoryId: number | null) => {
        console.log('🔹 [Level 2] setCategoryId:', categoryId);

        // Reset collection and type
        set({
          selectedCategoryId: categoryId,
          selectedCollectionId: null,
          selectedTypeId: null,
        });

        // Load collections and types for selected category
        if (categoryId !== null) {
          await Promise.all([
            get().loadCollections(categoryId),
            get().loadTypes(categoryId),
          ]);
        } else {
          set({ availableCollections: [], availableTypes: [] });
        }
      },

      // ===== LEVEL 3a: SET COLLECTION =====
      setCollectionId: (collectionId: number | null) => {
        console.log('🔹 [Level 3a] setCollectionId:', collectionId);
        // If selecting collection, reset type (mutually exclusive)
        set({
          selectedCollectionId: collectionId,
          selectedTypeId: collectionId !== null ? null : get().selectedTypeId
        });
      },

      // ===== LEVEL 3b: SET TYPE =====
      setTypeId: (typeId: number | null) => {
        console.log('🔹 [Level 3b] setTypeId:', typeId);
        // If selecting type, reset collection (mutually exclusive)
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
      name: 'filters-storage-v6', // V6: Removed brand filtering (4-level)
    }
  )
);
