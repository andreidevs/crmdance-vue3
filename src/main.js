import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import { createPinia } from "pinia";
import "./assets/scss/index.css";
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'




const app = createApp(App);


app.use(router);
app.use(createPinia());

app.use(Buefy)
// PRIME VUE INIT COMPONENTS




app.mount("#app");
