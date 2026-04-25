<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

definePageMeta({ auth: false });

const fullName = ref("");
const email = ref("");
const password = ref("");
const phone = ref("");
const role = ref<"fleet_owner" | "driver">("fleet_owner");
const error = ref<string | null>(null);
const submitting = ref(false);
const auth = useAuthStore();

async function submit() {
  error.value = null;
  submitting.value = true;
  try {
    await auth.register({
      fullName: fullName.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      role: role.value,
    });
    await navigateTo("/dashboard");
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Registration failed.";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <section class="mx-auto max-w-md px-6 py-16">
    <h1 class="text-3xl font-bold">Create your account</h1>
    <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
      Drivers should sign up in the Shofe mobile app — but you can register here too.
    </p>
    <form class="mt-8 space-y-4" @submit.prevent="submit">
      <label class="block">
        <span class="text-sm font-medium">I am a</span>
        <select
          v-model="role"
          class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="fleet_owner">Fleet owner</option>
          <option value="driver">Driver</option>
        </select>
      </label>
      <label class="block">
        <span class="text-sm font-medium">Full name</span>
        <input
          v-model="fullName"
          required
          class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        />
      </label>
      <label class="block">
        <span class="text-sm font-medium">Email</span>
        <input
          v-model="email"
          type="email"
          required
          autocomplete="email"
          class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        />
      </label>
      <label class="block">
        <span class="text-sm font-medium">Phone</span>
        <input
          v-model="phone"
          type="tel"
          required
          autocomplete="tel"
          class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        />
      </label>
      <label class="block">
        <span class="text-sm font-medium">Password</span>
        <input
          v-model="password"
          type="password"
          required
          minlength="8"
          autocomplete="new-password"
          class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        />
      </label>
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      <button
        type="submit"
        :disabled="submitting"
        class="w-full rounded-md bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {{ submitting ? "Creating account..." : "Create account" }}
      </button>
    </form>
  </section>
</template>
