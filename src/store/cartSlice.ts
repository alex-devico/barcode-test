import { StateCreator } from 'zustand';

import { StoreProducts } from '@types';

export interface CartSlice {
  products: StoreProducts;
  counters: Record<keyof StoreProducts, number>;
  setProducts: (value: StoreProducts) => void;
  removeProduct: (id: string) => void;
  setCounter: (id: string, counter: number) => void;
  clearCart: () => void;
}

export const createCartSlice: StateCreator<CartSlice> = (set, get) => ({
  products: {},
  counters: {},

  setProducts: (newProducts) => {
    const setCounter = get().setCounter;
    const products = get().products;
    Object.keys(newProducts).map((productId) => {
      setCounter(productId, 1);
    });
    set(() => ({ products: { ...products, ...newProducts } }));
  },

  removeProduct: (id) => {
    const withoutRemovedProducts = { ...get().products };
    delete withoutRemovedProducts[id];

    const withoutRemovedCounters = { ...get().counters };
    delete withoutRemovedCounters[id];

    set(() => ({
      products: withoutRemovedProducts,
      counters: withoutRemovedCounters,
    }));
  },

  setCounter: (id, diff) => {
    const counters = get().counters;

    const newValue = (counters[id] || 0) + diff;

    set(() => ({
      counters: { ...counters, [id]: newValue >= 0 ? newValue : 0 },
    }));
  },
  clearCart: () => {
    set(() => ({ products: {}, counters: {} }));
  },
});
