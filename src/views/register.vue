<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <Card>
      <template #title> Регистрация </template>
      <template #content>
        <span class="p-float-label">
          <InputText id="username" type="text" v-model.trim="email" />
          <label for="username">Email</label>
        </span>
        <span class="p-float-label mt-6">
          <Password v-model.trim="password" :feedback="false" />
          <label for="username">Пароль</label>
        </span>
        <div class="mt-4">
          <Button class="w-full" @click="handleSubmit" :loading="userStore.loadingUser"
            >Зарегистрироваться</Button
          >
        </div></template
      >
    </Card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user";
// import { useToast } from "primevue/usetoast";

// const toast = useToast();
const userStore = useUserStore();

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  if (!email.value || password.value.length < 6) {
    return alert("llena los campos");
  }
  await userStore.registerUser(email.value, password.value);
};
</script>

<style></style>
