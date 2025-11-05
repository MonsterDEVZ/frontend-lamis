'use client';

import { useEffect, useState } from 'react';
import { useFavoritesStore } from '@/store/favoritesStore';

export const useFavoritesStoreHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const state = useFavoritesStore();

  useEffect(() => {
    // Mark as hydrated after mount (when localStorage is available)
    setIsHydrated(true);
  }, []);

  return { ...state, isHydrated };
};
