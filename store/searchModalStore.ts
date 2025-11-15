import { create } from 'zustand';

interface SearchModalState {
  isOpen: boolean;
  initialQuery: string;
  openModal: (query?: string) => void;
  closeModal: () => void;
}

export const useSearchModalStore = create<SearchModalState>((set) => ({
  isOpen: false,
  initialQuery: '',

  openModal: (query = '') => {
    set({ isOpen: true, initialQuery: query });
  },

  closeModal: () => {
    set({ isOpen: false, initialQuery: '' });
  },
}));
