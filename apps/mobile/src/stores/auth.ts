import { defineStore } from "pinia";
import { ID } from "appwrite";
import type { Profile } from "@shofe/types";
import { getProfileByUserId } from "@shofe/appwrite-client";
import { appwrite } from "@/lib/appwrite";

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
      try {
        const user = await appwrite.account.get();
        this.user = { $id: user.$id, email: user.email, name: user.name };
        this.profile = await getProfileByUserId(appwrite, user.$id);
      } catch {
        this.user = null;
        this.profile = null;
      } finally {
        this.initialized = true;
      }
    },
    async login(email: string, password: string) {
      await appwrite.account.createEmailPasswordSession(email, password);
      this.initialized = false;
      await this.hydrate();
    },
    async register(input: RegisterInput) {
      await appwrite.account.create(ID.unique(), input.email, input.password, input.fullName);
      await appwrite.account.createEmailPasswordSession(input.email, input.password);
      // Drivers always register with role=driver — server-side function enforces it.
      await appwrite.functions.createExecution(
        "createProfile",
        JSON.stringify({ role: "driver", phone: input.phone, fullName: input.fullName }),
        false,
      );
      this.initialized = false;
      await this.hydrate();
    },
    async logout() {
      try {
        await appwrite.account.deleteSession("current");
      } finally {
        this.user = null;
        this.profile = null;
      }
    },
  },
});
