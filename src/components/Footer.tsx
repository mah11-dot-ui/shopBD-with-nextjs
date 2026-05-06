import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      {/* Newsletter section */}
      <div className="bg-primary text-primary-content py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Subscribe to our Newsletter</h3>
            <p className="text-primary-content/80 mt-1">Get the latest deals and offers directly in your inbox.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered bg-white text-base-content w-full md:w-72 focus:outline-none"
            />
            <button className="btn bg-base-100 text-primary hover:bg-base-200 border-none font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-content font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold">
              Shop<span className="text-primary">BD</span>
            </span>
          </div>
          <p className="text-base-content/60 text-sm leading-relaxed">
            Bangladesh&apos;s most trusted online shopping destination. Quality products, fast delivery, and amazing deals.
          </p>
          <div className="flex gap-3 mt-4">
            {["f", "in", "tw", "yt"].map((s) => (
              <a key={s} href="#" className="btn btn-circle btn-sm btn-ghost hover:text-primary text-xs font-bold">
                {s === "f" ? "FB" : s === "in" ? "IG" : s === "tw" ? "TW" : "YT"}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-base-content mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-base-content/70">
            {["Home", "Shop", "Categories", "Deals", "About Us", "Contact"].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-primary transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-bold text-base-content mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm text-base-content/70">
            {["My Account", "Track Order", "Return Policy", "FAQ", "Privacy Policy", "Terms & Conditions"].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-primary transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-base-content mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-base-content/70">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">📍</span>
              <span>123 Gulshan Avenue, Dhaka 1212, Bangladesh</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">📞</span>
              <span>+880 1700-000000</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✉️</span>
              <span>support@shopbd.com</span>
            </li>
          </ul>
          <div className="mt-4">
            <p className="text-xs text-base-content/50 mb-2">We accept</p>
            <div className="flex gap-2 flex-wrap">
              {["bKash", "Nagad", "Visa", "MasterCard"].map((method) => (
                <span key={method} className="badge badge-outline badge-sm text-xs">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-base-300 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-base-content/50">
          <p>© 2026 ShopBD. All rights reserved.</p>
          <p>Made with ❤️ in Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
