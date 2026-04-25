import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return;
  const auth = useAuthStore();
  await auth.hydrate();

  const requiresAuth = to.meta.auth !== false;
  const requiredRole = to.meta.role as string | undefined;

  if (requiresAuth && !auth.user && to.path !== "/login" && to.path !== "/register" && to.path !== "/") {
    return navigateTo("/login");
  }
  if (requiredRole && auth.profile?.role !== requiredRole) {
    return navigateTo("/dashboard");
  }
});
