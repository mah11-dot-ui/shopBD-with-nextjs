"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import Rating from "@mui/material/Rating";
import ProductCard from "@/components/ProductCard";

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: Props) {
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    showToast(`${quantity}x "${product.name.slice(0, 25)}..." added to cart`, "success");
  };

  const handleWishlist = () => {
    toggle(product);
    showToast(wishlisted ? "Removed from wishlist" : "Added to wishlist ❤️", wishlisted ? "info" : "success");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="breadcrumbs text-sm text-base-content/60 mb-6">
        <ul>
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li><Link href="/shop" className="hover:text-primary">Shop</Link></li>
          <li><Link href={`/shop?category=${product.category}`} className="hover:text-primary capitalize">{product.category}</Link></li>
          <li className="text-base-content font-medium truncate max-w-[200px]">{product.name}</li>
        </ul>
      </div>

      {/* Main product section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
        {/* Image */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-base-200 border border-base-200">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {discount > 0 && (
              <div className="absolute top-4 left-4">
                <span className="badge badge-error badge-lg font-bold shadow-lg">-{discount}%</span>
              </div>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="badge badge-neutral badge-lg text-base font-bold">Out of Stock</span>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-5">
          {/* Category & badge */}
          <div className="flex items-center gap-2">
            <span className="badge badge-outline badge-primary capitalize">{product.category}</span>
            {product.badge && <span className="badge badge-primary">{product.badge}</span>}
          </div>

          <h1 className="text-2xl lg:text-3xl font-extrabold text-base-content leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <Rating value={product.rating} precision={0.1} readOnly />
            <span className="text-sm text-base-content/60 font-medium">
              {product.rating} ({product.reviews.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-4xl font-extrabold text-primary">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-base-content/40 line-through mb-1">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
                <span className="badge badge-error mb-1">Save ৳{(product.originalPrice - product.price).toLocaleString()}</span>
              </>
            )}
          </div>

          <p className="text-base-content/70 leading-relaxed">{product.description}</p>

          {/* Stock status */}
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${product.inStock ? "bg-success" : "bg-error"}`}></div>
            <span className={`text-sm font-semibold ${product.inStock ? "text-success" : "text-error"}`}>
              {product.inStock ? "In Stock — Ready to ship" : "Out of Stock"}
            </span>
          </div>

          {/* Quantity + Add to cart */}
          {product.inStock && (
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-base-300 rounded-lg overflow-hidden">
                <button
                  className="btn btn-ghost btn-sm rounded-none px-3"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="px-4 py-2 font-bold text-base-content min-w-[3rem] text-center border-x border-base-300">
                  {quantity}
                </span>
                <button
                  className="btn btn-ghost btn-sm rounded-none px-3"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
              <span className="text-sm text-base-content/50">
                Total: <strong className="text-primary">৳{(product.price * quantity).toLocaleString()}</strong>
              </span>
            </div>
          )}

          <div className="flex gap-3">
            <button
              className="btn btn-primary flex-1 gap-2 text-base"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              🛒 Add to Cart
            </button>
            <button
              className={`btn btn-square ${wishlisted ? "btn-error" : "btn-outline"}`}
              onClick={handleWishlist}
              title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              {wishlisted ? "♥" : "♡"}
            </button>
          </div>

          {/* Delivery info */}
          <div className="bg-base-200 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-base-content/70">
              <span>🚚</span>
              <span>Free delivery on orders over ৳999</span>
            </div>
            <div className="flex items-center gap-2 text-base-content/70">
              <span>🔄</span>
              <span>Easy 7-day returns</span>
            </div>
            <div className="flex items-center gap-2 text-base-content/70">
              <span>✅</span>
              <span>100% authentic product</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-14">
        <div className="tabs tabs-bordered mb-6">
          <button
            className={`tab tab-lg font-semibold ${activeTab === "description" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`tab tab-lg font-semibold ${activeTab === "reviews" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({product.reviews.toLocaleString()})
          </button>
        </div>

        {activeTab === "description" ? (
          <div className="prose max-w-none text-base-content/80">
            <p className="text-base leading-relaxed">{product.description}</p>
            <ul className="mt-4 space-y-2">
              <li>✓ Premium quality materials</li>
              <li>✓ Manufacturer warranty included</li>
              <li>✓ Genuine product with serial number</li>
              <li>✓ Compatible with all standard accessories</li>
            </ul>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Summary */}
            <div className="flex items-center gap-6 p-5 bg-base-200 rounded-xl">
              <div className="text-center">
                <p className="text-5xl font-extrabold text-primary">{product.rating}</p>
                <Rating value={product.rating} precision={0.1} readOnly size="small" />
                <p className="text-xs text-base-content/50 mt-1">{product.reviews.toLocaleString()} reviews</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const pct = star === 5 ? 65 : star === 4 ? 20 : star === 3 ? 10 : star === 2 ? 3 : 2;
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-3 text-right">{star}</span>
                      <span className="text-warning">★</span>
                      <div className="flex-1 bg-base-300 rounded-full h-2">
                        <div className="bg-warning h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                      <span className="w-8 text-base-content/50">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sample reviews */}
            {[
              { name: "Rahim U.", rating: 5, text: "Excellent product! Exactly as described. Fast delivery too.", date: "2 days ago" },
              { name: "Fatema K.", rating: 4, text: "Good quality, happy with the purchase. Would recommend.", date: "1 week ago" },
              { name: "Tanvir A.", rating: 5, text: "Best purchase I've made this year. Totally worth the price!", date: "2 weeks ago" },
            ].map((r, i) => (
              <div key={i} className="p-4 border border-base-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                      {r.name[0]}
                    </div>
                    <span className="font-semibold text-sm">{r.name}</span>
                    <span className="badge badge-success badge-xs">Verified</span>
                  </div>
                  <span className="text-xs text-base-content/40">{r.date}</span>
                </div>
                <Rating value={r.rating} readOnly size="small" />
                <p className="text-sm text-base-content/70 mt-1">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-base-content mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
