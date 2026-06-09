import { Router } from "express";
import { db } from "@workspace/db";
import { siteConfigTable } from "@workspace/db/schema";

const router = Router();

const DEFAULT_CONFIG: Record<string, string> = {
  whatsapp_number: "+228 XX XX XX XX",
  support_email: "support@bloumcash.tg",
  contact_email: "contact@bloumcash.tg",
  legal_email: "legal@bloumcash.tg",
  privacy_email: "privacy@bloumcash.com",
  facebook_url: "#",
  facebook_enabled: "true",
  instagram_url: "#",
  instagram_enabled: "true",
  twitter_url: "#",
  twitter_enabled: "true",
  linkedin_url: "#",
  linkedin_enabled: "true",
  youtube_url: "#",
  youtube_enabled: "true",
  appstore_url: "#",
  appstore_label: "App Store",
  appstore_state: "active",
  playstore_url: "#",
  playstore_label: "Google Play",
  playstore_state: "active",
};

router.get("/", async (_req, res) => {
  try {
    const rows = await db.select().from(siteConfigTable);
    const config: Record<string, string> = { ...DEFAULT_CONFIG };
    for (const row of rows) config[row.key] = row.value;
    return res.json(config);
  } catch {
    return res.json(DEFAULT_CONFIG);
  }
});

export { DEFAULT_CONFIG };
export default router;
