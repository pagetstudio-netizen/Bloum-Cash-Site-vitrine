import { Router } from "express";
import { authenticator } from "otplib";
import QRCode from "qrcode";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { db } from "@workspace/db";
import { adminUsersTable, siteConfigTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { signPreAuthToken, signAdminToken, verifyPassword } from "../lib/auth";
import { requirePreAuth, requireAdmin, type AdminRequest } from "../middleware/adminAuth";

const __dirname_here = path.dirname(fileURLToPath(import.meta.url));
// En dev  : import.meta.url → src/routes/admin.ts  → remonter 2 niveaux jusqu'à api-server/
// En prod : esbuild bundle tout dans dist/index.mjs → remonter 1 niveau jusqu'à api-server/
// On détecte l'environnement par le nom du dossier courant.
const API_SERVER_ROOT =
  path.basename(__dirname_here) === "dist"
    ? path.resolve(__dirname_here, "..")          // prod : dist/ → api-server/
    : path.resolve(__dirname_here, "../..");       // dev  : src/routes/ → api-server/
const UPLOADS_DIR = path.join(API_SERVER_ROOT, "uploads", "apk");
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const apkStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || ".apk";
    cb(null, `bloum-cash${ext}`);
  },
});

const APK_ALLOWED_EXTENSIONS = [".apk", ".aab"];
const APK_ALLOWED_MIMETYPES = [
  "application/vnd.android.package-archive",
  "application/octet-stream",
];

const apkUpload = multer({
  storage: apkStorage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype.toLowerCase();
    if (APK_ALLOWED_EXTENSIONS.includes(ext) && APK_ALLOWED_MIMETYPES.includes(mime)) {
      cb(null, true);
    } else {
      cb(new Error("Seuls les fichiers .apk ou .aab sont acceptés"));
    }
  },
});

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
  apk_enabled: "false",
  apk_url: "",
  apk_label: "Télécharger l'APK (Android)",
  apk_size: "",
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

// ─── Upload APK ───────────────────────────────────────────────────────────────
router.post("/apk-upload", requireAdmin, (req, res) => {
  apkUpload.single("apk")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message ?? "Erreur upload" });
    }
    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ error: "Aucun fichier reçu" });
    }
    const apkUrl = `/uploads/apk/${file.filename}`;
    const apkSize = (file.size / (1024 * 1024)).toFixed(1) + " MB";
    // Persist url + size in site_config
    try {
      for (const [key, value] of [["apk_url", apkUrl], ["apk_size", apkSize]] as [string, string][]) {
        const [existing] = await db.select().from(siteConfigTable).where(eq(siteConfigTable.key, key));
        if (existing) {
          await db.update(siteConfigTable).set({ value, updatedAt: new Date() }).where(eq(siteConfigTable.key, key));
        } else {
          await db.insert(siteConfigTable).values({ key, value });
        }
      }
    } catch {
      // non-fatal — file is uploaded
    }
    return res.json({ success: true, url: apkUrl, size: apkSize, filename: file.filename });
  });
});

// ─── Supprimer APK ────────────────────────────────────────────────────────────
router.delete("/apk", requireAdmin, async (_req, res) => {
  try {
    // Remove the physical file if it exists
    const files = fs.readdirSync(UPLOADS_DIR).filter((f) => /\.(apk|aab|zip)$/i.test(f));
    for (const f of files) {
      fs.rmSync(path.join(UPLOADS_DIR, f), { force: true });
    }
    // Clear config keys
    for (const key of ["apk_url", "apk_size", "apk_enabled"]) {
      const [existing] = await db.select().from(siteConfigTable).where(eq(siteConfigTable.key, key));
      const value = key === "apk_enabled" ? "false" : "";
      if (existing) {
        await db.update(siteConfigTable).set({ value, updatedAt: new Date() }).where(eq(siteConfigTable.key, key));
      } else {
        await db.insert(siteConfigTable).values({ key, value });
      }
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Erreur lors de la suppression" });
  }
});

// Whitelist stricte des clés modifiables via le panel admin.
// Toute clé absente de cette liste est silencieusement ignorée.
const ALLOWED_CONFIG_KEYS = new Set([
  "whatsapp_number",
  "support_email",
  "contact_email",
  "legal_email",
  "privacy_email",
  "facebook_url", "facebook_enabled",
  "instagram_url", "instagram_enabled",
  "twitter_url", "twitter_enabled",
  "linkedin_url", "linkedin_enabled",
  "youtube_url", "youtube_enabled",
  "appstore_url", "appstore_label", "appstore_state",
  "playstore_url", "playstore_label", "playstore_state",
  "apk_enabled", "apk_label",
  "transfer_fee_percent",
  "min_transfer_amount",
  "max_transfer_amount",
  "fee_notice_days",
]);

// Validateurs par clé — retournent true si la valeur est acceptable
const CONFIG_VALIDATORS: Record<string, (v: string) => boolean> = {
  apk_enabled: (v) => v === "true" || v === "false",
  facebook_enabled: (v) => v === "true" || v === "false",
  instagram_enabled: (v) => v === "true" || v === "false",
  twitter_enabled: (v) => v === "true" || v === "false",
  linkedin_enabled: (v) => v === "true" || v === "false",
  youtube_enabled: (v) => v === "true" || v === "false",
  appstore_state: (v) => ["active", "soon", "disabled"].includes(v),
  playstore_state: (v) => ["active", "soon", "disabled"].includes(v),
  support_email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || v === "",
  contact_email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || v === "",
  legal_email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || v === "",
  privacy_email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || v === "",
  appstore_url: (v) => v === "#" || v === "" || /^https?:\/\/.+/.test(v),
  playstore_url: (v) => v === "#" || v === "" || /^https?:\/\/.+/.test(v),
  facebook_url: (v) => v === "#" || v === "" || /^https?:\/\/.+/.test(v),
  instagram_url: (v) => v === "#" || v === "" || /^https?:\/\/.+/.test(v),
  twitter_url: (v) => v === "#" || v === "" || /^https?:\/\/.+/.test(v),
  linkedin_url: (v) => v === "#" || v === "" || /^https?:\/\/.+/.test(v),
  youtube_url: (v) => v === "#" || v === "" || /^https?:\/\/.+/.test(v),
};

router.put("/config", requireAdmin, async (req, res) => {
  const updates: Record<string, string> = req.body;
  if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
    return res.status(400).json({ error: "Corps de requête invalide" });
  }
  try {
    for (const [key, value] of Object.entries(updates)) {
      // Ignorer les clés non autorisées (mass-assignment protection)
      if (!ALLOWED_CONFIG_KEYS.has(key)) continue;
      if (typeof value !== "string") continue;

      // Tronquer pour éviter les dénis de service sur les champs texte
      const sanitized = value.trim().slice(0, 500);

      // Validation métier par clé
      const validator = CONFIG_VALIDATORS[key];
      if (validator && !validator(sanitized)) {
        return res.status(400).json({ error: `Valeur invalide pour la clé : ${key}` });
      }

      const [existing] = await db.select().from(siteConfigTable).where(eq(siteConfigTable.key, key));
      if (existing) {
        await db.update(siteConfigTable).set({ value: sanitized, updatedAt: new Date() }).where(eq(siteConfigTable.key, key));
      } else {
        await db.insert(siteConfigTable).values({ key, value: sanitized });
      }
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
});

export default router;
