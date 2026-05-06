import { products } from "@/data/products";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));
  if (!product) return { title: "Product Not Found" };
  return { title: `${product.name} — ShopBD`, description: product.description };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} related={related} />;
}
