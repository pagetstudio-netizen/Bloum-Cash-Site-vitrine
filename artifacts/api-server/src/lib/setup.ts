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

    // Seed default admin account if none exists
    const { rowCount } = await client.query(
      "SELECT 1 FROM admin_users WHERE email = $1",
      ["Sendyapp228@gmail.com"]
    );

    if (!rowCount || rowCount === 0) {
      const passwordHash = await bcrypt.hash("AAbb11##", 12);
      await client.query(
        `INSERT INTO admin_users (email, password_hash, totp_enabled)
         VALUES ($1, $2, false)
         ON CONFLICT (email) DO NOTHING`,
        ["Sendyapp228@gmail.com", passwordHash]
      );
      console.log("[Setup] Compte admin créé : Sendyapp228@gmail.com ✓");
    } else {
      // Make sure password is correct
      const passwordHash = await bcrypt.hash("AAbb11##", 12);
      await client.query(
        `UPDATE admin_users SET password_hash = $1 WHERE email = $2`,
        [passwordHash, "Sendyapp228@gmail.com"]
      );
      console.log("[Setup] Compte admin mis à jour ✓");
    }

    console.log("[Setup] Base de données Supabase prête ✓");
  } catch (err) {
    console.error("[Setup] Erreur initialisation base :", err);
  } finally {
    client.release();
  }
}
