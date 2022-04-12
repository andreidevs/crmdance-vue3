import { createWebHistory, createRouter } from "vue-router";
import { authGuard } from '@/guards/auth';
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
        meta: { authRequired: true },
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/groups",
        name: "groups",
        meta: { authRequired: true },
        component: () => import("../views/Groups/index.vue"),
      },
      {
        path: "/groups/create",
        name: "groups_create",
        meta: { authRequired: true },
        component: () => import("../views/Groups/Create.vue"),
      },
      {
        path: "/students",
        name: "students",
        meta: { authRequired: true },
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

router.beforeEach(authGuard);

export default router;
