import { useAuthStore } from '@/stores/auth';

export function authGuard(
  to,
  from,
  next,
) {
  const authStore = useAuthStore();

  if (!to.meta.authRequired || authStore.isAuthenticated) {
    return next();
  } else {
    authStore.saveRedirectRoute(to);
    return next({ name: 'login' });
  }
}
