"use client";

// Force dynamic rendering to avoid Firebase initialization during build
export const dynamic = 'force-dynamic';

import { useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ProductSection from "@/components/ProductSection";
import PromoSection from "@/components/PromoSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Home() {
  const { products, loading } = useProducts();

  const featuredProducts = useMemo(
    () => products.filter((p) => p.badge && p.inStock).slice(0, 4),
    [products]
  );
  const newArrivals = useMemo(
    () => products.filter((p) => p.badge === "New").slice(0, 4),
    [products]
  );
  const dealProducts = useMemo(
    () => products.filter((p) => p.originalPrice && p.inStock).slice(0, 4),
    [products]
  );

  return (
    <>
      <HeroSection />
      <CategorySection />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <ProductSection
            title="Featured Products"
            subtitle="Handpicked"
            products={featuredProducts.length ? featuredProducts : products.slice(0, 4)}
            viewAllHref="/shop"
          />
          <PromoSection />
          <ProductSection
            title="New Arrivals"
            subtitle="Just In"
            products={newArrivals.length ? newArrivals : products.slice(0, 4)}
            viewAllHref="/shop"
            bgClass="bg-base-200"
          />
          <ProductSection
            title="Hot Deals"
            subtitle="Limited Time"
            products={dealProducts.length ? dealProducts : products.slice(0, 4)}
            viewAllHref="/deals"
          />
        </>
      )}

      <TestimonialsSection />
    </>
  );
}
