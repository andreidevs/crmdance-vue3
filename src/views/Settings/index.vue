<template>
  <el-button @click="pushRoute('add')" />
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const pushRoute = (name) => {
  router.push({ name });
};
</script>

<style></style>
