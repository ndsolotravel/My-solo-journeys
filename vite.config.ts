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
    },
    preview: {
      port,
    },
    plugins: [
      tailwindcss(),
      tsconfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        server: { entry: "./src/server.ts" },
      }),
      nitro({
        preset: "node-server",
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
