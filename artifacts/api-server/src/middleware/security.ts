import { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// ─── Helmet : en-têtes de sécurité HTTP ───────────────────────────────────────
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xFrameOptions: { action: "deny" },
  xContentTypeOptions: true,
  strictTransportSecurity: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  xXssProtection: false,
  permittedCrossDomainPolicies: { permittedPolicies: "none" },
});

// ─── Rate limiter global (toutes les routes /api) ─────────────────────────────
export const globalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de requêtes. Réessayez dans quelques minutes." },
  skip: (req) => req.ip === "127.0.0.1" || req.ip === "::1",
});

// ─── Rate limiter strict (login + contact) ────────────────────────────────────
export const strictRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de tentatives. Veuillez patienter 15 minutes." },
});

// ─── Rate limiter config publique ─────────────────────────────────────────────
export const configRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de requêtes." },
});

// ─── Blocage des bots malveillants par User-Agent ─────────────────────────────
const BAD_BOTS = [
  "sqlmap", "nikto", "masscan", "zgrab", "nmap",
  "dirbuster", "gobuster", "wfuzz", "hydra",
  "python-requests", "python-urllib", "go-http-client",
  "curl/", "wget/", "libwww-perl", "scrapy", "mechanize",
  "semrush", "ahrefsbot", "dotbot", "mj12bot",
  "bytespider", "petalbot", "gptbot", "amazonbot",
  "claudebot", "google-extended", "ccbot",
];

export function blockBadBots(req: Request, res: Response, next: NextFunction): void {
  const ua = (req.headers["user-agent"] ?? "").toLowerCase();
  if (!ua || BAD_BOTS.some((bot) => ua.includes(bot))) {
    res.status(403).json({ error: "Accès refusé" });
    return;
  }
  next();
}

// ─── Blocage des chemins sensibles ────────────────────────────────────────────
const BLOCKED_PATHS = [
  /\/\.replit/i,
  /\/\.env/i,
  /\/\.git/i,
  /\/\.github/i,
  /\/\.ssh/i,
  /\/\.aws/i,
  /\/node_modules/i,
  /\/package\.json$/i,
  /\/package-lock\.json$/i,
  /\/pnpm-lock\.yaml$/i,
  /\/tsconfig/i,
  /\/\.npmrc/i,
  /\/\.pnpmfile/i,
  /\/docker/i,
  /\/proc\//i,
  /\/etc\/passwd/i,
  /\/etc\/shadow/i,
  /\/wp-admin/i,
  /\/wp-login/i,
  /\/phpMyAdmin/i,
  /\/phpmyadmin/i,
  /\/adminer/i,
  /\/setup\.php/i,
  /\/config\.php/i,
  /\/\.DS_Store/i,
  /\/web\.config/i,
  /\/xmlrpc\.php/i,
];

export function blockSensitivePaths(req: Request, res: Response, next: NextFunction): void {
  const url = req.path.toLowerCase();
  if (BLOCKED_PATHS.some((pattern) => pattern.test(url))) {
    res.status(403).json({ error: "Accès refusé" });
    return;
  }
  next();
}

// ─── Suppression des en-têtes qui révèlent la stack ──────────────────────────
export function removeStackHeaders(_req: Request, res: Response, next: NextFunction): void {
  res.removeHeader("X-Powered-By");
  res.removeHeader("Server");
  next();
}

// ─── Validation de la méthode HTTP ───────────────────────────────────────────
const ALLOWED_METHODS = ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"];
export function validateMethod(req: Request, res: Response, next: NextFunction): void {
  if (!ALLOWED_METHODS.includes(req.method)) {
    res.status(405).json({ error: "Méthode non autorisée" });
    return;
  }
  next();
}

// ─── Limite la taille des corps de requête ───────────────────────────────────
// Les uploads multipart (APK) sont gérés par multer avec sa propre limite.
export function rejectLargePayloads(req: Request, res: Response, next: NextFunction): void {
  const contentType = req.headers["content-type"] ?? "";
  if (contentType.startsWith("multipart/form-data")) {
    next();
    return;
  }
  const contentLength = parseInt(req.headers["content-length"] ?? "0", 10);
  if (contentLength > 50_000) {
    res.status(413).json({ error: "Requête trop volumineuse" });
    return;
  }
  next();
}
