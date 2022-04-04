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

import AuthLayout from '@/layout/auth-layout.vue'
import AppLayout from '@/layout/app-layout.vue'

const routes = [
  {
    path: "/:catchAll(.*)",
    redirect: { name: 'home' },
  },
  {
    name: 'admin',
    path: '/admin',
    component: AppLayout,
    children: [

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
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
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
    ]
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
