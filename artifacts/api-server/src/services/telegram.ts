import TelegramBot from "node-telegram-bot-api";
import { db } from "@workspace/db";
import { siteConfigTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

let bot: TelegramBot | null = null;

async function saveChatId(chatId: number) {
  const key = "telegram_chat_id";
  const value = String(chatId);
  try {
    const [existing] = await db.select().from(siteConfigTable).where(eq(siteConfigTable.key, key));
    if (existing) {
      await db.update(siteConfigTable).set({ value, updatedAt: new Date() }).where(eq(siteConfigTable.key, key));
    } else {
      await db.insert(siteConfigTable).values({ key, value });
    }
    return true;
  } catch (err) {
    console.error("Error saving Telegram chat ID:", err);
    return false;
  }
}

async function getChatId(): Promise<number | null> {
  try {
    const [row] = await db.select().from(siteConfigTable).where(eq(siteConfigTable.key, "telegram_chat_id"));
    if (!row) return null;
    return Number(row.value);
  } catch {
    return null;
  }
}

export function initTelegramBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.log("[Telegram] TELEGRAM_BOT_TOKEN non défini — notifications désactivées");
    return;
  }

  try {
    bot = new TelegramBot(token, { polling: { interval: 2000, autoStart: true } });

    bot.on("message", async (msg) => {
      const text = (msg.text || "").toLowerCase().trim();
      const chatId = msg.chat.id;

      if (
        text.includes("salut") &&
        text.includes("toi") &&
        text.includes("bot")
      ) {
        const saved = await saveChatId(chatId);
        if (saved) {
          const groupName = msg.chat.title || "ce groupe";
          await bot!.sendMessage(
            chatId,
            `✅ Bonjour ! Je suis bien le bot Bloum Cash.\n\n` +
            `📌 Ce groupe (*${groupName}*) a été enregistré comme destinataire des notifications de contact.\n\n` +
            `Désormais, chaque message envoyé via le formulaire de contact du site sera transmis ici automatiquement.`,
            { parse_mode: "Markdown" }
          ).catch((e) => {
            console.error("[Telegram] Erreur sendMessage:", (e as Error).message);
          });
        }
      }
    });

    bot.on("polling_error", (err) => {
      const msg = (err as Error).message ?? "";
      // 409 Conflict = une autre instance tourne déjà ; on arrête ce polling proprement
      if (msg.includes("409")) {
        console.warn("[Telegram] 409 Conflict — une autre instance est active, polling arrêté.");
        bot?.stopPolling().catch(() => {});
        bot = null;
        return;
      }
      console.error("[Telegram] Polling error:", msg);
    });

    bot.on("error", (err) => {
      console.error("[Telegram] Error:", err.message);
    });

    console.log("[Telegram] Bot démarré avec succès");
  } catch (err) {
    console.error("[Telegram] Impossible de démarrer le bot:", err);
  }
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  message: string;
}) {
  if (!bot) return;

  const chatId = await getChatId();
  if (!chatId) return;

  const now = new Date().toLocaleString("fr-FR", {
    timeZone: "Africa/Abidjan",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const text =
    `👋 Bonjour !\n\n` +
    `📩 Vous avez reçu un nouveau message d'un client de *bloumcash.tg*\n\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `📋 Voici les informations :\n` +
    `━━━━━━━━━━━━━━━━━━━━\n\n` +
    `👤 Nom : ${data.name}\n` +
    `📧 Email : ${data.email}\n\n` +
    `💬 Message :\n${data.message}\n\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `⏰ Reçu le : ${now}`;

  try {
    await bot.sendMessage(chatId, text, { parse_mode: "Markdown" });
  } catch (err) {
    console.error("[Telegram] Erreur envoi notification:", (err as Error).message);
  }
}
