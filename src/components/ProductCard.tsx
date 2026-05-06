"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product);
    showToast(`"${product.name.slice(0, 30)}..." added to cart`, "success");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product);
    showToast(
      wishlisted ? "Removed from wishlist" : "Added to wishlist ❤️",
      wishlisted ? "info" : "success"
    );
  };

  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-xl transition-all duration-300 group border border-base-200 hover:border-primary/30 overflow-hidden">
      {/* Image */}
      <Link href={`/product/${product.id}`}>
        <figure className="relative overflow-hidden bg-base-200 h-56 cursor-pointer">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.badge && (
              <span className="badge badge-primary badge-sm font-semibold shadow">{product.badge}</span>
            )}
            {discount > 0 && (
              <span className="badge badge-error badge-sm font-semibold shadow">-{discount}%</span>
            )}
            {!product.inStock && (
              <span className="badge badge-neutral badge-sm shadow">Out of Stock</span>
            )}
          </div>

          {/* Hover actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
            <Tooltip title={wishlisted ? "Remove from wishlist" : "Add to wishlist"} placement="left">
              <button
                className={`btn btn-circle btn-xs shadow-md border-none ${wishlisted ? "bg-error text-white" : "bg-white hover:bg-error hover:text-white"}`}
                onClick={handleWishlist}
              >
                {wishlisted ? "♥" : "♡"}
              </button>
            </Tooltip>
            <Tooltip title="Quick view" placement="left">
              <Link
                href={`/product/${product.id}`}
                className="btn btn-circle btn-xs bg-white shadow-md border-none hover:bg-primary hover:text-white"
              >
                👁
              </Link>
            </Tooltip>
          </div>
        </figure>
      </Link>

      {/* Body */}
      <div className="card-body p-4 gap-2">
        <p className="text-xs text-primary font-semibold uppercase tracking-wider">{product.category}</p>

        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-base-content line-clamp-2 leading-snug hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <Rating value={product.rating} precision={0.1} readOnly size="small" />
          <span className="text-xs text-base-content/50">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">৳{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-base-content/40 line-through">৳{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Add to cart */}
        <button
          className={`btn btn-sm w-full mt-1 gap-2 ${!product.inStock ? "btn-disabled opacity-50" : "btn-primary"}`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          🛒 {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
