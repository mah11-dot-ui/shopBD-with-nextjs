"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Product } from "@/data/products";

interface WishlistContextType {
  items: Product[];
  toggle: (product: Product) => void;
  isWishlisted: (id: number) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const toggle = useCallback((product: Product) => {
    setItems((prev) =>
      prev.find((i) => i.id === product.id)
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product]
    );
  }, []);

  const isWishlisted = useCallback(
    (id: number) => items.some((i) => i.id === id),
    [items]
  );

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
