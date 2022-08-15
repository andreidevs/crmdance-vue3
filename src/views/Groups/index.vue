<template>
  <div class="m-4">
    <el-button
      type="success"
      class="mb-4"
      plain
      @click="$router.push({ name: 'groups_create' })"
    >
      Создать
    </el-button>
    <MainFilter
      title="Фильтры"
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
import {tableColumns, filterColumns} from "./groupsColumns";

const groupStore = useGroupsStore();

let groupsData = ref([]);



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
