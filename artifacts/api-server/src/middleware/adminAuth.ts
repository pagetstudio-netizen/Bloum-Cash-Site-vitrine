import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/auth";

export interface AdminRequest extends Request {
  admin?: { adminId: string; phase: string; email: string };
}

export function requireAdmin(req: AdminRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Non autorisé" });
  }
  const token = authHeader.slice(7);
  try {
    const payload = verifyToken(token);
    if (payload.phase !== "admin") {
      return res.status(401).json({ error: "Token invalide" });
    }
    req.admin = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Session expirée, veuillez vous reconnecter" });
  }
}

export function requirePreAuth(req: AdminRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Non autorisé" });
  }
  const token = authHeader.slice(7);
  try {
    const payload = verifyToken(token);
    if (payload.phase !== "pre-auth") {
      return res.status(401).json({ error: "Token invalide" });
    }
    req.admin = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Session expirée" });
  }
}
