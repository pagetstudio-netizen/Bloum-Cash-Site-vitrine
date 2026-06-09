---
name: Admin panel architecture
description: How the admin panel, API server, and site config system are wired together
---

# Admin Panel

## Services
- API server runs on port 3001 via `tsx watch` (dev) in `artifacts/api-server/`
- Frontend runs on port 5000 (Vite dev server) in `artifacts/bloum-cash/`
- Vite proxies `/api/*` → `http://localhost:3001`
- Workflow "Start application" starts both: `(PORT=3001 pnpm --filter @workspace/api-server run dev &) && PORT=5000 BASE_PATH=/ pnpm --filter @workspace/bloum-cash run dev`

## Auth flow
- Admin: Sendyapp228@gmail.com / AAbb11## (hashed in DB, never stored in code)
- POST /api/admin/login → returns preAuthToken (10 min JWT, phase: "pre-auth")
- First login: GET /api/admin/totp-setup (show QR) → POST /api/admin/totp-confirm → full token
- Subsequent: POST /api/admin/totp-verify → full token (phase: "admin", 8h)
- Full token stored in localStorage under "adminToken"
- preAuthToken stored in sessionStorage under "preAuthToken"

## DB tables
- `admin_users`: id (uuid), email, password_hash, totp_secret, totp_enabled, created_at
- `site_config`: id (serial), key (unique), value, updated_at

## Site config keys
Contact: whatsapp_number, support_email, contact_email, legal_email, privacy_email
Social: {facebook|instagram|twitter|linkedin|youtube}_{url|enabled}
Store: {appstore|playstore}_{url|label|state} — state: "active"|"disabled"|"soon"

## Frontend
- SiteConfigContext at `artifacts/bloum-cash/src/contexts/SiteConfigContext.tsx`
- Fetches GET /api/config on mount, falls back to hardcoded defaults if API unavailable
- Admin panel at /admin, /admin/totp-setup, /admin/totp-verify, /admin/dashboard
- Hidden dot in footer (tiny button below copyright) navigates to /admin
- All pages (Contact, MentionsLegales, Conditions, Confidentialite, Footer, StoreButtons) read from context

**Why:** The site config needs to be globally editable without code deploys; the API+DB approach ensures changes are immediately visible to all visitors.
