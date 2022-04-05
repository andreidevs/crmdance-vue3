<template>
  <el-menu default-active="1" class="" router>
    <el-menu-item
      :route="{ name: item.routeName }"
      v-for="(item, index) in menuItems"
      :key="index"
      :index="item.name"
      >{{ item.name }}</el-menu-item
    >
  </el-menu>
</template>

<script setup>
import { reactive } from "vue";
import { items } from "./menuItems";

let menuItems = reactive(items);
</script>
