import { getAllProducts } from "@/lib/products";
import ProductsContent from "@/components/products/ProductsContent";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our full range of UK-manufactured plastic packaging: thermoformed trays, industrial containers, pharmaceutical packaging, retail packaging and bespoke solutions.",
};

export default function ProductsPage() {
  const products = getAllProducts();
  return (
    <div className="pt-16">
      <ProductsContent products={products} />
    </div>
  );
}
