import { createWebHistory, createRouter } from "vue-router";
import { useUserStore } from "../store/user";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  const user = await userStore.currentUser();
  if (user) {
    next();
  } else {
    next("/login");
  }
  userStore.loadingSession = false;
};

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/",
    name: "home",
    beforeEnter: requireAuth,
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/groups",
    name: "groups",
    beforeEnter: requireAuth,
    component: () => import("../views/Groups/index.vue"),
  },
  {
    path: "/groups/create",
    name: "groups_create",
    beforeEnter: requireAuth,
    component: () => import("../views/Groups/Create.vue"),
  },
  {
    path: "/students",
    name: "students",
    beforeEnter: requireAuth,
    component: () => import("../views/Students.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
