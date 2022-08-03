<template>
  <el-button-group class="ml-4">
    <el-button
      v-for="(item, index) in items"
      :key="index"
      type="primary"
      plain
    >
      {{ item }}
    </el-button>
  </el-button-group>
</template>

<script setup>
import { ref } from "vue";

const items = ref(["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]);
</script>

<style></style>
