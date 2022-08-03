<template>
  <el-menu
    default-active="1"
    class=""
    router
  >
    <el-menu-item
      v-for="(item, index) in menuItems"
      :key="index"
      :route="{ name: item.routeName }"
      :index="item.name"
    >
      {{ item.name }}
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { reactive } from "vue";
import { items } from "./menuItems";

let menuItems = reactive(items);
</script>
