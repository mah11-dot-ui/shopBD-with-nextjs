"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { items, count } = useWishlist();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-base-content">My Wishlist</h1>
          <p className="text-base-content/60 mt-1">{count} saved items</p>
        </div>
        {count > 0 && (
          <Link href="/shop" className="btn btn-outline btn-sm">
            Continue Shopping
          </Link>
        )}
      </div>

      {count === 0 ? (
        <div className="text-center py-24">
          <p className="text-6xl mb-4">💔</p>
          <h2 className="text-2xl font-bold text-base-content mb-2">Your wishlist is empty</h2>
          <p className="text-base-content/60 mb-6">Save products you love to buy them later</p>
          <Link href="/shop" className="btn btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
