import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ShopBD — আপনার পছন্দের অনলাইন শপ",
  description: "Best ecommerce store in Bangladesh with amazing deals",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base-100 font-(--font-inter)">
        {children}
      </body>
    </html>
  );
}
