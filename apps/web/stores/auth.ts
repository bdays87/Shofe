import { defineStore } from "pinia";
import { ID } from "appwrite";
import type { Profile, Role } from "@shofe/types";
import { getProfileByUserId } from "@shofe/appwrite-client";

interface AppwriteUser {
  $id: string;
  email: string;
  name: string;
}

interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: Exclude<Role, "admin">;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as AppwriteUser | null,
    profile: null as Profile | null,
    initialized: false,
  }),
  actions: {
    async hydrate() {
      if (this.initialized) return;
      const { $appwrite } = useNuxtApp();
      try {
        const user = await $appwrite.account.get();
        this.user = { $id: user.$id, email: user.email, name: user.name };
        this.profile = await getProfileByUserId($appwrite, user.$id);
      } catch {
        this.user = null;
        this.profile = null;
      } finally {
        this.initialized = true;
      }
    },
    async login(email: string, password: string) {
      const { $appwrite } = useNuxtApp();
      await $appwrite.account.createEmailPasswordSession(email, password);
      this.initialized = false;
      await this.hydrate();
    },
    async register(input: RegisterInput) {
      const { $appwrite } = useNuxtApp();
      await $appwrite.account.create(ID.unique(), input.email, input.password, input.fullName);
      await $appwrite.account.createEmailPasswordSession(input.email, input.password);
      // Profile creation runs server-side in the `createProfile` Appwrite Function
      // so role can't be self-assigned to admin. The function reads the request
      // user, plus the role/phone from the function payload.
      await $appwrite.functions.createExecution(
        "createProfile",
        JSON.stringify({ role: input.role, phone: input.phone, fullName: input.fullName }),
        false,
      );
      this.initialized = false;
      await this.hydrate();
    },
    async logout() {
      const { $appwrite } = useNuxtApp();
      try {
        await $appwrite.account.deleteSession("current");
      } finally {
        this.user = null;
        this.profile = null;
        await navigateTo("/login");
      }
    },
  },
});
