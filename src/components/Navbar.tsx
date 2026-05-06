"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { products } from "@/data/products";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import AuthModal from "./AuthModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Deals", href: "/deals" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const router = useRouter();
  const { totalItems, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, logOut, isAdmin } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(products.slice(0, 0));
  const [authOpen, setAuthOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Live search
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const results = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
      .slice(0, 5);
    setSearchResults(results);
  }, [searchQuery]);

  // Close search on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary text-primary-content text-center text-xs py-2 px-4 flex items-center justify-center gap-2">
        <span>🚚</span>
        <span>
          Free shipping on orders over ৳999 | Use code:{" "}
          <strong>SHOPBD10</strong> for 10% off
        </span>
      </div>

      {/* Main navbar */}
      <nav className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 lg:px-8 border-b border-base-200">
        {/* Start */}
        <div className="navbar-start gap-2">
          <button
            className="btn btn-ghost btn-sm btn-circle lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-content font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold hidden sm:block">
              Shop<span className="text-primary">BD</span>
            </span>
          </Link>
        </div>

        {/* Center — desktop nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-medium hover:text-primary hover:bg-primary/10 rounded-lg">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* End — actions */}
        <div className="navbar-end gap-1">
          {/* Search */}
          <div ref={searchRef} className="relative hidden md:block">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="input input-bordered input-sm w-56 lg:w-72 pr-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                      onClick={() => { setSearchQuery(""); setSearchResults([]); }}
                    >
                      ✕
                    </button>
                  )}
                </div>
                <button type="submit" className="btn btn-primary btn-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            ) : (
              <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setSearchOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}

            {/* Search dropdown results */}
            {searchResults.length > 0 && (
              <div className="absolute top-full mt-2 right-0 w-80 bg-base-100 rounded-xl shadow-xl border border-base-200 z-50 overflow-hidden">
                {searchResults.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-base-200 transition-colors"
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); setSearchResults([]); }}
                  >
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-base-200 shrink-0">
                      <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-base-content truncate">{p.name}</p>
                      <p className="text-xs text-primary font-semibold">৳{p.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
                <button
                  className="w-full text-center text-xs text-primary py-2 hover:bg-base-200 border-t border-base-200 font-medium"
                  onClick={() => {
                    router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
                    setSearchOpen(false); setSearchQuery(""); setSearchResults([]);
                  }}
                >
                  See all results for &quot;{searchQuery}&quot; →
                </button>
              </div>
            )}
          </div>

          {/* Mobile search */}
          <button className="btn btn-ghost btn-sm btn-circle md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Wishlist */}
          <Link href="/wishlist" className="btn btn-ghost btn-sm btn-circle relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="badge badge-error badge-xs absolute -top-1 -right-1 min-w-[18px]">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <button className="btn btn-ghost btn-sm btn-circle relative" onClick={openCart}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="badge badge-primary badge-xs absolute -top-1 -right-1 min-w-[18px]">
                {totalItems}
              </span>
            )}
          </button>

          {/* Account */}
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-sm btn-circle" tabIndex={0}>
              {user ? (
                <Avatar
                  src={user.photoURL || undefined}
                  sx={{ width: 30, height: 30, fontSize: 14, bgcolor: "primary.main" }}
                >
                  {user.displayName?.[0] || user.email?.[0]}
                </Avatar>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </button>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg border border-base-200 mt-2">
              {user ? (
                <>
                  <li className="px-3 py-2">
                    <p className="font-semibold text-sm text-base-content truncate">{user.displayName || "User"}</p>
                    <p className="text-xs text-base-content/50 truncate">{user.email}</p>
                  </li>
                  <li><hr className="my-1 border-base-200" /></li>
                  <li><Link href="/account">My Profile</Link></li>
                  <li><Link href="/orders">My Orders</Link></li>
                  <li><Link href="/wishlist">Wishlist {wishlistCount > 0 && <span className="badge badge-sm badge-primary">{wishlistCount}</span>}</Link></li>
                  {isAdmin && (
                    <>
                      <li><hr className="my-1 border-base-200" /></li>
                      <li>
                        <Link href="/admin" className="font-semibold text-violet-600 hover:bg-violet-50">
                          ⚙️ Admin Dashboard
                        </Link>
                      </li>
                    </>
                  )}
                  <li><hr className="my-1 border-base-200" /></li>
                  <li><button className="text-error w-full text-left" onClick={() => logOut()}>Sign Out</button></li>
                </>
              ) : (
                <>
                  <li className="menu-title text-xs text-base-content/60 px-3 py-1">Account</li>
                  <li><button onClick={() => setAuthOpen(true)}>Sign In / Register</button></li>
                </>
              )}
            </ul>
          </div>

          <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-72 bg-base-100 shadow-xl p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-bold">Shop<span className="text-primary">BD</span></span>
              <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setMobileOpen(false)}>✕</button>
            </div>

            {/* Mobile search */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered input-sm flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm">Go</button>
            </form>

            <ul className="menu w-full gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-medium hover:text-primary" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="divider"></div>
            <div className="flex flex-col gap-2">
              <button className="btn btn-primary btn-sm">Sign In</button>
              <button className="btn btn-outline btn-sm">Register</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
