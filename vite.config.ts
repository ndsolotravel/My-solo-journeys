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
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              if (id.includes("@supabase/supabase-js") || id.includes("supabase-js")) {
                return "supabase";
              }
              if (id.includes("framer-motion")) {
                return "framer-motion";
              }
              if (id.includes("gsap") || id.includes("scrolltrigger")) {
                return "gsap";
              }
              if (id.includes("leaflet")) {
                return "leaflet";
              }
              if (id.includes("recharts") || id.includes("d3") || id.includes("echarts")) {
                return "recharts";
              }
              if (id.includes("react-markdown") || id.includes("remark") || id.includes("rehype")) {
                return "react-markdown";
              }
              if (id.includes("lucide-react")) {
                return "lucide-react";
              }
              if (id.includes("@tanstack/react-query")) {
                return "tanstack-query";
              }
              if (id.includes("@tanstack/react-router")) {
                return "tanstack-router";
              }
            }
          },
        },
      },
    },
  };
});
