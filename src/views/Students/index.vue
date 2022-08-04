<template>
  <div class="m-4">
    <el-button
      type="success"
      plain
      @click="$router.push({ name: 'students_create' })"
    >
      Создать
    </el-button>
    <MainFilter
      :columns="filterColumns"
      @update="getStudents"
    />
    <MainTable
      :columns="tableColumns"
      :data="groupsData"
      :get-data="getStudents"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import MainTable from "@/components/MainTable/index.vue";
import MainFilter from "@/components/MainFilter/index.vue";
import { useStudentsStore } from "../../stores/students";
import { filterColumns, tableColumns } from "./studentsColumns";

const studentsStore = useStudentsStore();

let groupsData = ref([]);


const getStudents = async (page) => {
  if(page === 'next') {
    studentsStore.page += 1;
  }else if(page === 'prev'){
    studentsStore.page -= 1;
  } else {
    studentsStore.page = 1;
  }
  groupsData.value = await studentsStore.getStudents();
};


</script>

<style></style>
