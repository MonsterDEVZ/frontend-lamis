import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * SIMPLIFIED FILTERS STORE
 * NEW ARCHITECTURE: Client-side filtering only
 *
 * Backend returns ALL products for a section
 * Frontend filters by category/collection/type in memory
 * Benefits: Instant filtering, no double-firing, better UX
 */

export interface Product {
  id: number;
  name: string;
  slug: string;
  section: number;
  section_name: string;
  category: number;
  category_name: string;
  collection: number | null;
  collection_name: string | null;
  type: number | null;
  type_name: string | null;
  brand: number;
  brand_name: string;
  price: string;
  main_image_url: string;
  hover_image_url: string;
  is_new: boolean;
  is_on_sale: boolean;
  [key: string]: any;
}

interface FiltersState {
  // ===== CLIENT-SIDE FILTERING =====
  selectedSectionId: number | null; // Level 1: Section (triggers API call)
  selectedCategoryId: number | null; // Level 2: Category (client-side filter)
  selectedCollectionId: number | null; // Level 3a: Collection (client-side filter)
  selectedTypeId: number | null; // Level 3b: Type (client-side filter)

  // Loading state (only for section change)
  isLoading: boolean;

  // Additional filters
  sortBy: string;
  selectedColors: string[];

  // ===== ACTIONS (SIMPLIFIED - NO API CALLS) =====
  setSectionId: (sectionId: number | null) => void;
  setCategoryId: (categoryId: number | null) => void;
  setCollectionId: (collectionId: number | null) => void;
  setTypeId: (typeId: number | null) => void;

  setIsLoading: (loading: boolean) => void;
  setSortBy: (sort: string) => void;
  toggleColor: (color: string) => void;
  clearFilters: () => void;
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set, get) => ({
      // ===== INITIAL STATE =====
      selectedSectionId: null,
      selectedCategoryId: null,
      selectedCollectionId: null,
      selectedTypeId: null,
      isLoading: false,
      sortBy: 'default',
      selectedColors: [],

      // ===== SIMPLIFIED ACTIONS (NO API CALLS) =====

      setSectionId: (sectionId: number | null) => {
        console.log('🔹 [Level 1] setSectionId:', sectionId);
        // Reset all lower levels when section changes
        set({
          selectedSectionId: sectionId,
          selectedCategoryId: null,
          selectedCollectionId: null,
          selectedTypeId: null,
        });
      },

      setCategoryId: (categoryId: number | null) => {
        console.log('🔹 [Level 2] setCategoryId:', categoryId);
        // Reset collection and type when category changes
        set({
          selectedCategoryId: categoryId,
          selectedCollectionId: null,
          selectedTypeId: null,
        });
      },

      setCollectionId: (collectionId: number | null) => {
        console.log('🔹 [Level 3a] setCollectionId:', collectionId);
        // If selecting collection, reset type (mutually exclusive)
        set({
          selectedCollectionId: collectionId,
          selectedTypeId: collectionId !== null ? null : get().selectedTypeId,
        });
      },

      setTypeId: (typeId: number | null) => {
        console.log('🔹 [Level 3b] setTypeId:', typeId);
        // If selecting type, reset collection (mutually exclusive)
        set({
          selectedTypeId: typeId,
          selectedCollectionId: typeId !== null ? null : get().selectedCollectionId,
        });
      },

      setIsLoading: (loading: boolean) => set({ isLoading: loading }),

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
          selectedCategoryId: null,
          selectedCollectionId: null,
          selectedTypeId: null,
          sortBy: 'default',
          selectedColors: [],
        });
      },
    }),
    {
      name: 'filters-storage-v7', // V7: Client-side filtering only
    }
  )
);
