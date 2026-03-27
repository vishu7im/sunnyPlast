import { createHmac } from "crypto";

const SECRET = process.env.ADMIN_SECRET || "sunnyplaste-dev-secret-change-in-production";

export function signToken(payload: string): string {
  const hmac = createHmac("sha256", SECRET);
  hmac.update(payload);
  return `${payload}.${hmac.digest("hex")}`;
}

export function verifyToken(token: string): boolean {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;
  const payload = token.slice(0, lastDot);
  const expected = signToken(payload);
  return token === expected;
}

export function createAuthToken(username: string): string {
  const payload = `${username}:${Date.now()}`;
  return signToken(payload);
}

export function hashPassword(password: string): string {
  const hmac = createHmac("sha256", SECRET);
  hmac.update(password);
  return hmac.digest("hex");
}
