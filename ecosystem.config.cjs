/**
 * PM2 Ecosystem Config — used by Plesk or manual PM2 deployment
 * Start with: pm2 start ecosystem.config.cjs
 * Restart with: pm2 restart bloum-cash
 */
module.exports = {
  apps: [
    {
      name: "bloum-cash",
      script: "./artifacts/api-server/dist/index.mjs",
      interpreter: "node",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
