<template>
  <el-config-provider :locale="locale">
    <div id="app">
      <router-view></router-view></div
  ></el-config-provider>
</template>
<script>
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";

import ru from "element-plus/lib/locale/lang/ru";

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      locale: ru,
    };
  },
});
</script>

<style></style>
