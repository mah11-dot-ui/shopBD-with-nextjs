import Link from "next/link";
import Image from "next/image";

const stats = [
  { icon: "🚚", label: "Free Delivery", sub: "On orders ৳999+" },
  { icon: "✅", label: "100% Authentic", sub: "Verified products" },
  { icon: "🎧", label: "24/7 Support", sub: "Always here for you" },
  { icon: "🏷️", label: "Best Prices", sub: "Guaranteed deals" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Hero */}
      <div className="relative bg-linear-to-135 from-slate-900 via-slate-800 to-slate-900 min-h-[600px] flex items-center">

        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&h=700&fit=crop"
            alt="Shopping background"
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-slate-900/95 via-slate-900/70 to-slate-900/30" />
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-y-1/2" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div className="space-y-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary-content/90 text-sm font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              🏷️ Summer Sale — Up to 50% Off
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              Shop the{" "}
              <span className="relative inline-block">
                <span className="text-primary">Best Deals</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 220 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 7C50 2 110 2 218 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="text-primary"
                  />
                </svg>
              </span>
              <br />
              <span className="text-white/90">Online</span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed max-w-md">
              Discover thousands of products from top brands. Fast delivery, easy returns, and unbeatable prices — all in one place.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="btn btn-primary btn-lg gap-2 shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
              >
                Shop Now →
              </Link>
              <Link
                href="/deals"
                className="btn btn-lg bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm"
              >
                View Deals
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
                ].map((src, i) => (
                  <div key={i} className="relative w-9 h-9 rounded-full border-2 border-slate-800 overflow-hidden">
                    <Image src={src} alt="Customer" fill className="object-cover" sizes="36px" />
                  </div>
                ))}
              </div>
              <div className="text-sm text-white/60">
                <span className="text-white font-bold">50,000+</span> happy customers
                <div className="flex gap-0.5 mt-0.5">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 text-xs">★</span>)}
                  <span className="text-white/40 ml-1">4.9/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — product showcase */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-sm">

              {/* Main product card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-2xl">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-white/5">
                  <Image
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
                    alt="Sony Headphones"
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                  <div className="absolute top-3 left-3 badge badge-error font-bold shadow">22% OFF</div>
                </div>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Electronics</p>
                <p className="text-white font-bold text-base leading-snug mb-3">Sony WH-1000XM5 Wireless Headphones</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-primary text-xl font-extrabold">৳24,999</p>
                    <p className="text-white/40 text-sm line-through">৳32,000</p>
                  </div>
                  <Link href="/product/1" className="btn btn-primary btn-sm">
                    Buy Now
                  </Link>
                </div>
              </div>

              {/* Floating card — top right */}
              <div className="absolute -top-5 -right-5 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-base-200">
                <div className="w-9 h-9 rounded-full bg-success/10 flex items-center justify-center text-lg">✅</div>
                <div>
                  <p className="text-xs font-bold text-base-content">Verified Purchase</p>
                  <p className="text-xs text-base-content/50">Just now</p>
                </div>
              </div>

              {/* Floating card — bottom left */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-base-200">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-lg">🚚</div>
                <div>
                  <p className="text-xs font-bold text-base-content">Free Delivery</p>
                  <p className="text-xs text-base-content/50">Orders ৳999+</p>
                </div>
              </div>

              {/* Floating rating */}
              <div className="absolute top-1/2 -right-8 -translate-y-1/2 bg-white rounded-xl shadow-xl px-3 py-2 border border-base-200">
                <p className="text-xs font-bold text-base-content text-center">4.8 ★</p>
                <p className="text-xs text-base-content/50">2.3k reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-base-100 border-b border-base-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 divide-x divide-base-200">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-5">
              <span className="text-2xl shrink-0">{stat.icon}</span>
              <div>
                <p className="font-semibold text-sm text-base-content">{stat.label}</p>
                <p className="text-xs text-base-content/50">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
