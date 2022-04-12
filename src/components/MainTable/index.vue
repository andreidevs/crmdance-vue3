<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column
      v-for="(item, index) in columns"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width ? item.width : ''"
    />
  </el-table>
  <el-button-group>
    <el-button @click="prev" type="primary" :icon="ArrowLeft"
      >Предыдущая страница</el-button
    >
    <el-button @click="next" type="primary">
      Следующаяя страница <el-icon class="el-icon--right"><ArrowRight /></el-icon>
    </el-button>
  </el-button-group>
</template>

<script setup>
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { toRefs, onMounted, watch, computed } from "vue";

const emit = defineEmits(["next", "prev", "start"]);
const props = defineProps({
  columns: Array,
  tableData: Array,
});

let { tableData } = toRefs(props);

onMounted(() => {
  emit("start");
});

const next = () => {
  emit("next");
  setTimeout(() => {
    console.log("dtaa", tableData);
  }, 1000);
};

const prev = () => {
  emit("prev");
  // setTimeout(() => {
  //   console.log("dtaa", props);
  // }, 1000);
};
</script>

<style></style>
