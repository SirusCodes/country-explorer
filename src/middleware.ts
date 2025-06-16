import { NextRequest, NextResponse } from "next/server";

// NOTE: Server-side middleware cannot check localStorage. All route protection must be done client-side.
export function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|login|$).*)"],
};
