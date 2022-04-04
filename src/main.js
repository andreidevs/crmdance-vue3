import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import { createPinia } from "pinia";
import "./assets/scss/index.css";

import { VuesticPlugin } from 'vuestic-ui' // <-
import { ToastInstall } from 'vuestic-ui' // <-

import 'vuestic-ui/dist/vuestic-ui.css' // <-



const app = createApp(App);



app.use(VuesticPlugin)

app.use(router);
app.use(createPinia());


app.mount("#app");
