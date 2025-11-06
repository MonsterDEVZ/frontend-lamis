import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FiltersState {
  // Состояние
  selectedCategories: string[];
  sortBy: string;
  selectedColors: string[];

  // Действия
  toggleCategory: (category: string) => void;
  setSortBy: (sort: string) => void;
  toggleColor: (color: string) => void;
  clearFilters: () => void;
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set) => ({
      // Начальное состояние
      selectedCategories: [],
      sortBy: 'default',
      selectedColors: [],

      // Переключение категории (добавить/удалить)
      toggleCategory: (category: string) =>
        set((state) => ({
          selectedCategories: state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((c) => c !== category)
            : [...state.selectedCategories, category],
        })),

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
          sortBy: 'default',
          selectedColors: [],
        }),
    }),
    {
      name: 'filters-storage', // Ключ в localStorage
    }
  )
);
