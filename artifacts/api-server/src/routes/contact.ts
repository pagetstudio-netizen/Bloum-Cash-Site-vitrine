import { Router } from "express";
import { sendContactNotification } from "../services/telegram";

const router = Router();

// ── Regex de validation ───────────────────────────────────────────────────────
const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
// Noms : lettres (latin + accents + tiret + espace), 2–100 chars
const NAME_REGEX = /^[\p{L}\p{M}' \-]{2,100}$/u;

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  // ── 1. Présence ──────────────────────────────────────────────────────────
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  // ── 2. Types stricts ─────────────────────────────────────────────────────
  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return res.status(400).json({ error: "Format invalide" });
  }

  // ── 3. Troncature préventive avant validation ────────────────────────────
  const trimmedName    = name.trim().slice(0, 100);
  const trimmedEmail   = email.trim().toLowerCase().slice(0, 254);
  const trimmedMessage = message.trim().slice(0, 2000);

  // ── 4. Validation format ─────────────────────────────────────────────────
  if (!NAME_REGEX.test(trimmedName)) {
    return res.status(400).json({ error: "Nom invalide (caractères non autorisés ou trop court)" });
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return res.status(400).json({ error: "Adresse email invalide" });
  }

  if (trimmedMessage.length < 10) {
    return res.status(400).json({ error: "Message trop court (minimum 10 caractères)" });
  }

  // ── 5. Envoi notification (non bloquant) ─────────────────────────────────
  sendContactNotification({
    name: trimmedName,
    email: trimmedEmail,
    message: trimmedMessage,
  }).catch(() => {});

  return res.json({ success: true });
});

export default router;
