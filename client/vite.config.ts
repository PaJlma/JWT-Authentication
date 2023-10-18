import { defineConfig } from "vite";
import * as path from "path";

import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg?react",
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@/components": path.resolve(__dirname, "src/components/"),
      "@/scss": path.resolve(__dirname, "src/styles/"),
      "@/store": path.resolve(__dirname, "src/store/"),
      "@/assets": path.resolve(__dirname, "src/assets/"),
      "@/hooks": path.resolve(__dirname, "src/hooks/"),
    },
  },

  server: {
    port: 3000,
  },
});
