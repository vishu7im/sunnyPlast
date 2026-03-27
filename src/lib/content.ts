import { readFileSync, writeFileSync, renameSync } from "fs";
import path from "path";
import type { SiteContent } from "@/types";

const DATA_PATH = path.join(process.cwd(), "data", "content.json");

export function getContent(): SiteContent {
  const raw = readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export function writeContent(content: SiteContent): void {
  const tmpPath = DATA_PATH + ".tmp";
  writeFileSync(tmpPath, JSON.stringify(content, null, 2), "utf-8");
  renameSync(tmpPath, DATA_PATH);
}
