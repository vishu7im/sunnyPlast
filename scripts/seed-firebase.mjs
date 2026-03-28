/**
 * Seed Firebase Firestore from local JSON files.
 * Run once after setting up Firebase:
 *
 *   FIREBASE_PROJECT_ID=xxx \
 *   FIREBASE_CLIENT_EMAIL=xxx \
 *   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..." \
 *   node scripts/seed-firebase.mjs
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const db = getFirestore(app);

async function seed() {
  // Seed products
  const { products } = JSON.parse(readFileSync(path.join(root, "data/products.json"), "utf-8"));
  const batch = db.batch();
  for (const p of products) {
    batch.set(db.collection("products").doc(p.id), p);
  }
  await batch.commit();
  console.log(`✓ Seeded ${products.length} products`);

  // Seed content
  const content = JSON.parse(readFileSync(path.join(root, "data/content.json"), "utf-8"));
  await db.collection("site_content").doc("main").set(content);
  console.log("✓ Seeded site content");

  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
