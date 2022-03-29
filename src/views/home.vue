<template>
  <h1>Home</h1>
  <p>{{ userStore.userData?.email }}</p>
  <Button @click="logout">Выйти</Button>
</template>

<script setup>
import { useUserStore } from "../store/user";
const userStore = useUserStore();

const logout = async () => {
  await userStore.logoutUser();
};
</script>

<style></style>
