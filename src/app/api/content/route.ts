import { NextRequest, NextResponse } from "next/server";
import { getContent, writeContent } from "@/lib/content";
import { verifyToken } from "@/lib/auth";
import { COOKIE_NAME } from "@/lib/constants";

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existing = await getContent();
    const patch = await req.json();
    const merged = deepMerge(existing, patch);
    await writeContent(merged);
    return NextResponse.json(merged);
  } catch {
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}

function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const result = { ...target };
  for (const key in source) {
    const sv = source[key];
    const tv = target[key];
    if (sv && typeof sv === "object" && !Array.isArray(sv) && tv && typeof tv === "object") {
      (result as Record<string, unknown>)[key] = deepMerge(tv as object, sv as object);
    } else if (sv !== undefined) {
      (result as Record<string, unknown>)[key] = sv;
    }
  }
  return result;
}
