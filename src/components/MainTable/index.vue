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
          <span v-if="!item.childView">{{ scope.row[item.dataView] ? getViewFromFilter(scope.row[item.dataView], item ) : '-' }}</span>
          <span v-else>{{ scope.row[item.dataView] ? getViewFromFilter(scope.row[item.dataView][item.childView], item) : '-' }}</span>
        </div>

        <WidgetSwitch
          v-else
          :key="index"
          :item="item"
          :elements="scope.row[item.dataView]"
          :scope="scope.row"
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
import { onMounted, ref } from "vue";
import WidgetSwitch from "./widgets/WidgetSwitch";
import { getViewFromFilter } from "./utils/viewFilters";

const props = defineProps({
  columns: {
    type: Array,
    require: true,
    default: ()=> []
  },

  data: {
    type: Object,
    require: true,
    default: ()=> {}
  },
  getData: {
    type: Function,
    require: true,
    default: ()=> {}
  },
});
let loading = ref(false);
// const getIconComponent = (name) => {
//   return () => import(`../../../node_modules/element-plus/icons-vue/dist/es/${name}.mjs`);
// };


const next = async () => {
  loading.value = true;
  await props.getData('next');
  loading.value = false;
};

const prev = async () => {
  loading.value = true;
  await props.getData('prev');
  loading.value = false;
};

onMounted(async () => {
  loading.value = true;
  await props.getData();
  loading.value = false;
});
</script>

<style></style>
