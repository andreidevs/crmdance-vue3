<template>
  <el-aside>
    <div class="app-layout">
      <sidebar /></div
  ></el-aside>
  <el-container>
    <div class="content_wrapper">
      <router-view /></div
  ></el-container>
</template>

<script setup>
import Sidebar from "@/components/sidebar/index.vue";
// import Navbar from '@/components/navbar/Navbar.vue';
</script>

<style lang="scss">
.app-layout {
  position: absolute;
}
.content_wrapper {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-left: 200px;
  padding-top: 30px;
}
</style>
