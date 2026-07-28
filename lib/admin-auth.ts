import { timingSafeEqual } from "node:crypto";

/** Constant-time comparison for the private owner token. */
export function adminAuthorized(req: Request): boolean {
  const expected = process.env.ADMIN_TOKEN;
  const header = req.headers.get("authorization");
  if (!expected || !header?.startsWith("Bearer ")) return false;

  const supplied = header.slice(7);
  const expectedBuffer = Buffer.from(expected);
  const suppliedBuffer = Buffer.from(supplied);
  if (expectedBuffer.length !== suppliedBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, suppliedBuffer);
}
