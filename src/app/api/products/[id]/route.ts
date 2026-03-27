import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, writeAllProducts } from "@/lib/products";
import { verifyToken } from "@/lib/auth";
import { COOKIE_NAME } from "@/lib/constants";

interface Params { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  const products = getAllProducts();
  const product = products.find((p) => p.id === params.id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const products = getAllProducts();
    const idx = products.findIndex((p) => p.id === params.id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await req.json();
    products[idx] = { ...products[idx], ...body, id: params.id, updatedAt: new Date().toISOString() };
    writeAllProducts(products);

    return NextResponse.json({ product: products[idx] });
  } catch {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const products = getAllProducts();
    const filtered = products.filter((p) => p.id !== params.id);
    if (filtered.length === products.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    writeAllProducts(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
