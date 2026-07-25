import { Router } from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { db } from "@workspace/db";
import { siteConfigTable } from "@workspace/db/schema";

const router = Router();

// Résolution du dossier uploads/apk compatible dev (src/routes/) et prod (dist/)
const __dirname_here = path.dirname(fileURLToPath(import.meta.url));
const API_SERVER_ROOT =
  path.basename(__dirname_here) === "dist"
    ? path.resolve(__dirname_here, "..")          // prod : dist/ → api-server/
    : path.resolve(__dirname_here, "../..");       // dev  : src/routes/ → api-server/
const UPLOADS_DIR = path.join(API_SERVER_ROOT, "uploads", "apk");

/**
 * GET /api/dl/apk
 * Lien de téléchargement direct et partageable pour l'APK Android.
 * Sert le fichier APK directement (sans redirect) pour contourner les
 * configurations nginx/Plesk qui ne proxient pas /uploads vers Express.
 */
router.get("/apk", async (_req, res) => {
  try {
    const allRows = await db.select().from(siteConfigTable);
    const config: Record<string, string> = {};
    for (const row of allRows) config[row.key] = row.value;

    const enabled = config.apk_enabled === "true";
    const apkUrl = config.apk_url || ""; // ex: /uploads/apk/app-1234.apk

    if (!enabled || !apkUrl) {
      return res.status(404).json({ error: "APK non disponible" });
    }

    // Extraire le nom du fichier depuis l'URL stockée en base
    const filename = path.basename(apkUrl);
    const filePath = path.join(UPLOADS_DIR, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Fichier APK introuvable" });
    }

    // Forcer le téléchargement directement via Express
    // — évite le double-hop nginx qui renverrait index.html sur Plesk
    res.setHeader("Content-Type", "application/vnd.android.package-archive");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("X-Content-Type-Options", "nosniff");
    return res.sendFile(filePath);
  } catch {
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
