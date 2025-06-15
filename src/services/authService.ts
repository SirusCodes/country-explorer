export async function authenticate(
  username: string,
  password: string,
): Promise<boolean> {
  // Might do more complex authentication in a real app
  return username === "user" && password === "password";
}
