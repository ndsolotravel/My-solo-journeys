import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = Number(env.PORT || process.env.PORT) || 3000;

  return {
    envPrefix: ["VITE_", "NEXT_PUBLIC_"],
    server: {
      port,
      strictPort: true,
      host: true,
      watch: {
        ignored: ["**/.output/**", "**/.nitro/**"],
      },
    },
    preview: {
      port,
    },
    plugins: [
      tailwindcss(),
      tsconfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        server: { entry: "./src/server.ts" },
        serverFns: { disableCsrfMiddlewareWarning: true },
      }),
      nitro({
        preset: "node-server",
        compressPublicAssets: true,
        routeRules: {
          "/_build/assets/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
          "/assets/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
          "/fonts/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
          "/images/**": { headers: { "cache-control": "public, max-age=2592000" } },
          "/favicon.ico": { headers: { "cache-control": "public, max-age=86400" } },
        },
      }),
      react(),
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});
