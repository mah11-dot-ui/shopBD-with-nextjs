"use client";

import Image from "next/image";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={closeCart}
      PaperProps={{ sx: { width: { xs: "100%", sm: 420 } } }}
    >
      <div className="flex flex-col h-full bg-base-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-200">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <h2 className="text-lg font-bold text-base-content">
              Your Cart
              {totalItems > 0 && (
                <span className="ml-2 badge badge-primary badge-sm">{totalItems}</span>
              )}
            </h2>
          </div>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={closeCart}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span className="text-6xl">🛍️</span>
              <p className="text-lg font-semibold text-base-content">Your cart is empty</p>
              <p className="text-sm text-base-content/50">Add some products to get started</p>
              <button className="btn btn-primary btn-sm" onClick={closeCart}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 rounded-xl border border-base-200 bg-base-100 hover:border-primary/20 transition-colors">
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-base-200 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-primary font-medium uppercase">{item.category}</p>
                    <p className="text-sm font-semibold text-base-content line-clamp-2 leading-snug mt-0.5">
                      {item.name}
                    </p>
                    <p className="text-base font-bold text-primary mt-1">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="btn btn-xs btn-circle btn-outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        className="btn btn-xs btn-circle btn-outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-xs btn-ghost text-error ml-auto"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-base-200 px-5 py-4 space-y-3 bg-base-100">
            {/* Subtotal */}
            <div className="flex justify-between text-sm text-base-content/70">
              <span>Subtotal ({totalItems} items)</span>
              <span>৳{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-base-content/70">
              <span>Delivery</span>
              <span className={totalPrice >= 999 ? "text-success font-medium" : ""}>
                {totalPrice >= 999 ? "Free" : "৳60"}
              </span>
            </div>
            <div className="divider my-1"></div>
            <div className="flex justify-between font-bold text-base-content text-lg">
              <span>Total</span>
              <span className="text-primary">
                ৳{(totalPrice + (totalPrice >= 999 ? 0 : 60)).toLocaleString()}
              </span>
            </div>

            <Link
              href="/checkout"
              className="btn btn-primary w-full"
              onClick={closeCart}
            >
              Proceed to Checkout →
            </Link>
            <button
              className="btn btn-ghost btn-sm w-full text-error"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </Drawer>
  );
}
