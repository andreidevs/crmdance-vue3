<template>
  <MegaMenu class="ml-4 mt-4" :model="itemsMenu" orientation="vertical" />
</template>

<script setup>
import { useGroupsStore } from "../store/groups";
import { useUserStore } from "../store/user";
import { reactive, ref } from "vue";

const userStore = useUserStore();

const logout = async () => {
  await userStore.logoutUser();
};

const itemsMenu = [
  {
    label: "Группы",
    icon: "pi pi-fw pi-clone",
    to: "groups",
  },
  {
    label: "Ученики",
    icon: "pi pi-fw pi-users",
    to: "students",
  },
  {
    label: "Ежедневный отчет",
    icon: "pi pi-fw pi-check-square",
    to: "daily",
  },
  {
    label: "Статистика",
    icon: "pi pi-fw pi-chart-bar",
    to: "statistic",
  },
];
</script>

<style></style>
