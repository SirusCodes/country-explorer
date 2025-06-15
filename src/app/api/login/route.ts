import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/services/authService";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const valid = await authenticate(username, password);
  if (valid) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("countryExplorerAuth", "1", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return res;
  }

  return NextResponse.json(
    { success: false, error: "Invalid credentials" },
    { status: 401 },
  );
}
