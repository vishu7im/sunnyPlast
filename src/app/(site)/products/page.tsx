import { Suspense } from "react";
import { getAllProducts } from "@/lib/products";
import type { ProductCategory } from "@/types";
import ProductCard from "@/components/products/ProductCard";
import ProductFilter from "@/components/products/ProductFilter";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our full range of UK-manufactured plastic packaging: thermoformed trays, industrial containers, pharmaceutical packaging, retail packaging and bespoke solutions.",
};

interface PageProps {
  searchParams: { category?: string };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const all = await getAllProducts();
  const category = searchParams.category as ProductCategory | undefined;
  const filtered = category ? all.filter((p) => p.category === category) : all;

  const pageTitle = category
    ? CATEGORY_LABELS[category] ?? "Products"
    : "All Products";

  return (
    <div className="pt-16">
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
        <Suspense>
          <ProductFilter />
        </Suspense>

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
    </div>
  );
}
