<template>
  <div class="m-4">
    <el-button type="success" plain @click="$router.push({ name: 'groups_create' })"
      >Создать</el-button
    >
    <MainFilter :columns="filterColumns" @update="getGroups" />
    <MainTable
      :columns="tableColumns"
      :data="groupsData"
      :getData="getGroups"
      :nextData="getNextGroup"
      :prevData="getPrevGroup"
    />
  </div>
</template>

<script setup>
import MainTable from "@/components/MainTable/index.vue";
import MainFilter from "@/components/MainFilter/index.vue";
import { useGroupsStore } from "../../stores/groups";
import { onMounted, reactive, ref } from "vue";
const groupStore = useGroupsStore();

let groupsData = $ref([]);

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
      name: "tags",
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

const filterOptions = $ref({
  groupTypes: [],
});
const filterColumns = [
  {
    title: "Тип",
    key: "groups",
    widget: {
      type: "Select",
      options: filterOptions["groupTypes"],
      view: "title",
      value: "id",
      placeholder: "Тип тренировки",
      endpoint: { tableName: "groupTypes" },
    },
    prop: "type",
  },
  {
    key: "groups",
    title: "Название",
    widget: {
      type: "Search",
      options: filterOptions["groupTypes"],
      view: "title",
      value: "id",
      placeholder: "Тип тренировки",
      endpoint: { tableName: "groupTypes" },
    },
    prop: "groupTypes",
  },
];

const getGroups = async () => {
  groupStore.page = 1;
  groupsData = await groupStore.getGroups();
};

const getNextGroup = async () => {
  groupStore.page += 1;
  groupsData = await groupStore.getGroups();
};
const getPrevGroup = async () => {
  groupStore.page -= 1;
  groupsData = await groupStore.getGroups();
};
</script>

<style></style>
