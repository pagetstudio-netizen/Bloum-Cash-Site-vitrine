import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/auth";

export interface AdminRequest extends Request {
  admin?: { adminId: string; phase: string; email: string };
}

export function requireAdmin(req: AdminRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Non autorisé" });
    return;
  }
  const token = authHeader.slice(7);
  try {
    const payload = verifyToken(token);
    if (payload.phase !== "admin") {
      res.status(401).json({ error: "Token invalide" });
      return;
    }
    req.admin = payload;
    next();
  } catch {
    res.status(401).json({ error: "Session expirée, veuillez vous reconnecter" });
  }
}

export function requirePreAuth(req: AdminRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Non autorisé" });
    return;
  }
  const token = authHeader.slice(7);
  try {
    const payload = verifyToken(token);
    if (payload.phase !== "pre-auth") {
      res.status(401).json({ error: "Token invalide" });
      return;
    }
    req.admin = payload;
    next();
  } catch {
    res.status(401).json({ error: "Session expirée" });
  }
}
