import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import { createPinia } from "pinia";
import "./assets/scss/index.css";
import PrimeVue from "primevue/config";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.use(PrimeVue, { ripple: true });
// PRIME VUE INIT COMPONENTS
import "primevue/resources/themes/lara-light-teal/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css";

app.component("Dialog", Dialog);

app.component("Button", Button);

app.component("InputText", InputText);

app.component("Password ", Password);

app.component("Divider ", Divider);

app.component("Calendar ", Calendar);

app.component("Dropdown", Dropdown);

// import Divider from "primevue/password";
// app.component("Divider ", Divider);

// import Divider from "primevue/password";
// app.component("Divider ", Divider);

// import Divider from "primevue/password";
// app.component("Divider ", Divider);

// import Divider from "primevue/password";
// app.component("Divider ", Divider);

app.mount("#app");
