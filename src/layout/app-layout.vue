<template>
  <div class="app-layout">
    <sidebar />
  </div>

  <div class="content_wrapper">
    <router-view />
  </div>
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
  padding-left: 300px;
  padding-top: 30px;
}
</style>
