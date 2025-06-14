// src/services/authService.ts
// Server-side authentication logic (mocked)

import { cookies } from "next/headers";

export async function authenticate(
  username: string,
  password: string
): Promise<boolean> {
  // Only valid credentials: user / password
  return username === "user" && password === "password";
}

export async function isAuthenticated(): Promise<boolean> {
  // Check for the auth cookie
  const cookieStore = await cookies();
  return cookieStore.get("countryExplorerAuth")?.value === "1";
}
