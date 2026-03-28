import { readFileSync, writeFileSync, renameSync } from "fs";
import path from "path";
import type { Product } from "@/types";
import { isFirebaseConfigured, getDb } from "./firebase";

const DATA_PATH = path.join(process.cwd(), "data", "products.json");
const COLLECTION = "products";

// ── JSON fallback (local dev / GitHub Pages build) ────────────────────────────

function readJson(): Product[] {
  const raw = readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw).products as Product[];
}

function writeJson(products: Product[]): void {
  const tmp = DATA_PATH + ".tmp";
  writeFileSync(tmp, JSON.stringify({ products }, null, 2), "utf-8");
  renameSync(tmp, DATA_PATH);
}

// ── Public API (all async) ────────────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  if (!isFirebaseConfigured()) return readJson();
  const snap = await getDb().collection(COLLECTION).orderBy("createdAt", "desc").get();
  return snap.docs.map((d) => d.data() as Product);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!isFirebaseConfigured()) return readJson().find((p) => p.slug === slug);
  const snap = await getDb().collection(COLLECTION).where("slug", "==", slug).limit(1).get();
  return snap.empty ? undefined : (snap.docs[0].data() as Product);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  if (!isFirebaseConfigured()) return readJson().find((p) => p.id === id);
  const doc = await getDb().collection(COLLECTION).doc(id).get();
  return doc.exists ? (doc.data() as Product) : undefined;
}

export async function createProduct(product: Product): Promise<void> {
  if (!isFirebaseConfigured()) {
    const products = readJson();
    products.push(product);
    writeJson(products);
    return;
  }
  await getDb().collection(COLLECTION).doc(product.id).set(product);
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  if (!isFirebaseConfigured()) {
    const products = readJson();
    const idx = products.findIndex((p) => p.id === id);
    if (idx !== -1) products[idx] = { ...products[idx], ...data };
    writeJson(products);
    return;
  }
  await getDb().collection(COLLECTION).doc(id).set(data, { merge: true });
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (!isFirebaseConfigured()) {
    const products = readJson();
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) return false;
    writeJson(filtered);
    return true;
  }
  const ref = getDb().collection(COLLECTION).doc(id);
  if (!(await ref.get()).exists) return false;
  await ref.delete();
  return true;
}
