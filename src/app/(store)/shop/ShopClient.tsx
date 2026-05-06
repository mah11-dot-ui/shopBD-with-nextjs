"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ShopClient() {
  const { products, loading } = useProducts();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [priceRange, setPriceRange] = useState<number[]>([0, 200000]);
  const [sortBy, setSortBy] = useState("default");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) setSelectedCategories([categoryParam]);
  }, [categoryParam]);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (queryParam.trim()) {
      const q = queryParam.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
    }

    return result;
  }, [selectedCategories, priceRange, sortBy, inStockOnly, queryParam]);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-base-content mb-3">Categories</h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <FormControlLabel
              key={cat.id}
              control={
                <Checkbox
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  size="small"
                  color="primary"
                />
              }
              label={
                <span className="text-sm text-base-content/80 flex items-center gap-2">
                  {cat.icon} {cat.name}
                  <span className="badge badge-ghost badge-xs">{cat.count}</span>
                </span>
              }
            />
          ))}
        </div>
      </div>

      <div className="divider my-2" />

      <div>
        <h3 className="font-bold text-base-content mb-3">Price Range</h3>
        <Slider
          value={priceRange}
          onChange={(_, val) => setPriceRange(val as number[])}
          min={0}
          max={200000}
          step={500}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `৳${v.toLocaleString()}`}
          color="primary"
        />
        <div className="flex justify-between text-xs text-base-content/60 mt-1">
          <span>৳{priceRange[0].toLocaleString()}</span>
          <span>৳{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="divider my-2" />

      <FormControlLabel
        control={
          <Checkbox
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            size="small"
            color="primary"
          />
        }
        label={<span className="text-sm font-medium text-base-content">In Stock Only</span>}
      />

      <button
        className="btn btn-outline btn-sm w-full"
        onClick={() => {
          setSelectedCategories([]);
          setPriceRange([0, 200000]);
          setInStockOnly(false);
          setSortBy("default");
        }}
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-base-content">
          {queryParam ? `Search: "${queryParam}"` : "All Products"}
        </h1>
        <p className="text-base-content/60 mt-1">{filteredProducts.length} products found</p>
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="card bg-base-100 border border-base-200 p-5 sticky top-24">
            <h2 className="font-bold text-lg text-base-content mb-4">Filters</h2>
            <FilterPanel />
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6 gap-4">
            <button
              className="btn btn-outline btn-sm gap-2 lg:hidden"
              onClick={() => setFilterOpen(true)}
            >
              ⚙️ Filters
            </button>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-base-content/60 hidden sm:block">Sort by:</span>
              <select
                className="select select-bordered select-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <CircularProgress />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <h3 className="text-xl font-bold text-base-content mb-2">No products found</h3>
              <p className="text-base-content/60">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      {filterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setFilterOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-80 bg-base-100 p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg">Filters</h2>
              <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setFilterOpen(false)}>✕</button>
            </div>
            <FilterPanel />
          </div>
        </div>
      )}
    </div>
  );
}
