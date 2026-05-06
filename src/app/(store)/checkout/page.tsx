"use client";

// Force dynamic rendering to avoid Firebase initialization during build
export const dynamic = 'force-dynamic';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "", zip: "",
  });

  const delivery = totalPrice >= 999 ? 0 : 60;
  const total = totalPrice + delivery;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const required = ["name", "email", "phone", "address", "city"];
    const missing = required.find((k) => !form[k as keyof typeof form].trim());
    if (missing) {
      showToast(`Please fill in the ${missing} field`, "error");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    showToast("Order placed successfully! 🎉", "success");
    router.push("/order-success");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-base-content/60 mb-6">Add some products before checking out</p>
        <Link href="/shop" className="btn btn-primary">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-base-content mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping info */}
            <div className="card bg-base-100 border border-base-200 p-6">
              <h2 className="text-lg font-bold text-base-content mb-5">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  fullWidth
                  size="small"
                />
                <TextField
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Full Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  fullWidth
                  size="small"
                  className="sm:col-span-2"
                />
                <TextField
                  label="ZIP Code (optional)"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </div>
            </div>

            {/* Payment method */}
            <div className="card bg-base-100 border border-base-200 p-6">
              <h2 className="text-lg font-bold text-base-content mb-5">Payment Method</h2>
              <FormControl>
                <FormLabel className="text-base-content/70 text-sm mb-2">Select payment</FormLabel>
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="space-y-2"
                >
                  {[
                    { value: "bkash", label: "bKash", icon: "📱", desc: "Pay with bKash mobile banking" },
                    { value: "nagad", label: "Nagad", icon: "💳", desc: "Pay with Nagad mobile banking" },
                    { value: "card", label: "Credit/Debit Card", icon: "💳", desc: "Visa, Mastercard accepted" },
                    { value: "cod", label: "Cash on Delivery", icon: "💵", desc: "Pay when you receive" },
                  ].map((method) => (
                    <div
                      key={method.value}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                        paymentMethod === method.value
                          ? "border-primary bg-primary/5"
                          : "border-base-200 hover:border-base-300"
                      }`}
                      onClick={() => setPaymentMethod(method.value)}
                    >
                      <FormControlLabel
                        value={method.value}
                        control={<Radio size="small" color="primary" />}
                        label=""
                        className="m-0"
                      />
                      <span className="text-xl">{method.icon}</span>
                      <div>
                        <p className="font-semibold text-sm text-base-content">{method.label}</p>
                        <p className="text-xs text-base-content/50">{method.desc}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          {/* Right — order summary */}
          <div className="space-y-4">
            <div className="card bg-base-100 border border-base-200 p-5 sticky top-24">
              <h2 className="text-lg font-bold text-base-content mb-4">
                Order Summary ({totalItems} items)
              </h2>

              {/* Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-base-200 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-base-content truncate">{item.name}</p>
                      <p className="text-xs text-base-content/50">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-primary shrink-0">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="divider my-2"></div>

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-base-content/70">
                  <span>Subtotal</span>
                  <span>৳{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base-content/70">
                  <span>Delivery</span>
                  <span className={delivery === 0 ? "text-success font-medium" : ""}>
                    {delivery === 0 ? "Free" : `৳${delivery}`}
                  </span>
                </div>
                <div className="divider my-1"></div>
                <div className="flex justify-between font-bold text-base-content text-base">
                  <span>Total</span>
                  <span className="text-primary text-lg">৳{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className={`btn btn-primary w-full mt-4 text-base ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order →"}
              </button>

              <p className="text-xs text-center text-base-content/40 mt-3">
                🔒 Secure checkout. Your data is protected.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
