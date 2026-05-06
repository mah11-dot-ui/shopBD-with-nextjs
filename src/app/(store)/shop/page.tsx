import { Suspense } from "react";
import ShopClient from "./ShopClient";

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-8 w-48 bg-base-200 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card bg-base-200 h-80 animate-pulse" />
          ))}
        </div>
      </div>
    }>
      <ShopClient />
    </Suspense>
  );
}
