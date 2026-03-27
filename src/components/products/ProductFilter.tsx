"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { clsx } from "clsx";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import type { ProductCategory } from "@/types";

export default function ProductFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("category") as ProductCategory | null;

  function setCategory(cat: ProductCategory | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat) {
      params.set("category", cat);
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2 mb-10">
      <button
        onClick={() => setCategory(null)}
        className={clsx(
          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
          !current
            ? "bg-plum-primary text-plum-on-primary shadow-button"
            : "bg-plum-surface-high text-plum-on-surface-variant hover:bg-plum-surface-highest"
        )}
      >
        All Products
      </button>
      {PRODUCT_CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => setCategory(cat.value)}
          className={clsx(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            current === cat.value
              ? "bg-plum-primary text-plum-on-primary shadow-button"
              : "bg-plum-surface-high text-plum-on-surface-variant hover:bg-plum-surface-highest"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
