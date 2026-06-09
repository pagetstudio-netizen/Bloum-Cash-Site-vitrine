/**
 * Production startup file for Plesk Node.js
 * Application startup file: server.cjs
 */
(async () => {
  await import("./artifacts/api-server/dist/index.mjs");
})().catch((err) => {
  console.error("Failed to start Bloum Cash server:", err);
  process.exit(1);
});
