import { createRouter, createWebHistory } from "@ionic/vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: () => import("@/views/LoginView.vue") },
  { path: "/register", component: () => import("@/views/RegisterView.vue") },
  {
    path: "/tabs/",
    component: () => import("@/views/TabsView.vue"),
    meta: { requiresAuth: true },
    children: [
      { path: "", redirect: "/tabs/jobs" },
      { path: "jobs", component: () => import("@/views/JobsView.vue") },
      { path: "applications", component: () => import("@/views/MyApplicationsView.vue") },
      { path: "profile", component: () => import("@/views/ProfileView.vue") },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  await auth.hydrate();
  if (to.meta.requiresAuth && !auth.user) return "/login";
  if ((to.path === "/login" || to.path === "/register") && auth.user) return "/tabs/jobs";
});
