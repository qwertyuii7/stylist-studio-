import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // unique id for cart item
  serviceId: string;
  serviceTitle: string;
  stylistId: string;
  stylistName: string;
  price: number;
  date: string;
  time: string;
  mode: 'video' | 'in-person';
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => get().items.reduce((total, item) => total + item.price, 0),
    }),
    {
      name: 'stylist-cart-storage', // key in local storage
    }
  )
);
