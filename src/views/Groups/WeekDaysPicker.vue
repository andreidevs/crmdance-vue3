<template>
  <el-button-group class="ml-4">
    <el-button type="primary" plain v-for="(item, index) in items" :key="index"
      >{{ item }}
    </el-button>
  </el-button-group>
</template>

<script setup>
import { ref } from "vue";

const items = ref(["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]);
</script>

<style></style>
