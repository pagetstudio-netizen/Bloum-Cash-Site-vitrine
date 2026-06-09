import app from "./app";
import { logger } from "./lib/logger";

// Global handlers — prevent unhandled rejections from crashing the process
process.on("uncaughtException", (err) => {
  logger.error({ err }, "uncaughtException — process kept alive");
});

process.on("unhandledRejection", (reason) => {
  logger.error({ reason }, "unhandledRejection — process kept alive");
});

const rawPort = process.env["PORT"];

// Phusion Passenger (Plesk) may provide a Unix socket path instead of a
// numeric port, or may not set PORT at all. We must handle all three cases:
//   1. Numeric string  → parse as number
//   2. Socket path     → pass the string directly to app.listen()
//   3. Not set         → fall back to 3000
let listenOn: number | string;

if (!rawPort) {
  listenOn = 3000;
} else {
  const numeric = Number(rawPort);
  listenOn = Number.isNaN(numeric) ? rawPort : numeric;
}

app.listen(listenOn, () => {
  logger.info({ listenOn }, "Server listening");
});
