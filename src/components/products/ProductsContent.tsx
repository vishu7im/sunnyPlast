"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { Product, ProductCategory } from "@/types";
import { CATEGORY_LABELS } from "@/lib/constants";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Props {
  products: Product[];
}

function Content({ products }: Props) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") as ProductCategory | null;
  const filtered = category ? products.filter((p) => p.category === category) : products;
  const pageTitle = category ? (CATEGORY_LABELS[category] ?? "Products") : "All Products";

  return (
    <>
      {/* Page hero */}
      <div
        className="py-16 md:py-20"
        style={{ background: "linear-gradient(135deg, #2d1533 0%, var(--brand-primary) 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-plum-primary-container/80 text-xs font-bold uppercase tracking-[0.15em] mb-3">
            Our Range
          </p>
          <h1 className="font-display font-bold text-white text-3xl md:text-5xl">
            {pageTitle}
          </h1>
          <p className="text-white/70 mt-3 text-lg">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      {/* Filter + grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <ProductFilter />

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-plum-on-surface-variant text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 60}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function ProductsContent({ products }: Props) {
  return (
    <Suspense>
      <Content products={products} />
    </Suspense>
  );
}
