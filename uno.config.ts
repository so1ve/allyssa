import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts } from "unocss";

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons(),
    presetWebFonts(),
  ],
  theme: {
    colors: {
      primary: "#026BFF",
    },
  },
});
