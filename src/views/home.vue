<template>
  <el-button @click="pushRoute('register')">Регистрация</el-button>
  <el-button @click="pushRoute('login')">Вход</el-button>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const pushRoute = async (name) => {
  router.push({ name });
};
</script>

<style></style>
