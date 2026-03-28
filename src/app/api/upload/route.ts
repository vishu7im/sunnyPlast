import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { COOKIE_NAME } from "@/lib/constants";
import { isFirebaseConfigured, getBucket } from "@/lib/firebase";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Use JPG, PNG, WebP or GIF." }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Max 5MB." }, { status: 400 });
    }

    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    if (isFirebaseConfigured()) {
      // Upload to Firebase Storage
      const bucket = getBucket();
      const fileRef = bucket.file(`uploads/${filename}`);
      await fileRef.save(buffer, { contentType: file.type });
      await fileRef.makePublic();
      const url = `https://storage.googleapis.com/${bucket.name}/uploads/${filename}`;
      return NextResponse.json({ url });
    } else {
      // Fallback: save to /public/uploads/ (local dev)
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      mkdirSync(uploadsDir, { recursive: true });
      writeFileSync(path.join(uploadsDir, filename), buffer);
      return NextResponse.json({ url: `/uploads/${filename}` });
    }
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
