<template>
  <h1>Home</h1>
  <p>{{ userStore.userData?.email }}</p>
  <Button @click="logout">Выйти</Button>
  <div class="mt-8 ml-4">
    <InputText id="username" type="text" v-model.trim="data.value" />
    <Button @click="addTest">Добавить</Button>
  </div>
</template>

<script setup>
import { useGroupsStore } from "../store/groups";
import { useUserStore } from "../store/user";
import { reactive, ref } from "vue";

const userStore = useUserStore();
const groupsStore = useGroupsStore();

const data = reactive({
  value: "",
});

const logout = async () => {
  await userStore.logoutUser();
};

const addTest = async () => {
  await groupsStore.addTestData(data);
};
</script>

<style></style>
