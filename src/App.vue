<template>
  <el-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from "element-plus";
import ru from "element-plus/lib/locale/lang/ru";
import { useRouter } from "vue-router";

import { supabase } from "@/supabase";
import { useAuthStore } from "@/stores/auth";
import { useRoomStore } from "@/stores/room";
import { onBeforeMount } from "vue";
const locale = ru;
const router = useRouter();
const authStore = useAuthStore();
const roomStore = useRoomStore();

onBeforeMount(()=>{
  authStore.loadUser();
})


supabase.auth.onAuthStateChange((event) => {
  if (event === "SIGNED_IN") {
    authStore.loadRedirectRoute();
    roomStore.getRoomList();
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
