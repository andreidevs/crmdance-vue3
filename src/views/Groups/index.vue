<template>
  <div class="m-4">
    <el-button type="success" plain @click="$router.push({ name: 'groups_create' })"
      >Создать</el-button
    >
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
import MainTable from "../../components/MainTable/index.vue";
import { useGroupsStore } from "../../stores/groups";
import { onMounted, reactive, ref } from "vue";
const groupStore = useGroupsStore();

let groupsData = ref([]);

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
  const res = await groupStore.getGroups();
  groupsData.value = res;
  console.log("groupsData", res);
};

const getNextGroup = async () => {
  groupStore.page += 1;
  await getGroups();
};
const getPrevGroup = async () => {
  groupStore.page -= 1;
  await getGroups();
};
</script>

<style></style>
