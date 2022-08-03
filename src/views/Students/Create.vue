<template>
  <el-card>
    <el-form
      :model="form"
      label-width="140px"
    >
      <el-form-item label="Название группы">
        <el-input
          v-model="form.title"
          placeholder="Оставьте пустым если хотите использовать значение по умолчанию"
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
        <el-input-number
          v-model="form.count"
          :min="1"
          :max="20"
        />
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
        <el-button
          v-loading="loading"
          @click="createGroup"
        >
          Создать
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useGroupsStore } from "../../stores/groups";
import { useRoomStore } from "../../stores/room";

const form = reactive({
  coach: "",
  count: 10,
  title: "",
  time: "07:00",
  type: "",
  room: "",
  weekdays: [],
});
const groupStore = useGroupsStore();
const roomStore = useRoomStore();

let loading = ref(false);

onMounted(async () => {

});


</script>

<style></style>
