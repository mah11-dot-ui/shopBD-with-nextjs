import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const dealProducts = products.filter((p) => p.originalPrice);

export default function DealsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-error to-warning text-white p-8 mb-10">
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10"></div>
        <div className="absolute -right-4 -bottom-16 w-64 h-64 rounded-full bg-white/5"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span>🏷️</span>
              <span className="font-semibold uppercase tracking-wide text-sm">Hot Deals</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Today&apos;s Best Deals</h1>
            <p className="text-white/80">Limited time offers — grab them before they&apos;re gone!</p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-3">
            <span>⏱️</span>
            <div>
              <p className="text-xs text-white/70">Deals end in</p>
              <p className="font-bold text-lg">08:42:15</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: "Active Deals", value: dealProducts.length },
          { label: "Max Discount", value: "40%" },
          { label: "Happy Buyers", value: "12K+" },
        ].map((stat, i) => (
          <div key={i} className="card bg-base-100 border border-base-200 p-4 text-center">
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-base-content/60">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Products */}
      <h2 className="text-2xl font-bold text-base-content mb-6">All Deals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dealProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
