import { useUserStore } from "../stores/user";

export function authGuard(to, from, next) {
  const userStore = useUserStore();

  if (!to.meta.authRequired || userStore.isAuthenticated) {
    return next();
  } else {
    userStore.saveRedirectRoute(to);
    return next({ name: "login" });
  }
}
