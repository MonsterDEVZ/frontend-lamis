/**
 * Authentication Store
 * Zustand store for managing auth state with persistence
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  email: string;
  is_active: boolean;
  created_at: string;
}

interface AuthState {
  // State
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  // Actions
  setAuth: (accessToken: string, refreshToken: string, user: User) => void;
  clearAuth: () => void;
  updateAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,

      // Set authentication data (on login/register)
      setAuth: (accessToken, refreshToken, user) =>
        set({
          isAuthenticated: true,
          accessToken,
          refreshToken,
          user,
        }),

      // Clear authentication data (on logout)
      clearAuth: () =>
        set({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          refreshToken: null,
        }),

      // Update only access token (on refresh)
      updateAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);
