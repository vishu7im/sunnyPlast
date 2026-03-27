import type { ProductCategory } from "@/types";

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "food-packaging",          label: "Food Packaging" },
  { value: "industrial-containers",   label: "Industrial Containers" },
  { value: "pharmaceutical-packaging",label: "Pharmaceutical Packaging" },
  { value: "retail-packaging",        label: "Retail Packaging" },
  { value: "custom-packaging",        label: "Custom Packaging" },
];

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  "food-packaging":           "Food Packaging",
  "industrial-containers":    "Industrial Containers",
  "pharmaceutical-packaging": "Pharmaceutical Packaging",
  "retail-packaging":         "Retail Packaging",
  "custom-packaging":         "Custom Packaging",
};

export const CATEGORY_COLORS: Record<ProductCategory, string> = {
  "food-packaging":           "bg-green-100 text-green-800",
  "industrial-containers":    "bg-orange-100 text-orange-800",
  "pharmaceutical-packaging": "bg-[#e8edff] text-[#3255b7]",
  "retail-packaging":         "bg-plum-surface-high text-plum-primary",
  "custom-packaging":         "bg-plum-surface-mid text-plum-on-surface",
};

export const INDUSTRY_LABELS = {
  "food-beverage":  "Food & Beverage",
  "pharmaceutical": "Pharmaceutical",
  "automotive":     "Automotive",
  "retail":         "Retail & FMCG",
} as const;

export const COOKIE_NAME = "sunnyplaste-admin-token";
