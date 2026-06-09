import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import router from "./routes";
import { logger } from "./lib/logger";
import { initTelegramBot } from "./services/telegram";
import { runSetup } from "./lib/setup";
import {
  securityHeaders,
  globalRateLimit,
  blockBadBots,
  blockSensitivePaths,
  removeStackHeaders,
  validateMethod,
  rejectLargePayloads,
} from "./middleware/security";
import { strictRateLimit, configRateLimit } from "./middleware/security";

const app: Express = express();

// ─── 1. Supprimer les en-têtes qui révèlent la stack ─────────────────────────
app.use(removeStackHeaders);

// ─── 2. En-têtes de sécurité HTTP (Helmet) ───────────────────────────────────
app.use(securityHeaders);

// ─── 3. CORS restreint : domaines de production ───────────────────────────────
// ALLOWED_ORIGINS permet d'ajouter des domaines supplémentaires via variable d'env
// ex: ALLOWED_ORIGINS=https://wendysapp.sbs,https://www.wendysapp.sbs
const extraOrigins = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const allowedOrigins = process.env.NODE_ENV === "production"
  ? ["https://bloumcash.com", "https://www.bloumcash.com", ...extraOrigins]
  : [/localhost/, /127\.0\.0\.1/, /replit\.dev/, /replit\.app/];

app.use(cors({
  origin: allowedOrigins as any,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
  optionsSuccessStatus: 200,
}));

// ─── 4. Bloquer les méthodes HTTP non standard ───────────────────────────────
app.use(validateMethod);

// ─── 5. Bloquer les chemins sensibles (.replit, .env, .git, etc.) ────────────
app.use(blockSensitivePaths);

// ─── 6. Bloquer les bots malveillants par User-Agent ─────────────────────────
app.use("/api", blockBadBots);

// ─── 7. Logs HTTP ─────────────────────────────────────────────────────────────
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return { id: req.id, method: req.method, url: req.url?.split("?")[0] };
      },
      res(res) {
        return { statusCode: res.statusCode };
      },
    },
  }),
);

// ─── 8. Parsers avec limite de taille ────────────────────────────────────────
app.use(rejectLargePayloads);
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));

// ─── 9. Rate limiting global sur /api ─────────────────────────────────────────
app.use("/api", globalRateLimit);

// ─── 10. Rate limiters spécifiques ───────────────────────────────────────────
app.use("/api/admin/login", strictRateLimit);
app.use("/api/admin/verify-totp", strictRateLimit);
app.use("/api/contact", strictRateLimit);
app.use("/api/config", configRateLimit);

// ─── 11. Routes API ───────────────────────────────────────────────────────────
app.use("/api", router);

// ─── 12. Fichiers statiques + SPA (production uniquement) ────────────────────
if (process.env.NODE_ENV === "production") {
  const __dirname_prod = path.dirname(fileURLToPath(import.meta.url));
  const staticPath =
    process.env.STATIC_PATH ||
    path.resolve(__dirname_prod, "../../bloum-cash/dist/public");

  app.use(
    express.static(staticPath, {
      setHeaders(res, filePath) {
        // Bloquer l'accès aux fichiers sensibles servis par static
        const blocked = [".env", ".replit", ".git", "package.json", "tsconfig"];
        if (blocked.some((b) => filePath.includes(b))) {
          res.status(403).end();
        }
        // Cache long pour les assets avec hash
        if (/\/assets\//.test(filePath)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    }),
  );

  app.use((_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

// ─── 13. Gestionnaire d'erreurs global ───────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error(err, "Unhandled error");
  res.status(500).json({ error: "Erreur interne du serveur" });
});

runSetup();
initTelegramBot();

export default app;
