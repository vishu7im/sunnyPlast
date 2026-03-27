import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/constants";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin/* (except /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
