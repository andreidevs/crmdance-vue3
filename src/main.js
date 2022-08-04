import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import { createPinia } from "pinia";
import "./assets/scss/index.scss";

import "element-plus/dist/index.css";
import { maska } from "maska";

const app = createApp(App);

app.directive("maska", maska);
app.use(router);
app.use(createPinia());

app.mount("#app");
