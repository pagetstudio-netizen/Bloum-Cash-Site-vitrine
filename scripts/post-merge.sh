#!/bin/bash
# ============================================================
# Script exécuté automatiquement après un merge/pull sur le
# serveur (Plesk "Deploy now" ou Replit post-merge).
# ============================================================
set -e

echo "[deploy] Installation des dépendances…"
pnpm install --frozen-lockfile

echo "[deploy] Build frontend (Vite)…"
BASE_PATH=/ pnpm --filter @workspace/bloum-cash run build

echo "[deploy] Build API server (esbuild)…"
pnpm --filter @workspace/api-server run build

echo "[deploy] Migration base de données…"
pnpm --filter @workspace/db run push 2>/dev/null || true

echo "[deploy] ✓ Déploiement terminé."
