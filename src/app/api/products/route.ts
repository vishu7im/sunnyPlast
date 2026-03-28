export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, createProduct } from "@/lib/products";
import { verifyToken } from "@/lib/auth";
import { COOKIE_NAME } from "@/lib/constants";
import { slugify } from "@/lib/slugify";
import { v4 as uuidv4 } from "uuid";
import type { ProductCategory } from "@/types";

export async function GET(req: NextRequest) {
  try {
    let products = await getAllProducts();
    const category = req.nextUrl.searchParams.get("category") as ProductCategory | null;
    const featured = req.nextUrl.searchParams.get("featured");

    if (category) products = products.filter((p) => p.category === category);
    if (featured === "true") products = products.filter((p) => p.isFeatured);

    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ error: "Failed to read products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const now = new Date().toISOString();
    const newProduct = {
      ...body,
      id: uuidv4(),
      slug: body.slug || slugify(body.name),
      createdAt: now,
      updatedAt: now,
    };

    await createProduct(newProduct);
    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
