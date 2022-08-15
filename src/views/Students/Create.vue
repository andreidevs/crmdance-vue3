<template>
  <el-card>
    <el-form
      ref="studentsFormRef"
      :model="form"
      label-width="140px"
      label-position="left"
      :rules="rules"
    >
      <el-form-item
        label="ФИО"
        class="flex items-center justify-between"
        prop="name"
      >
        <el-input
          v-model="form.name"
          placeholder="ФИО"
        />
      </el-form-item>

      <el-form-item
        label="Телефон"
        class="flex items-center justify-between"
        prop="phone"
      >
        <el-input
          v-model="form.phone"
          v-maska="'+7 (###) ### ##-## '"
          placeholder="Телефон"
          maxlength="18"
          clearable
        />
      </el-form-item>

      <el-form-item
        label="Тип занятий"
        class="flex items-center justify-between"
        prop="type"
      >
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
        v-if="viewGroup"
        label="Группа"
        class="flex items-center justify-between"
        prop="group"
      >
        <SelectTableDrawer
          v-model="form.group"
          title="Группа"
          drawer-title="Выбрать группу"
          :data-table-options="groupTableOptions"
          @change="changeGroup"
        />
      </el-form-item>

      <el-form-item
        v-if="!viewGroup"
        label="Зал"
        class="flex items-center justify-between"
        prop="room"
      >
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

      <el-form-item
        label="Тренер"
        class="flex items-center justify-between"
        prop="coach"
      >
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

      <el-form-item
        label="Стоимость"
        class="flex items-center justify-between"
        prop="subscription"
      >
        <el-input
          v-model="form.subscription"
          v-maska="'#######'"
          placeholder="Стоимость"
          :suffix-icon="Money"
          maxlength="8"
        />
      </el-form-item>
      <el-form-item
        v-if="!viewGroup"
        label="Платежный период"
        class="flex items-center justify-between"
        prop="payPeriod"
      >
        <el-input
          v-model="form.payPeriod"
          v-maska="'##'"
          maxlength="2"
          placeholder="Введите кол-во дней"
        />
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
import SelectTableDrawer from '@/components/SelectTableDrawer'
import {Money} from "@element-plus/icons-vue"
import { requiredRule } from "../../rules";
import { ElMessage } from "element-plus";

const form = reactive({
  coach: "",
  name: "",
  type: null,
  room: null,
  phone: "",
  group: null,
  subscription: 0,
  payPeriod: 30
});
const roomStore = useRoomStore();
const studentsStore = useStudentsStore()
const userStore = useUserStore()


const  viewGroup = ref(false)
const loading = ref(false);
const lessonTypes = ref([])
const coachList = ref([]);
const studentsFormRef = ref()
const rules = reactive({
  coach: requiredRule('Тренер'),
  name: requiredRule('ФИО'),
  type: requiredRule('Тип занятий'),
  room: !viewGroup.value ? requiredRule('Зал') : {},
  group: requiredRule('Группа') ,
  phone: requiredRule('Телефон'),
  subscription: requiredRule('Стоимость'),
  payPeriod: !viewGroup.value ? requiredRule('Перод оплаты') : {}
})

const groupTableOptions = {
  tableColumns,
  filterColumns,
  tableName: 'groups',
  select: "*, coach(*), type(*), room(*)"
}

const changeLessonType = (id) =>{
  const find = lessonTypes.value.find(el=> el.id === id)
  if(find?.name === 'group'){
    viewGroup.value = true
  } else {  viewGroup.value = false }

}

const changeGroup =(group) =>{
  const selGroup  = JSON.parse(JSON.stringify(group[0]))
  form.room = selGroup.room.id
  form.payPeriod = selGroup.payPeriod
}

const createStudent = async ()=>{
  await studentsFormRef.value.validate( async (valid) => {
    if (valid) {
     await studentsStore.createStudent(form)
      ElMessage.success("Группа успешно создана")
    }
  })
}


onMounted(async () => {
  lessonTypes.value = await studentsStore.getLessonsTypes()
  coachList.value = await userStore.getCoachList()

});


</script>

<style></style>
