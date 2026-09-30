import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserRole = 'customer' | 'stylist' | null;

interface StylePreferences {
  preferredStyle: string;
  bodyType: string;
  budget: string;
  occasions: string[];
  favoriteColors: string[];
  sizes: {
    top: string;
    bottom: string;
    shoe: string;
  };
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  location?: string;
  gender?: string;
  onboardingComplete?: boolean;
  stylePreferences?: StylePreferences;
  // Stylist-specific
  bio?: string;
  experience?: string;
  specialties?: string[];
  selectedServices?: string[];
  languages?: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
      })),
      completeOnboarding: () => set((state) => ({
        user: state.user ? { ...state.user, onboardingComplete: true } : null,
      })),
    }),
    {
      name: 'stylist-studio-auth',
    }
  )
);
