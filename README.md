# Shofe

Logistics platform for drivers and fleet owners. Drivers register and get verified, fleet owners post jobs against their vehicles, drivers apply, and the platform tracks daily kilometres covered. Future phases extend into ehailing, courier, and commuter rides.

## Stack

- **Web** — Nuxt 4 + Tailwind + shadcn-vue + Pinia (`apps/web`) — fleet owner & admin dashboard, deployed to Vercel.
- **Mobile** — Ionic Vue + Capacitor + Pinia (`apps/mobile`) — driver app for iOS/Android.
- **Backend** — Appwrite (auth, database, storage, functions). Schema-as-code in `infra/appwrite`.
- **Shared** — `packages/types` (domain types), `packages/appwrite-client` (typed SDK wrapper).

## Layout

```
apps/
  web/        Nuxt 4 — fleet owner & admin
  mobile/     Ionic Vue — driver app
packages/
  types/              Shared domain types
  appwrite-client/    Typed wrapper around the Appwrite SDK
infra/
  appwrite/   Schema-as-code (collections, attributes, indexes, buckets)
```

## Getting started

```bash
cp .env.example .env            # fill in APPWRITE_PROJECT_ID + APPWRITE_API_KEY
pnpm install
pnpm appwrite:sync              # provisions the Appwrite project (one-off)
pnpm dev:web                    # http://localhost:3000
pnpm dev:mobile                 # http://localhost:8100
```

## Deploy (web)

Vercel project — set Root Directory to `apps/web`, Build Command to `pnpm --filter @shofe/web build`, and configure the `NUXT_PUBLIC_APPWRITE_*` env vars.

## Roadmap

1. **Phase 1 (this scaffold):** auth + roles, driver registration & verification, fleet & vehicle management, job posting + applications.
2. **Phase 2:** Phone-GPS tracking via Capacitor Geolocation, daily-km aggregation per driver/job.
3. **Phase 3+:** Ehailing, courier, commuter rides, payments, push notifications.
