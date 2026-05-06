import { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
  bgClass?: string;
}

export default function ProductSection({
  title,
  subtitle,
  products,
  viewAllHref = "/shop",
  bgClass = "bg-base-100",
}: ProductSectionProps) {
  return (
    <section className={`py-14 px-4 ${bgClass}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            {subtitle && (
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-1">
                {subtitle}
              </p>
            )}
            <h2 className="text-3xl font-bold text-base-content">{title}</h2>
          </div>
          <Link
            href={viewAllHref}
            className="btn btn-ghost btn-sm gap-1 text-primary hover:bg-primary/10"
          >
            View All →
          </Link>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
