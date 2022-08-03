<template>
  <div class="m-4">
    <el-button
      type="success"
      plain
      @click="$router.push({ name: 'groups_create' })"
    >
      Создать
    </el-button>
    <MainFilter
      :columns="filterColumns"
      @update="getGroups"
    />
    <MainTable
      :columns="tableColumns"
      :data="groupsData"
      :get-data="getGroups"
    />
  </div>
</template>

<script setup>
import MainTable from "@/components/MainTable/index.vue";
import MainFilter from "@/components/MainFilter/index.vue";
import { useGroupsStore } from "../../stores/groups";
import { ref } from "vue";

const groupStore = useGroupsStore();

let groupsData = ref([]);

let tableColumns = [
  {
    type: "selection",
  },
  {
    label: "Название",
    prop: "title",
    sortable: true,
    dataView: "title",
    width: 150,
  },
  {
    label: "Время",
    prop: "time",
    sortable: true,
    icon: "timer",
    dataView: "time",
    width: 100,
  },
  {
    label: "Места",
    prop: "count",
    sortable: true,
    dataView: "count",
    width: 100,
  },
  {
    label: "Дни недели",
    prop: "weekdays",
    sortable: false,
    dataView: "weekdays",
    width: 150,
    widget: {
      type: "Tags",
      effect: "dark",
      colors: ["success", "info", "warning"],
    },
  },
  {
    label: "Тренер",
    prop: "coach",
    sortable: true,
    dataView: "coach",
    childView: "name",
    width: 150,
  },
  {
    label: "Тип",
    prop: "type",
    sortable: true,
    dataView: "type",
    childView: "title",
    width: 100,
  },
  {
    label: "Зал",
    prop: "room",
    sortable: true,
    dataView: "room",
    childView: "name",
    width: 100,
  },
];

const filterOptions = ref({
  groupTypes: [],
});
const filterColumns = [
  {
    title: "Тип",
    key: "groups",
    widget: {
      type: "Select",
      options: filterOptions.value["groupTypes"],
      view: "title",
      value: "id",
      multi: true,
      placeholder: "Тип тренировки",
      endpoint: { tableName: "groupTypes" },
    },
    prop: "type",
  },
  {
    key: "groups",
    title: "Название группы",
    widget: {
      type: "Input",
      view: "title",
      placeholder: "Название группы",
    },
    prop: "title",
  },
];

const getGroups = async (page) => {
  if(page === 'next') {
    groupStore.page += 1;
  }else if(page === 'prev'){
    groupStore.page -= 1;
  } else {
    groupStore.page = 1;
  }
  groupsData.value = await groupStore.getGroups();
};


</script>

<style></style>
