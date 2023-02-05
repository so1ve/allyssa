import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHashHistory } from "vue-router";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";

import App from "./App.vue";
import "uno.css";
import "element-plus/es/components/message/style/css";
import "./reset.css";

// Disable context menu in production
if (!import.meta.env.TAURI_DEBUG) {
  const disableContextMenu: (this: Document, ev: Event) => any = (e) => {
    e.preventDefault();
    return false;
  };
  document.addEventListener("contextmenu", disableContextMenu, { capture: true });
  document.addEventListener("selectstart", disableContextMenu, { capture: true });
}

const routes = setupLayouts(generatedRoutes);
const pinia = createPinia();
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const app = createApp(App);
app.use(pinia)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount("#app");
