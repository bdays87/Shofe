<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

definePageMeta({ auth: false });

const email = ref("");
const password = ref("");
const error = ref<string | null>(null);
const submitting = ref(false);
const auth = useAuthStore();

async function submit() {
  error.value = null;
  submitting.value = true;
  try {
    await auth.login(email.value, password.value);
    await navigateTo("/dashboard");
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Sign-in failed.";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <section class="mx-auto max-w-md px-6 py-16">
    <h1 class="text-3xl font-bold">Sign in</h1>
    <form class="mt-8 space-y-4" @submit.prevent="submit">
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
        <span class="text-sm font-medium">Password</span>
        <input
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
          class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        />
      </label>
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      <button
        type="submit"
        :disabled="submitting"
        class="w-full rounded-md bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {{ submitting ? "Signing in..." : "Sign in" }}
      </button>
    </form>
    <p class="mt-6 text-sm text-slate-600 dark:text-slate-400">
      No account?
      <NuxtLink to="/register" class="text-brand-600 hover:underline">Register</NuxtLink>
    </p>
  </section>
</template>
