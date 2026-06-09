import { Router } from "express";
import { authenticator } from "otplib";
import QRCode from "qrcode";
import { db } from "@workspace/db";
import { adminUsersTable, siteConfigTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { signPreAuthToken, signAdminToken, verifyPassword } from "../lib/auth";
import { requirePreAuth, requireAdmin, type AdminRequest } from "../middleware/adminAuth";

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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email et mot de passe requis" });
  }
  try {
    const [admin] = await db.select().from(adminUsersTable).where(eq(adminUsersTable.email, email));
    if (!admin) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }
    const valid = await verifyPassword(password, admin.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }
    if (!admin.totpSecret) {
      const secret = authenticator.generateSecret();
      await db.update(adminUsersTable).set({ totpSecret: secret }).where(eq(adminUsersTable.id, admin.id));
    }
    const preAuthToken = signPreAuthToken({ adminId: admin.id, email: admin.email });
    if (!admin.totpEnabled) {
      return res.json({ requiresTOTPSetup: true, preAuthToken });
    }
    return res.json({ requiresTOTPVerify: true, preAuthToken });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/totp-setup", requirePreAuth, async (req: AdminRequest, res) => {
  const { adminId, email } = req.admin!;
  try {
    const [admin] = await db.select().from(adminUsersTable).where(eq(adminUsersTable.id, adminId));
    if (!admin?.totpSecret) {
      return res.status(400).json({ error: "Secret TOTP non trouvé" });
    }
    const otpauth = authenticator.keyuri(email, "Bloum Cash Admin", admin.totpSecret);
    const qrCode = await QRCode.toDataURL(otpauth);
    return res.json({ qrCode, secret: admin.totpSecret });
  } catch (err) {
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post("/totp-confirm", requirePreAuth, async (req: AdminRequest, res) => {
  const { adminId } = req.admin!;
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "Code requis" });
  try {
    const [admin] = await db.select().from(adminUsersTable).where(eq(adminUsersTable.id, adminId));
    if (!admin?.totpSecret) return res.status(400).json({ error: "Secret TOTP non trouvé" });
    const isValid = authenticator.verify({ token: String(code), secret: admin.totpSecret });
    if (!isValid) return res.status(401).json({ error: "Code invalide. Vérifiez votre application Google Authenticator." });
    await db.update(adminUsersTable).set({ totpEnabled: true }).where(eq(adminUsersTable.id, admin.id));
    const token = signAdminToken({ adminId: admin.id, email: admin.email });
    return res.json({ success: true, token });
  } catch (err) {
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post("/totp-verify", requirePreAuth, async (req: AdminRequest, res) => {
  const { adminId } = req.admin!;
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "Code requis" });
  try {
    const [admin] = await db.select().from(adminUsersTable).where(eq(adminUsersTable.id, adminId));
    if (!admin?.totpSecret) return res.status(400).json({ error: "TOTP non configuré" });
    const isValid = authenticator.verify({ token: String(code), secret: admin.totpSecret });
    if (!isValid) return res.status(401).json({ error: "Code invalide ou expiré" });
    const token = signAdminToken({ adminId: admin.id, email: admin.email });
    return res.json({ success: true, token });
  } catch (err) {
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/me", requireAdmin, (req: AdminRequest, res) => {
  return res.json({ email: req.admin!.email });
});

router.get("/config", requireAdmin, async (_req, res) => {
  try {
    const rows = await db.select().from(siteConfigTable);
    const config: Record<string, string> = { ...DEFAULT_CONFIG };
    for (const row of rows) config[row.key] = row.value;
    return res.json(config);
  } catch {
    return res.json(DEFAULT_CONFIG);
  }
});

router.put("/config", requireAdmin, async (req, res) => {
  const updates: Record<string, string> = req.body;
  if (!updates || typeof updates !== "object") {
    return res.status(400).json({ error: "Corps de requête invalide" });
  }
  try {
    for (const [key, value] of Object.entries(updates)) {
      if (typeof value !== "string") continue;
      const [existing] = await db.select().from(siteConfigTable).where(eq(siteConfigTable.key, key));
      if (existing) {
        await db.update(siteConfigTable).set({ value, updatedAt: new Date() }).where(eq(siteConfigTable.key, key));
      } else {
        await db.insert(siteConfigTable).values({ key, value });
      }
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
});

export default router;
