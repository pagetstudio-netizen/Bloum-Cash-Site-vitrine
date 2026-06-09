import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "bloumcash-fallback-secret-change-me";

export function signPreAuthToken(payload: { adminId: string; email: string }) {
  return jwt.sign({ ...payload, phase: "pre-auth" }, JWT_SECRET, { expiresIn: "10m" });
}

export function signAdminToken(payload: { adminId: string; email: string }) {
  return jwt.sign({ ...payload, phase: "admin" }, JWT_SECRET, { expiresIn: "8h" });
}

export function verifyToken(token: string): { adminId: string; phase: string; email: string } {
  return jwt.verify(token, JWT_SECRET) as { adminId: string; phase: string; email: string };
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
