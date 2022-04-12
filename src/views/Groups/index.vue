<template>
  <div class="m-4">
    <el-button type="success" plain @click="$router.push({ name: 'groups_create' })"
      >Создать</el-button
    >
    <MainTable
      @next="getNextGroup"
      @prev="getPrevGroup"
      @start="getGroups"
      :columns="tableColumns"
      :tableData="groupsData"
    />
  </div>
</template>

<script setup>
import MainTable from "../../components/MainTable/index.vue";
import { useGroupsStore } from "../../store/groups";
import { onMounted, reactive, ref } from "vue";
const groupStore = useGroupsStore();

let groupsData = $ref([]);

let tableColumns = [
  {
    label: "Название",
    prop: "title",
  },
  {
    label: "Время",
    prop: "time",
  },
  {
    label: "Количество мест",
    prop: "count",
  },
];
const getGroups = async () => {
  groupsData = await groupStore.getGroups();
  console.log("groupsData", groupsData);
};

const getNextGroup = async () => {
  groupsData = await groupStore.getGroupsNext();
  console.log("groupsData", groupsData);
};
const getPrevGroup = async () => {
  groupsData = await groupStore.getGroupsPrev();
  console.log("groupsData", groupsData);
};
</script>

<style></style>
