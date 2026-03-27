import { clsx } from "clsx";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/constants";
import type { ProductCategory } from "@/types";

interface BadgeProps {
  category: ProductCategory;
  className?: string;
}

export default function Badge({ category, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-block px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
        CATEGORY_COLORS[category] || "bg-steel-100 text-steel-700",
        className
      )}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
