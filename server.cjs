/**
 * Production startup file for Plesk Node.js
 * Application startup file: server.cjs
 */

// Global handlers to prevent unhandled rejections/exceptions from crashing the process
process.on("uncaughtException", (err) => {
  console.error("[server.cjs] uncaughtException:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("[server.cjs] unhandledRejection:", reason);
});

(async () => {
  await import("./artifacts/api-server/dist/index.mjs");
})().catch((err) => {
  console.error("Failed to start Bloum Cash server:", err);
  process.exit(1);
});
