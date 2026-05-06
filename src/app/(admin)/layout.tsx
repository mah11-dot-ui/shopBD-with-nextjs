import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";

// Admin route group layout — no Navbar/Footer
export default function AdminGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
