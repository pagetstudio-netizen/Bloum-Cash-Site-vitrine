import { Router } from "express";
import { db } from "@workspace/db";
import { siteConfigTable } from "@workspace/db/schema";

const router = Router();

/**
 * GET /api/dl/apk
 * Lien de téléchargement direct et partageable pour l'APK Android.
 * Redirige vers le fichier APK si le bouton est activé et qu'un fichier existe.
 * Ce lien stable peut être partagé directement sans passer par le site.
 */
router.get("/apk", async (_req, res) => {
  try {
    const allRows = await db.select().from(siteConfigTable);
    const config: Record<string, string> = {};
    for (const row of allRows) config[row.key] = row.value;

    const enabled = config.apk_enabled === "true";
    const apkUrl = config.apk_url || "";

    if (!enabled || !apkUrl) {
      return res.status(404).json({ error: "APK non disponible" });
    }

    // Redirection vers le fichier — le navigateur déclenchera le téléchargement
    // grâce au header Content-Disposition: attachment posé par express.static
    return res.redirect(302, apkUrl);
  } catch {
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
