<template>
  <div class="el-input el-input__inner el-input--suffix">
    <el-tag

      class="ml-2"
      type="info"
    >
      1111
    </el-tag>
    <el-button
      size="small"
      :icon="Edit"
      @click="showDrawer = true"
    />
  </div>
  <el-drawer
    v-model="showDrawer"
    :title="title"
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
    />
  </el-drawer>
</template>

<script setup>
import { computed, ref, toRefs } from "vue";
import MainTable from "@/components/MainTable";
import { getTable } from "../../apis";
import { Edit } from "@element-plus/icons-vue";

const props = defineProps({
  value: {
    type: [String, Number],
    default: ()=> ""
  },
  title: {
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
  dataTableOptions: {
    type: Object,
    default: () => {},
    require: true
  },
})
const showDrawer = ref(false);

const selectedValue = computed({
  get(){
    return props.value
  },
  set(value){
    emit('input', value)
  }
})

const {title, dataTableOptions, } = toRefs(props)
const emit = defineEmits(['input'])
const {tableColumns, filterColumns, tableName, select} = dataTableOptions.value

const tableData = ref([])

const getData = async (page)=>{
  if(page === 'next') {
    page += 1;
  }else if(page === 'prev'){
    page -= 1;
  } else {
    page = 1;
  }
  tableData.value = await getTable({
    tableName,
    select,
    pagination: true,
    page
  })
}

</script>