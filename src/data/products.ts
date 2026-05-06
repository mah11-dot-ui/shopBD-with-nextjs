export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  { id: "electronics", name: "Electronics", icon: "💻", count: 120 },
  { id: "fashion", name: "Fashion", icon: "👗", count: 340 },
  { id: "home", name: "Home & Living", icon: "🏠", count: 210 },
  { id: "sports", name: "Sports", icon: "⚽", count: 95 },
  { id: "beauty", name: "Beauty", icon: "💄", count: 180 },
  { id: "books", name: "Books", icon: "📚", count: 450 },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 24999,
    originalPrice: 32000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "electronics",
    rating: 4.8,
    reviews: 2341,
    badge: "Best Seller",
    description: "Industry-leading noise canceling with Dual Noise Sensor technology.",
    inStock: true,
  },
  {
    id: 2,
    name: "Apple iPhone 15 Pro Max",
    price: 149999,
    originalPrice: 165000,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    category: "electronics",
    rating: 4.9,
    reviews: 5621,
    badge: "New",
    description: "Titanium design, A17 Pro chip, and a 48MP main camera.",
    inStock: true,
  },
  {
    id: 3,
    name: "Nike Air Max 270",
    price: 8999,
    originalPrice: 12000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "fashion",
    rating: 4.6,
    reviews: 1892,
    badge: "Sale",
    description: "Inspired by the Air Max 180 and Air Max 93, the Nike Air Max 270.",
    inStock: true,
  },
  {
    id: 4,
    name: "Samsung 4K Smart TV 55\"",
    price: 59999,
    originalPrice: 75000,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    category: "electronics",
    rating: 4.7,
    reviews: 3210,
    badge: "Hot Deal",
    description: "Crystal UHD 4K Smart TV with Tizen OS and built-in Alexa.",
    inStock: true,
  },
  {
    id: 5,
    name: "Minimalist Leather Watch",
    price: 4599,
    originalPrice: 6000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "fashion",
    rating: 4.5,
    reviews: 876,
    description: "Premium leather strap with sapphire crystal glass.",
    inStock: true,
  },
  {
    id: 6,
    name: "Yoga Mat Premium",
    price: 1899,
    originalPrice: 2500,
    image: "https://images.unsplash.com/photo-1601925228008-f5e4c5e5e5e5?w=400&h=400&fit=crop",
    category: "sports",
    rating: 4.4,
    reviews: 654,
    badge: "Sale",
    description: "Non-slip, eco-friendly yoga mat with alignment lines.",
    inStock: true,
  },
  {
    id: 7,
    name: "Scented Candle Set",
    price: 1299,
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&h=400&fit=crop",
    category: "home",
    rating: 4.6,
    reviews: 432,
    description: "Set of 3 luxury scented candles with natural soy wax.",
    inStock: true,
  },
  {
    id: 8,
    name: "MacBook Air M3",
    price: 119999,
    originalPrice: 130000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    category: "electronics",
    rating: 4.9,
    reviews: 4521,
    badge: "New",
    description: "Supercharged by M3 chip. Up to 18 hours battery life.",
    inStock: false,
  },
  {
    id: 9,
    name: "Levi's 501 Original Jeans",
    price: 3999,
    originalPrice: 5500,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    category: "fashion",
    rating: 4.5,
    reviews: 2100,
    badge: "Sale",
    description: "The original straight fit jeans since 1873.",
    inStock: true,
  },
  {
    id: 10,
    name: "Nespresso Coffee Machine",
    price: 12999,
    originalPrice: 16000,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    category: "home",
    rating: 4.7,
    reviews: 1543,
    description: "Brew barista-quality coffee at home in seconds.",
    inStock: true,
  },
  {
    id: 11,
    name: "Skincare Glow Kit",
    price: 2499,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    category: "beauty",
    rating: 4.6,
    reviews: 987,
    badge: "Popular",
    description: "Complete skincare routine with vitamin C serum and moisturizer.",
    inStock: true,
  },
  {
    id: 12,
    name: "Atomic Habits — James Clear",
    price: 599,
    originalPrice: 800,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    category: "books",
    rating: 4.9,
    reviews: 8765,
    badge: "Bestseller",
    description: "Tiny changes, remarkable results. The #1 New York Times bestseller.",
    inStock: true,
  },
];

export const featuredProducts = products.filter((p) =>
  [1, 2, 3, 4, 11, 12].includes(p.id)
);

export const newArrivals = products.filter((p) =>
  [2, 8, 5, 7].includes(p.id)
);
