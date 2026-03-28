import { notFound } from "next/navigation";
import { getProductById, getAllProducts } from "@/lib/products";
import ProductForm from "@/components/admin/ProductForm";
import type { Metadata } from "next";

interface PageProps { params: { id: string } }

export const metadata: Metadata = { title: "Edit Product" };

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id }));
}

export default function EditProductPage({ params }: PageProps) {
  const product = getProductById(params.id);
  if (!product) notFound();

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display font-bold text-navy-900 text-2xl">Edit Product</h1>
        <p className="text-steel-500 text-sm mt-1 truncate">{product.name}</p>
      </div>
      <ProductForm product={product} mode="edit" />
    </div>
  );
}
