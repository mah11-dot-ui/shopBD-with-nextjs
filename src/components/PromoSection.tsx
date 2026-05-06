import Link from "next/link";

export default function PromoSection() {
  return (
    <section className="py-14 px-4 bg-base-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Promo card 1 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-focus p-8 text-primary-content min-h-[220px] flex flex-col justify-between">
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10"></div>
          <div className="absolute -right-4 -bottom-12 w-56 h-56 rounded-full bg-white/5"></div>
          <div className="relative z-10">
            <span className="badge bg-white/20 text-white border-none mb-3">Limited Time</span>
            <h3 className="text-2xl font-bold mb-2">Electronics Sale</h3>
            <p className="text-primary-content/80 text-sm">Up to 40% off on top brands</p>
          </div>
          <Link
            href="/shop?category=electronics"
            className="relative z-10 btn bg-white text-primary hover:bg-base-100 border-none btn-sm w-fit gap-1 mt-4"
          >
            Shop Now →
          </Link>
        </div>

        {/* Promo card 2 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-accent p-8 text-secondary-content min-h-[220px] flex flex-col justify-between">
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10"></div>
          <div className="absolute -right-4 -bottom-12 w-56 h-56 rounded-full bg-white/5"></div>
          <div className="relative z-10">
            <span className="badge bg-white/20 text-white border-none mb-3">New Collection</span>
            <h3 className="text-2xl font-bold mb-2">Fashion Week</h3>
            <p className="text-secondary-content/80 text-sm">Trending styles at best prices</p>
          </div>
          <Link
            href="/shop?category=fashion"
            className="relative z-10 btn bg-white text-secondary hover:bg-base-100 border-none btn-sm w-fit gap-1 mt-4"
          >
            Explore →
          </Link>
        </div>
      </div>
    </section>
  );
}
