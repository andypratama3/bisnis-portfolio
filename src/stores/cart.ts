"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  unit?: string;
  qty: number;
};

type CartState = {
  branchSlug: string | null;
  items: CartItem[];
  addItem: (branchSlug: string, item: Omit<CartItem, "qty">) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      branchSlug: null,
      items: [],
      addItem: (branchSlug, item) =>
        set((state) => {
          const items = state.branchSlug === branchSlug ? state.items : [];
          const existing = items.find((entry) => entry.id === item.id);

          return {
            branchSlug,
            items: existing
              ? items.map((entry) =>
                  entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry,
                )
              : [...items, { ...item, qty: 1 }],
          };
        }),
      increment: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item,
          ),
        })),
      decrement: (id) =>
        set((state) => ({
          items: state.items
            .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
            .filter((item) => item.qty > 0),
        })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "bisnis-portfolio-cart",
      skipHydration: true,
    },
  ),
);
