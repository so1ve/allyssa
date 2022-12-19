import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHashHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";

import "uno.css";
import "@unocss/reset/tailwind.css";
import App from "./App.vue";

const routes = setupLayouts(generatedRoutes);
const pinia = createPinia();
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const app = createApp(App);
app.use(pinia)
  .use(router)
  .mount("#app");

// Disable context menu in production
if (!import.meta.env.TAURI_DEBUG) {
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });

  document.addEventListener("selectstart", (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });
}
