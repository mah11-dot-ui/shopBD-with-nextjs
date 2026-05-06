import Link from "next/link";
import { categories } from "@/data/products";

export default function CategorySection() {
  return (
    <section className="py-14 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-1">Browse</p>
            <h2 className="text-3xl font-bold text-base-content">Shop by Category</h2>
          </div>
          <Link
            href="/categories"
            className="btn btn-ghost btn-sm gap-1 text-primary hover:bg-primary/10"
          >
            View All →
          </Link>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className="group card bg-base-100 border border-base-200 hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="card-body items-center text-center p-4 gap-2">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-200">
                  {cat.icon}
                </div>
                <p className="font-semibold text-sm text-base-content group-hover:text-primary transition-colors">
                  {cat.name}
                </p>
                <p className="text-xs text-base-content/50">{cat.count} items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
