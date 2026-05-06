"use client";

const orders = [
  { id: "ORD-001", date: "2026-05-01", items: 3, total: 74997, status: "Delivered", products: ["Sony WH-1000XM5", "iPhone 15 Pro Max", "Nike Air Max"] },
  { id: "ORD-002", date: "2026-05-02", items: 1, total: 24999, status: "Shipped", products: ["Sony WH-1000XM5"] },
  { id: "ORD-003", date: "2026-05-03", items: 2, total: 13598, status: "Processing", products: ["Nike Air Max", "Yoga Mat"] },
  { id: "ORD-004", date: "2026-05-04", items: 1, total: 149999, status: "Pending", products: ["iPhone 15 Pro Max"] },
  { id: "ORD-005", date: "2026-04-28", items: 4, total: 18396, status: "Delivered", products: ["Yoga Mat", "Scented Candle", "Levi's Jeans", "Watch"] },
  { id: "ORD-006", date: "2026-04-25", items: 1, total: 4599, status: "Cancelled", products: ["Watch"] },
];

const statusConfig: Record<string, { label: string; cls: string }> = {
  Delivered: { label: "Delivered", cls: "bg-success/10 text-success" },
  Shipped: { label: "Shipped", cls: "bg-info/10 text-info" },
  Processing: { label: "Processing", cls: "bg-warning/10 text-warning" },
  Pending: { label: "Pending", cls: "bg-amber-100 text-amber-700" },
  Cancelled: { label: "Cancelled", cls: "bg-error/10 text-error" },
};

export default function OrdersPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">My Orders</h1>
        <p className="text-base-content/60 mt-1">{orders.length} total orders</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="card bg-base-100 border border-base-200 hover:border-primary/30 transition-colors overflow-hidden">
            {/* Header */}
            <div className="bg-base-200/50 px-5 py-3 flex items-center justify-between border-b border-base-200">
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <p className="text-xs text-base-content/50 uppercase">Order ID</p>
                  <p className="font-mono font-bold text-primary">{order.id}</p>
                </div>
                <div>
                  <p className="text-xs text-base-content/50 uppercase">Date</p>
                  <p className="font-semibold text-base-content">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs text-base-content/50 uppercase">Total</p>
                  <p className="font-bold text-base-content">৳{order.total.toLocaleString()}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusConfig[order.status].cls}`}>
                {statusConfig[order.status].label}
              </span>
            </div>

            {/* Body */}
            <div className="p-5">
              <p className="text-sm font-semibold text-base-content mb-2">{order.items} items</p>
              <ul className="text-sm text-base-content/70 space-y-1 mb-4">
                {order.products.map((p, i) => (
                  <li key={i}>• {p}</li>
                ))}
              </ul>
              <div className="flex gap-2">
                <button className="btn btn-primary btn-sm">Track Order</button>
                <button className="btn btn-outline btn-sm">View Details</button>
                {order.status === "Delivered" && (
                  <button className="btn btn-ghost btn-sm">Leave Review</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-24">
          <p className="text-6xl mb-4">📦</p>
          <h2 className="text-2xl font-bold text-base-content mb-2">No orders yet</h2>
          <p className="text-base-content/60 mb-6">Start shopping to see your orders here</p>
          <a href="/shop" className="btn btn-primary">Browse Products</a>
        </div>
      )}
    </div>
  );
}
