<template>
  <el-card>
    <el-form :model="form" label-width="140px">
      <el-form-item label="Название группы">
        <el-input
          placeholder="Оставьте пустым если хотите использовать значение по умолчанию"
          v-model="form.title"
        />
      </el-form-item>
      <el-form-item label="Дни недели">
        <!-- <WeekDaysPicker v-model="form.weekdays" /> -->
        <el-select
          v-model="form.weekdays"
          filterable
          allow-create
          default-first-option
          clearable
          multiple
          class="m-2"
          placeholder="Дни недели"
        >
          <el-option
            v-for="(item, index) in weekdaysItems"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Количество мест">
        <el-input-number v-model="form.count" :min="1" :max="20" />
      </el-form-item>

      <el-form-item label="Время начала">
        <el-time-select
          v-model="form.time"
          start="06:00"
          step="00:10"
          end="22:00"
          placeholder="Время тренеровки"
        />
      </el-form-item>

      <el-form-item label="Тренер">
        <el-select v-model="form.coach" clearable class="m-2" placeholder="Тренер">
          <el-option
            v-for="item in coachList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Тип тренеровки">
        <el-select
          v-model="form.type"
          class="m-2"
          filterable
          allow-create
          clearable
          default-first-option
          :reserve-keyword="false"
          placeholder="Тип тренеровки"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.ConvertInvalidComponents"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="createGroup">Создать</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useGroupsStore } from "../../stores/groups";

const form = reactive({
  coach: "",
  count: 10,
  title: "",
  time: "07:00",
  type: "",
  weekdays: [],
});
const groupStore = useGroupsStore();
const typeOptions = ref([]);
const coachList = ref([]);
const weekdaysItems = ref(["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]);

onMounted(async () => {
  typeOptions.value = (await groupStore.getGroupTypes()).data;
  coachList.value = (await groupStore.getCoachList()).data;
});

const createGroup = () => {
  groupStore.createGroup(form);
};
</script>

<style></style>
