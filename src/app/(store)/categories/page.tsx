import Link from "next/link";
import { categories, products } from "@/data/products";

export default function CategoriesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">All Categories</h1>
        <p className="text-base-content/60 mt-1">Browse products by category</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const catProducts = products.filter((p) => p.category === cat.id).slice(0, 3);
          return (
            <div key={cat.id} className="card bg-base-100 border border-base-200 hover:shadow-lg hover:border-primary/30 transition-all duration-200 overflow-hidden">
              {/* Category header */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 flex items-center gap-4">
                <span className="text-5xl">{cat.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-base-content">{cat.name}</h2>
                  <p className="text-sm text-base-content/60">{cat.count} products</p>
                </div>
              </div>

              {/* Sample products */}
              <div className="p-4 space-y-2">
                {catProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-sm">
                    <span className="text-base-content/70 truncate">{p.name}</span>
                    <span className="text-primary font-semibold shrink-0 ml-2">
                      ৳{p.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="px-4 pb-4">
                <Link
                  href={`/shop?category=${cat.id}`}
                  className="btn btn-primary btn-sm w-full gap-1"
                >
                  Browse {cat.name} →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
