import type { ShofeAppwrite } from "@shofe/appwrite-client";

declare module "#app" {
  interface NuxtApp {
    $appwrite: ShofeAppwrite;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $appwrite: ShofeAppwrite;
  }
}

declare module "vue-router" {
  interface RouteMeta {
    auth?: boolean;
    role?: "driver" | "fleet_owner" | "admin";
  }
}

export {};
