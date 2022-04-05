<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <el-card label-width="140px">
      <h2>Регистрация</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.prevent="register(form)"
      >
        <el-form-item prop="email">
          <el-input v-model="model.email" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="Пароль"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="model.name" placeholder="Фио"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
            >Зарегистрироваться</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useUserStore } from "../store/user";
import { ElMessage } from "element-plus";

const userStore = useUserStore();

let model = reactive({
  email: "",
  password: "",
  name: "",
});

const loading = ref(false);
const form = ref();

const rules = reactive({
  name: [
    {
      required: true,
      message: "Username is required",
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      message: "Email is required",
      trigger: "blur",
    },
    {
      min: 4,
      message: "Username length should be at least 5 characters",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "Password is required", trigger: "blur" },
    {
      min: 5,
      message: "Password length should be at least 5 characters",
      trigger: "blur",
    },
  ],
});

const register = async (form) => {
  if (!form) return;
  await form.validate(async (valid, fields) => {
    if (valid) {
      await userStore.registerUser(model);
      ElMessage.success("Регистрация успешна");
    } else {
      ElMessage.error("Проверьте правильность ввденных данных");
    }
  });
};
</script>

<style></style>
