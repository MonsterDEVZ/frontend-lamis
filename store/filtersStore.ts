import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Типы для категорий и продуктов
export interface Category {
  id: string;
  label: string;
  brandId?: number;
}

export interface Product {
  id: string;
  categoryKey: string;
  brandId: number;
  [key: string]: any;
}

interface FiltersState {
  // Состояние
  selectedCategories: string[];
  selectedBrandIds: number[];
  sortBy: string;
  selectedColors: string[];
  availableCategories: Category[]; // Новое: доступные категории

  // Действия
  toggleCategory: (category: string) => void;
  toggleBrandId: (brandId: number) => void;
  setBrandIds: (brandIds: number[]) => void;
  setCategoryIds: (categoryIds: string[]) => void;
  setSortBy: (sort: string) => void;
  toggleColor: (color: string) => void;
  clearFilters: () => void;
  updateAvailableCategories: (allProducts: Product[], selectedBrandIds: number[]) => void; // Новое
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set, get) => ({
      // Начальное состояние
      selectedCategories: [],
      selectedBrandIds: [],
      sortBy: 'default',
      selectedColors: [],
      availableCategories: [], // Начально пусто, будет заполнено при загрузке

      // Переключение категории (добавить/удалить)
      toggleCategory: (category: string) =>
        set((state) => ({
          selectedCategories: state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((c) => c !== category)
            : [...state.selectedCategories, category],
        })),

      // Переключение бренда (добавить/удалить)
      toggleBrandId: (brandId: number) =>
        set((state) => ({
          selectedBrandIds: state.selectedBrandIds.includes(brandId)
            ? state.selectedBrandIds.filter((id) => id !== brandId)
            : [...state.selectedBrandIds, brandId],
        })),

      // Установка списка брендов
      setBrandIds: (brandIds: number[]) => {
        console.log('🏪 Store: setBrandIds called with:', brandIds);
        set({ selectedBrandIds: brandIds });
      },

      // Установка списка категорий
      setCategoryIds: (categoryIds: string[]) => {
        console.log('🏪 Store: setCategoryIds called with:', categoryIds);
        set({ selectedCategories: categoryIds });
      },

      // Установка метода сортировки
      setSortBy: (sort: string) =>
        set({ sortBy: sort }),

      // Переключение цвета (для будущего использования)
      toggleColor: (color: string) =>
        set((state) => ({
          selectedColors: state.selectedColors.includes(color)
            ? state.selectedColors.filter((c) => c !== color)
            : [...state.selectedColors, color],
        })),

      // Очистка всех фильтров
      clearFilters: () =>
        set({
          selectedCategories: [],
          selectedBrandIds: [],
          sortBy: 'default',
          selectedColors: [],
        }),

      // НОВОЕ: Обновление доступных категорий на основе выбранных брендов
      updateAvailableCategories: (allProducts: Product[], selectedBrandIds: number[]) => {
        console.log('🔄 Store: updateAvailableCategories called');
        console.log('  - All products:', allProducts.length);
        console.log('  - Selected brand IDs:', selectedBrandIds);

        // Если бренды не выбраны, показываем все категории
        if (selectedBrandIds.length === 0) {
          const allCategoriesSet = new Set<string>();
          allProducts.forEach(product => {
            if (product.categoryKey) {
              allCategoriesSet.add(product.categoryKey);
            }
          });

          const categoryLabels: Record<string, string> = {
            heaters: 'Умные водонагреватели',
            mirrors: 'Зеркала Lamis',
            blesk: 'Водонагреватели Blesk',
            caizer: 'Сантехника Caizer',
            furniture: 'Мебель для ванн Lamis',
          };

          const allCategories: Category[] = Array.from(allCategoriesSet).map(key => ({
            id: key,
            label: categoryLabels[key] || key,
          }));

          console.log('  - No brands selected, showing all categories:', allCategories.length);
          set({ availableCategories: allCategories });
          return;
        }

        // Фильтруем продукты по выбранным брендам
        const filteredProducts = allProducts.filter(product =>
          product.brandId && selectedBrandIds.includes(product.brandId)
        );

        console.log('  - Filtered products by brand:', filteredProducts.length);

        // Собираем уникальные категории
        const categoryKeysSet = new Set<string>();
        filteredProducts.forEach(product => {
          if (product.categoryKey) {
            categoryKeysSet.add(product.categoryKey);
          }
        });

        // Маппинг ключей категорий к их названиям
        const categoryLabels: Record<string, string> = {
          heaters: 'Умные водонагреватели',
          mirrors: 'Зеркала Lamis',
          blesk: 'Водонагреватели Blesk',
          caizer: 'Сантехника Caizer',
          furniture: 'Мебель для ванн Lamis',
        };

        const categories: Category[] = Array.from(categoryKeysSet).map(key => ({
          id: key,
          label: categoryLabels[key] || key,
        }));

        console.log('  - Available categories updated:', categories);
        set({ availableCategories: categories });

        // Очищаем выбранные категории, если они больше недоступны
        const state = get();
        const validCategories = state.selectedCategories.filter(catId =>
          categoryKeysSet.has(catId)
        );

        if (validCategories.length !== state.selectedCategories.length) {
          console.log('  - Clearing invalid selected categories');
          set({ selectedCategories: validCategories });
        }
      },
    }),
    {
      name: 'filters-storage', // Ключ в localStorage
    }
  )
);
