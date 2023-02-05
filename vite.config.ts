import path from "node:path";
import { defineConfig } from "vite";
import VueMacros from "unplugin-vue-macros/vite";
import Vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import Layouts from "vite-plugin-vue-layouts";
import Pages from "vite-plugin-pages";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue({
          reactivityTransform: true,
        }),
      },
    }),
    Unocss(),
    Layouts(),
    Pages(),
    Components({
      dts: "./src/components.d.ts",
      resolvers: [
        ElementPlusResolver(),
      ],
      types: [
        {
          from: "vue-router",
          names: ["RouterLink", "RouterView"],
        },
      ],
    }),
    AutoImport({
      imports: [
        "vue",
        "vue/macros",
        "vue-router",
        "pinia",
        {
          "@tauri-apps/api/tauri": [
            "invoke",
            "convertFileSrc",
            "transformCallback",
          ],
        },
      ],
      resolvers: [ElementPlusResolver()],
      dirs: [
        "./src/composables/*",
      ],
      dts: "./src/auto-imports.d.ts",
    }),
  ],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    target: ["es2021", "chrome100", "safari13"],
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/components"),
    },
  },
});
