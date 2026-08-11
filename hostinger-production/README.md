# NDSOLOTRAVEL Hostinger Production Deployment Guide

## Overview
This directory contains the production build deployment package for **NDSOLOTRAVEL** (TanStack Start + Nitro SSR Node.js server).

## Hostinger Node.js Configuration

- **Node.js Version**: `>= 20.x`
- **Application Root**: `/` (or domain app root)
- **Build Command**: `npm run build`
- **Start Command**: `npm start` (which runs `node server.js`)
- **Entry Point**: `server.js` or `.output/server/index.mjs`

## Environment Variables required in Hostinger:

- `NEXT_PUBLIC_SUPABASE_URL`: `https://mqoybarqgzzvillignbr.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `sb_publishable_quAPYI3nYdGK50erwAPnfg_YJWBq2u5`
- (Optional) `SUPABASE_SERVICE_ROLE_KEY`: for privileged server-side operations
