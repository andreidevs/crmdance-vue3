import { defineStore } from "pinia";
import { supabase } from "@/supabase";
import { getById, getTable } from "../apis";
import { ElMessage } from "element-plus";

export const useUserStore = defineStore("user", {
  state() {
    return {
      currentUser: null,
      redirectRoute: null,
    };
  },
  getters: {
    isAuthenticated() {
      return !!this.currentUser;
    },
  },
  actions: {
    loadUser() {
      this.currentUser = supabase.auth.user();
      this.getUserData();
    },
    clearUser() {
      this.currentUser = null;
    },
    saveRedirectRoute(route) {
      const { name, params, query, hash } = route;

      localStorage.setItem(
        "redirectRoute",
        JSON.stringify({
          name,
          params,
          query,
          hash,
        })
      );
    },
    loadRedirectRoute() {
      const route = JSON.parse(localStorage.getItem("redirectRoute") || "null");
      this.redirectRoute = route;
    },
    clearRedirectRoute() {
      localStorage.removeItem("redirectRoute");
      this.redirectRoute = null;
    },

    async login(values) {
      try {
        const { user, error } = await supabase.auth.signIn(values);
        if (error) throw error;
        this.currentUser = user;
        ElMessage.success("Успешный вход в систему");
        return user;
      } catch (error) {
        ElMessage.error(`Ошибка, ${error?.message} `);
        console.log(error);
      }
    },

    async logout() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.clearUser();
    },

    async register(values, data) {
      const { user } = supabase.auth.signUp(values, { data });
      return user;
    },

    resetPassword(email) {
      return supabase.auth.api.resetPasswordForEmail(email);
    },

    async getUserData() {
      const data = await getById({
        tableName: "users",
        id: this.currentUser.id,
        select: "*",
      });

      Object.assign(this.currentUser, data);
    },

    async getCoachList() {
      return await getTable({ tableName: "users" });
    },
  },
});
