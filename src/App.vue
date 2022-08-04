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
import { useRoomStore } from "@/stores/room";
import { onBeforeMount } from "vue";
import { useUserStore } from "./stores/user";

const locale = ru;
const router = useRouter();
const userStore = useUserStore();
const roomStore = useRoomStore();

onBeforeMount(()=>{
  userStore.loadUser();
})


supabase.auth.onAuthStateChange((event) => {
  if (event === "SIGNED_IN") {
    userStore.loadRedirectRoute();
    roomStore.getRoomList();
  } else if (event === "SIGNED_OUT") {
    userStore.clearUser();
  }
});

userStore.$onAction(({ name, store, after }) => {
  if (name === "loadRedirectRoute") {
    after(async () => {
      const redirectRoute = store.redirectRoute;

      if (redirectRoute) {
        await router.isReady();
        await router.replace(redirectRoute);
        userStore.clearRedirectRoute();
      }
    });
  }
});
</script>

<style></style>
