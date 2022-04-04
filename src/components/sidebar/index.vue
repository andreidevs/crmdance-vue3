<template>
  <va-card class="sidebar_main ml-2 mt-4" gradient>
    <va-card-title>CRMDance v0.1</va-card-title>

    <va-card-actions align="stretch" vertical>
      <va-button
        v-for="(item, index) in menuItems"
        :key="index"
        :rounded="false"
        gradient
        :color="item.routeName === currentRoute ? 'warning' : 'primary'"
        class="sidebar_button"
        @click="pushRoute(item.routeName)"
        >{{ item.name }}
      </va-button>
    </va-card-actions>
  </va-card>
</template>

<script>
import { reactive, ref, inject, computed, nextTick } from "vue";
import { items } from "./menuItems";
import { useRouter } from "vue-router";

export default {
let menuItems = reactive(items);

const router = useRouter();

const currentRoute = computed(() => router.currentRoute.value.name);

const pushRoute = (name) => {
  try {
    router.push({ name });
  } catch (e) {
    nextTick(() => {
      $vaToast.init({ message: "Роут не существует", color: "warning" });
    });
  }
}
return {pushRoute, currentRoute, menuItems}
}
</script>

<style scoped>
.sidebar_main {
  width: 250px;
}
.sidebar_button {
}
</style>
