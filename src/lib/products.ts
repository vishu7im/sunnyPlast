import { readFileSync, writeFileSync, renameSync } from "fs";
import path from "path";
import type { Product } from "@/types";

const DATA_PATH = path.join(process.cwd(), "data", "products.json");

export function getAllProducts(): Product[] {
  const raw = readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw).products as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find((p) => p.id === id);
}

export function writeAllProducts(products: Product[]): void {
  const tmpPath = DATA_PATH + ".tmp";
  writeFileSync(tmpPath, JSON.stringify({ products }, null, 2), "utf-8");
  renameSync(tmpPath, DATA_PATH);
}
