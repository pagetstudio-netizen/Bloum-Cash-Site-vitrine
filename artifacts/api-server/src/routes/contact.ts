import { Router } from "express";
import { sendContactNotification } from "../services/telegram";

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return res.status(400).json({ error: "Format invalide" });
  }

  const trimmed = {
    name: String(name).trim().slice(0, 200),
    email: String(email).trim().slice(0, 200),
    message: String(message).trim().slice(0, 2000),
  };

  sendContactNotification(trimmed).catch(() => {});

  return res.json({ success: true });
});

export default router;
