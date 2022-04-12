<template>
  <el-config-provider :locale="locale">
    <div id="app">
      <router-view></router-view></div
  ></el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from "element-plus";
import ru from "element-plus/lib/locale/lang/ru";
import { useRouter } from "vue-router";

import { supabase } from "@/supabase";
import { useAuthStore } from "@/stores/auth";
const locale = ru;
const router = useRouter();
const authStore = useAuthStore();

authStore.loadUser();

supabase.auth.onAuthStateChange((event) => {
  if (event === "SIGNED_IN") {
    authStore.loadUser();
    authStore.loadRedirectRoute();
  } else if (event === "SIGNED_OUT") {
    authStore.clearUser();
  }
});

authStore.$onAction(({ name, store, after }) => {
  if (name === "loadRedirectRoute") {
    after(async () => {
      const redirectRoute = store.redirectRoute;

      if (redirectRoute) {
        await router.isReady();
        await router.replace(redirectRoute);
        authStore.clearRedirectRoute();
      }
    });
  }
});
</script>

<style></style>
