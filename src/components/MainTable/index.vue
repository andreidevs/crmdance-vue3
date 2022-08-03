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

        <div v-if="item.widget?.name === 'tags'">
          <el-tag
            v-for="(el, index) in scope.row[item.dataView]"
            :key="index"
            style="margin-left: 5px"
            :effect="item.widget.effect || 'plain'"
            :type="
              item.widget.colors
                ? arrayRandElement(item.widget.colors)
                : item.widget.color
                  ? item.widget.color
                  : ''
            "
            disable-transitions
          >
            {{ el }}
          </el-tag>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-button-group>
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
import { arrayRandElement } from "../../utils";
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
