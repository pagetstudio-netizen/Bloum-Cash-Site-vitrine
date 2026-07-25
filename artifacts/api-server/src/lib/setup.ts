import { pool } from "@workspace/db";
import bcrypt from "bcryptjs";

export async function runSetup() {
  const client = await pool.connect();
  try {
    // Create tables with all columns (IF NOT EXISTS — safe to run multiple times)
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        totp_secret TEXT,
        totp_enabled BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    // Add missing columns in case table existed with different schema
    await client.query(`ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS totp_secret TEXT;`);
    await client.query(`ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS totp_enabled BOOLEAN NOT NULL DEFAULT FALSE;`);
    await client.query(`ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT NOW();`);
    await client.query(`ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS password_hash TEXT;`);

    // Drop NOT NULL on any extra columns we don't control so insert works
    await client.query(`ALTER TABLE admin_users ALTER COLUMN full_name DROP NOT NULL;`).catch(() => {});

    await client.query(`
      CREATE TABLE IF NOT EXISTS site_config (
        id SERIAL PRIMARY KEY,
        key TEXT UNIQUE NOT NULL,
        value TEXT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    // ── Compte admin ──────────────────────────────────────────────────────────
    // Les identifiants sont lus depuis les variables d'environnement.
    // Le mot de passe n'est JAMAIS réinitialisé automatiquement au démarrage :
    // le compte est créé une seule fois ; après, l'admin gère ses credentials.
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn(
        "[Setup] ⚠ ADMIN_EMAIL ou ADMIN_PASSWORD non définis — " +
        "aucun compte admin ne sera créé automatiquement. " +
        "Définissez ces variables d'environnement sur le serveur."
      );
    } else {
      const { rowCount } = await client.query(
        "SELECT 1 FROM admin_users WHERE email = $1",
        [adminEmail]
      );

      if (!rowCount || rowCount === 0) {
        // Création initiale uniquement — jamais de mise à jour automatique
        const passwordHash = await bcrypt.hash(adminPassword, 12);
        await client.query(
          `INSERT INTO admin_users (email, password_hash, totp_enabled)
           VALUES ($1, $2, false)
           ON CONFLICT (email) DO NOTHING`,
          [adminEmail, passwordHash]
        );
        console.log(`[Setup] Compte admin créé : ${adminEmail} ✓`);
      } else {
        // Compte déjà présent — on ne touche jamais au mot de passe
        console.log(`[Setup] Compte admin existant détecté : ${adminEmail} ✓`);
      }
    }

    console.log("[Setup] Base de données prête ✓");
  } catch (err) {
    console.error("[Setup] Erreur initialisation base :", err);
  } finally {
    client.release();
  }
}
