<template>
  <el-table v-loading="loading" :data="data.data" stripe style="width: 100%">
    <el-table-column
      v-for="(item, index) in columns"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width ? item.width : ''"
    />
  </el-table>
  <el-button-group>
    <el-button :disabled="!data.prev" @click="prev" type="primary" :icon="ArrowLeft"
      >Предыдущая страница</el-button
    >
    <el-button :disabled="!data.next" @click="next" type="primary">
      Следующаяя страница <el-icon class="el-icon--right"><ArrowRight /></el-icon>
    </el-button>
  </el-button-group>
</template>

<script setup async>
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { toRefs, onMounted, ref } from "vue";

const props = defineProps({
  columns: Array,
  data: Object,
  getData: Function,
  nextData: Function,
  prevData: Function,
});
const loading = ref(false);

const next = async () => {
  loading.value = true;
  await props.nextData();
  loading.value = false;
};

const prev = async () => {
  loading.value = true;
  await props.prevData();
  loading.value = false;
};

onMounted(async () => {
  loading.value = true;
  await props.getData();
  loading.value = false;
});
</script>

<style></style>
