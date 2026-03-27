import type { Metadata } from "next";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "Add Product" };

export default function NewProductPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display font-bold text-navy-900 text-2xl">Add Product</h1>
        <p className="text-steel-500 text-sm mt-1">Create a new product listing</p>
      </div>
      <ProductForm mode="create" />
    </div>
  );
}
