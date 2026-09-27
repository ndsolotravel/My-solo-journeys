import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
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
      TanStackRouterVite({ autoCodeSplitting: true }),
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
      // NOTE: an explicit `manualChunks` map was previously used here to name
      // vendor chunks. It was removed because it does not control what ends up
      // on the critical path (only static imports do), and it actively made
      // things worse: Rollup hoisted `clsx` — a leaf dependency of recharts
      // that is also used by the eagerly-loaded `cn()` helper — into the
      // recharts chunk, which pulled the whole 380 kB recharts chunk into the
      // initial page load on every route.
      //
      // Heavy libraries are now kept out of the initial graph by making their
      // importers dynamic (React.lazy / import()) at the source, which is the
      // only reliable way to control the critical path. Rollup then emits them
      // as async chunks automatically.
      rollupOptions: {
        output: {
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("framer-motion") || id.includes("motion-dom")) {
                return "vendor-motion";
              }
              if (id.includes("@supabase")) {
                return "vendor-supabase";
              }
              if (id.includes("recharts") || id.includes("d3-")) {
                return "vendor-recharts";
              }
            }
          },
        },
      },
    },
  };
});
