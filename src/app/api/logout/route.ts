import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ success: true });
  res.cookies.set("countryExplorerAuth", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
  return res;
}
