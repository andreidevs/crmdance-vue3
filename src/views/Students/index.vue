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
import MainTable from "@/components/MainTable/index.vue";
import MainFilter from "@/components/MainFilter/index.vue";
import { useStudentsStore } from "../../stores/students";
import { ref } from "vue";

const studentsStore = useStudentsStore();

let groupsData = ref([]);

let tableColumns = [
  {
    label: "ФИО",
    prop: "name",
    sortable: true,
    dataView: "name",
    width: 150,
  },
  {
    label: "Телефон",
    prop: "phone",
    sortable: true,
    dataView: "phone",
    width: 120,
  },
  {
    label: "Подписка",
    prop: "subscriptions",
    sortable: true,
    dataView: "subscription",
    filterView: 'price_kz',
    width: 120,
  },
  {
    label: "Тип занятия",
    prop: "type",
    sortable: false,
    dataView: "type",
    childView: "title",
    width: 140,
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
    label: "Зал",
    prop: "room",
    sortable: true,
    dataView: "room",
    childView: "name",
    width: 110,
  },{
    label: "Оплата",
    prop: "payDate",
    sortable: true,
    dataView: "payDate",
    widget: {
      type: "PayField",
    },
    width: 200,
  },
];

const filterColumns = [
  // {
  //   title: "Тип",
  //   key: "groups",
  //   widget: {
  //     type: "Select",
  //     options: filterOptions["groupTypes"],
  //     view: "title",
  //     value: "id",
  //     multi: true,
  //     placeholder: "Тип тренировки",
  //     endpoint: { tableName: "groupTypes" },
  //   },
  //   prop: "type",
  // },

];

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
