import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      // En production, l'absence de JWT_SECRET est une erreur fatale
      throw new Error(
        "[Auth] FATAL: JWT_SECRET n'est pas défini. " +
        "Définissez cette variable d'environnement avant de démarrer le serveur."
      );
    }
    // En développement, avertissement explicite (jamais silencieux)
    console.warn(
      "[Auth] ⚠ JWT_SECRET non défini — utilisation d'un secret temporaire de développement. " +
      "NE PAS utiliser en production."
    );
    return "dev-only-secret-not-for-production-" + process.pid;
  }
  if (secret.length < 32) {
    console.warn("[Auth] ⚠ JWT_SECRET trop court (< 32 caractères) — utilisez au moins 32 caractères aléatoires.");
  }
  return secret;
}

const JWT_SECRET = getJwtSecret();

export function signPreAuthToken(payload: { adminId: string; email: string }) {
  return jwt.sign({ ...payload, phase: "pre-auth" }, JWT_SECRET, { expiresIn: "10m", algorithm: "HS256" });
}

export function signAdminToken(payload: { adminId: string; email: string }) {
  return jwt.sign({ ...payload, phase: "admin" }, JWT_SECRET, { expiresIn: "8h", algorithm: "HS256" });
}

export function verifyToken(token: string): { adminId: string; phase: string; email: string } {
  // Forcer l'algorithme attendu pour prévenir la confusion d'algorithme (CVE "alg:none")
  return jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }) as {
    adminId: string;
    phase: string;
    email: string;
  };
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
