<template>
  <div>
    <div class="relative flex">
      <el-select
        v-model="selectedValue"
        :placeholder="title"
        collapse-tags
        collapse-tags-tooltip
        style="min-width: 210px ;"
        :multiple="multiple"
        suffix-icon

        filterable
        class="cursor-pointer"
        @click="showDrawer = true"
      >
        <el-option
          v-for="(el, index) in selectOptions"
          :key="index"
          :label="el.title"
          :value="el.id"
        />
      </el-select>

      <el-button
        class="select-btn"
        size="small"
        :icon="Edit"
        @click="showDrawer = true"
      />
    </div>

    <el-drawer
      v-model="showDrawer"
      :title="drawerTitle"
      size="70%"
      lock-scroll
    >
      <MainFilter
        :columns="filterColumns"
        @update="getData"
      />
      <MainTable
        :columns="tableColumns"
        :data="tableData"
        :get-data="getData"
        selectable
        :multiple-selectable="multiple"
        @select="selectData"
      />
      <template
        v-if="multiple"
        #footer
      >
        <el-button :disabled="!selectedValue.length">
          Выбрать <span
            v-if="selectedValue.length"
            class="ml-1"
          >({{ selectedValue.length }})</span>
        </el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs } from "vue";
import MainTable from "@/components/MainTable";
import { getTable } from "../../apis";
import { Edit } from "@element-plus/icons-vue";

const props = defineProps({
  value: {
    type: [ String, Number, Array ],
    default: () => ""
  },
  title: {
    type: String,
    default: ""
  },
 drawerTitle: {
    type: String,
    default: ""
  },
  tableName: {
    type: String,
    default: ""
  },
  select: {
    type: String,
    default: "*"
  },
  multiple: {
    type: Boolean,
    default: false
  },
  dataTableOptions: {
    type: Object,
    default: () => {
    },
    require: true
  }
});
const showDrawer = ref(false);
const tableData = ref([]);
const selectOptions = ref([]);
const selectedValue = ref([]);

const { dataTableOptions, multiple } = toRefs(props);
const emit = defineEmits([ "input", "change" ]);
const { tableColumns, filterColumns, tableName, select } = dataTableOptions.value;

onMounted(() => {
  selectedValue.value = props.value;
  if(multiple.value) {
    tableColumns.unshift({
      type: "selection",
    });
  }
});

const getData = async (page) => {
  if (page === "next") {
    page += 1;
  } else if (page === "prev") {
    page -= 1;
  } else {
    page = 1;
  }
  tableData.value = await getTable({
    tableName,
    select,
    pagination: true,
    page
  });
};


const selectData = (value) => {
  selectOptions.value = multiple.value ? value : [value];
  selectedValue.value = multiple.value  ? value.map(el => el.id) : value.id;
  emit("input", selectedValue.value);
  emit('change', selectOptions.value)
};

</script>

<style lang="scss" scoped>
:global(.el-drawer__header) {
  margin-bottom: 0;
  font-weight: bold;
  padding: 10px 20px;
  border-bottom: 1px solid rgb(229, 231, 235);
}

:global(.el-drawer__body) {
  padding: 15px;
}

.select-btn {
  position: absolute;
  z-index: 5;
  top: 4px;
  right: 5px;
}


</style>