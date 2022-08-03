<template>
  <el-table
    v-loading="loading"
    :data="data.data"
    stripe
    lazy
    style="width: 100%"
  >
    <el-table-column
      v-for="(item, index) in columns"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :sortable="item.sortable"
      :type="item.type || ''"
      :width="item.width ? item.width : ''"
    >
      <template
        v-if="!item.type"
        #default="scope"
      >
        <div
          v-if="!item.widget"
          class="flex items-center"
        >
          <!-- <el-icon v-if="item.icon">
            <component :is="getIconComponent(item.icon)"
          /></el-icon> -->
          <span v-if="!item.childView">{{ scope.row[item.dataView] }}</span>
          <span v-else>{{ scope.row[item.dataView][item.childView] }}</span>
        </div>

        <WidgetSwitch
          v-else
          :key="index"
          :item="item"
          :elements="scope.row[item.dataView]"
        />

      </template>
    </el-table-column>
  </el-table>
  <el-button-group class="mt-2">
    <el-button
      :disabled="!data.prev"
      type="primary"
      :icon="ArrowLeft"
      @click="prev"
    >
      Предыдущая страница
    </el-button>
    <el-button
      :disabled="!data.next"
      type="primary"
      @click="next"
    >
      Следующаяя страница <el-icon class="el-icon--right">
        <ArrowRight />
      </el-icon>
    </el-button>
  </el-button-group>
</template>

<script setup async>
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { toRefs, onMounted, ref, computed } from "vue";
import WidgetSwitch from "./widgets/WidgetSwitch"
const props = defineProps({
  columns: Array,
  data: Object,
  getData: Function,
});
let loading = $ref(false);
// const getIconComponent = (name) => {
//   return () => import(`../../../node_modules/element-plus/icons-vue/dist/es/${name}.mjs`);
// };

const next = async () => {
  loading = true;
  await props.getData('next');
  loading = false;
};

const prev = async () => {
  loading = true;
  await props.getData('prev');
  loading = false;
};

onMounted(async () => {
  loading = true;
  await props.getData();
  loading = false;
});
</script>

<style></style>
