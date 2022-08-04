<template>
  <el-card>
    <el-form
      :model="form"
      label-width="140px"
    >
      <el-form-item label="ФИО">
        <el-input
          v-model="form.name"
          placeholder="ФИО"
        />
      </el-form-item>

      <el-form-item label="Телефон">
        <el-input
          v-model="form.phone"
          v-maska="'+7 (###) ### ##-## '"
          placeholder="Телефон"
          maxlength="18"
          clearable
        />
      </el-form-item>

      <el-form-item label="Тип занятий">
        <el-select
          v-model="form.type"
          clearable
          class="m-2"
          placeholder="Тип занятий"
          @change="changeLessonType"
        >
          <el-option
            v-for="item in lessonTypes"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item

        label="Группа"
      >
        <SelectDrawer
          v-model="form.group"
          title="Выбрать группу"
          :data-table-options="groupTableOptions"
        />
      </el-form-item>

      <el-form-item label="Зал">
        <el-select
          v-model="form.room"
          clearable
          class="m-2"
          placeholder="Зал"
        >
          <el-option
            v-for="item in roomStore.listRoom"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Тренер">
        <el-select
          v-model="form.coach"
          clearable
          class="m-2"
          placeholder="Тренер"
        >
          <el-option
            v-for="item in coachList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          v-loading="loading"
          @click="createStudent"
        >
          Создать
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import {  onMounted, reactive, ref } from "vue";
import { useRoomStore } from "../../stores/room";
import { useStudentsStore } from "../../stores/students";
import { useUserStore } from "../../stores/user";
import {tableColumns, filterColumns} from "../Groups/groupsColumns";

const form = reactive({
  coach: "",
  title: "",
  type: "",
  room: "",
  phone: "",
  group: "",
});
const roomStore = useRoomStore();
const studentsStore = useStudentsStore()
const userStore = useUserStore()


const  viewGroup = ref(false)
const loading = ref(false);
const lessonTypes = ref([])
const coachList = ref([]);


const changeLessonType = (id) =>{
  const find = lessonTypes.value.find(el=> el.id === id)
  if(find?.name === 'group'){
    viewGroup.value = true
  } else {  viewGroup.value = false }

}

const groupTableOptions = {
  tableColumns,
  filterColumns,
  tableName: 'groups',
  select: "*, coach(*), type(*), room(*)"
}

const createStudent = ()=>{}


onMounted(async () => {
  lessonTypes.value = await studentsStore.getLessonsTypes()
  coachList.value = await userStore.getCoachList()

});


</script>

<style></style>
