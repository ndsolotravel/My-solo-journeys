# NDSOLOTRAVEL Hostinger Production Deployment Guide

## Overview
This directory contains the production build deployment package for **NDSOLOTRAVEL** (TanStack Start + Nitro SSR Node.js server).

## Hostinger Node.js Configuration

- **Node.js Version**: `>= 20.x`
- **Application Root**: `/` (or domain app root)
- **Build Command**: `npm run build`
- **Start Command**: `npm start` (or `node server.cjs`)
- **Entry Point**: `server.cjs` or `.output/server/index.mjs`

## Environment Variables required in Hostinger:

- `NEXT_PUBLIC_SUPABASE_URL`: `https://mqoybarqgzzvillignbr.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `sb_publishable_quAPYI3nYdGK50erwAPnfg_YJWBq2u5`
- (Optional) `SUPABASE_SERVICE_ROLE_KEY`: for privileged server-side operations
- `CONTACT_NOTIFICATION_EMAIL`: `contact@ndsolotravel.com` — where contact-form and newsletter notifications are delivered
- `RESEND_API_KEY`: Resend API key (from https://resend.com/api-keys) — required for notification emails
- `RESEND_FROM_EMAIL`: `NDSOLOTRAVEL Contact <contact@ndsolotravel.com>` — sender address

> **Important — Resend domain verification:** Notification emails are sent through Resend using the
> `ndsolotravel.com` sender domain. The domain MUST be verified in Resend (https://resend.com/domains)
> or Resend rejects delivery with `403 The ndsolotravel.com domain is not verified`. If the domain
> status is `failed`/`pending`, add the DNS records Resend displays (DKIM TXT on
> `resend._domainkey.ndsolotravel.com`, MX and SPF on `send.ndsolotravel.com`) at your DNS provider,
> wait for propagation, then re-run verification in Resend. The app itself only needs the three
> variables above — no SMTP credentials are required.
