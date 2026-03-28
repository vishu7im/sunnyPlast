import { readFileSync, writeFileSync, renameSync } from "fs";
import path from "path";
import type { SiteContent } from "@/types";
import { isFirebaseConfigured, getDb } from "./firebase";

const DATA_PATH = path.join(process.cwd(), "data", "content.json");
const DOC_PATH = { collection: "site_content", doc: "main" } as const;

// ── JSON fallback (local dev / GitHub Pages build) ────────────────────────────

function readJson(): SiteContent {
  const raw = readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

function writeJson(content: SiteContent): void {
  const tmp = DATA_PATH + ".tmp";
  writeFileSync(tmp, JSON.stringify(content, null, 2), "utf-8");
  renameSync(tmp, DATA_PATH);
}

// ── Public API (all async) ────────────────────────────────────────────────────

export async function getContent(): Promise<SiteContent> {
  if (!isFirebaseConfigured()) return readJson();
  const doc = await getDb().collection(DOC_PATH.collection).doc(DOC_PATH.doc).get();
  if (!doc.exists) {
    // First run: seed from JSON file into Firestore
    const seed = readJson();
    await getDb().collection(DOC_PATH.collection).doc(DOC_PATH.doc).set(seed);
    return seed;
  }
  return doc.data() as SiteContent;
}

export async function writeContent(content: SiteContent): Promise<void> {
  if (!isFirebaseConfigured()) {
    writeJson(content);
    return;
  }
  await getDb().collection(DOC_PATH.collection).doc(DOC_PATH.doc).set(content);
}
