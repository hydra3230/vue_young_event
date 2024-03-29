import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import routerTool from "@/router";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-persistedstate-plugin";

import App from './App.vue'

const app = createApp(App);
const pinia = createPinia();
const persist = createPersistedState();
pinia.use(persist);
app.use(pinia);
app.use(ElementPlus);
app.use(routerTool);
app.mount('#app')