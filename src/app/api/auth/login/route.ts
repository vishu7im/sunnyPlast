import { NextRequest, NextResponse } from "next/server";
import { createAuthToken } from "@/lib/auth";
import { COOKIE_NAME } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const expectedUser = process.env.ADMIN_USERNAME || "admin";
    const expectedPass = process.env.ADMIN_PASSWORD || "SunnyPlaste2025!";

    if (username !== expectedUser || password !== expectedPass) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = createAuthToken(username);

    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
