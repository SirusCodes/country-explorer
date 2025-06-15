import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/favicon.ico",
  "/_next",
  "/api/login",
  "/api/logout",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Allow public paths
  if (
    PUBLIC_PATHS.some(
      (path) => pathname === path || pathname.startsWith(path + "/"),
    )
  ) {
    return NextResponse.next();
  }
  // Check auth cookie
  const authCookie = req.cookies.get("countryExplorerAuth");
  if (authCookie?.value === "1") {
    return NextResponse.next();
  }
  // Redirect unauthenticated users to login
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|login|$).*)"],
};
