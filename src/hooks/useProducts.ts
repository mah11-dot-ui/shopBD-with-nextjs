"use client";

import { useState, useEffect } from "react";
import { subscribeProducts } from "@/lib/productService";
import type { Product } from "@/data/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  return { products, loading };
}
