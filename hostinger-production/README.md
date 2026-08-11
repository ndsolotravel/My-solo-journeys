# NDSOLOTRAVEL Hostinger Production Deployment Guide

## Overview
This directory contains the production build deployment package for **NDSOLOTRAVEL** (TanStack Start + Nitro SSR Node.js server).

## Hostinger Node.js Configuration

- **Node.js Version**: `>= 20.x`
- **Application Startup File**: `server/index.mjs`
- **Start Command**: `npm start` (or `node server/index.mjs`)

## Steps to Deploy on Hostinger

1. **Upload Files**: Upload the contents of `hostinger-production/` to your domain's application directory on Hostinger.
2. **Environment Variables**: Add the following keys in Hostinger's Node.js Environment Variable Settings:
   - `VITE_SUPABASE_PROJECT_ID`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_URL`
   - `SUPABASE_PROJECT_ID`
   - `SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_URL`
3. **Run Application**: Start the Node.js application from the Hostinger Control Panel.
