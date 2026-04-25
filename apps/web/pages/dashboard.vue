<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

definePageMeta({ auth: true });

const auth = useAuthStore();
</script>

<template>
  <section class="mx-auto max-w-5xl px-6 py-12">
    <h1 class="text-3xl font-bold">Welcome back, {{ auth.profile?.fullName ?? "there" }}.</h1>
    <p v-if="auth.profile" class="mt-2 text-sm text-slate-600 dark:text-slate-400">
      Role: <span class="font-medium">{{ auth.profile.role }}</span> · Verification:
      <span class="font-medium">{{ auth.profile.verificationStatus }}</span>
    </p>
    <div class="mt-10 grid gap-4 md:grid-cols-3">
      <NuxtLink
        to="/vehicles"
        class="rounded-lg border border-slate-200 p-6 hover:border-brand-600 dark:border-slate-800"
      >
        <h2 class="font-semibold">Vehicles</h2>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">Add and manage your fleet.</p>
      </NuxtLink>
      <NuxtLink
        to="/jobs/new"
        class="rounded-lg border border-slate-200 p-6 hover:border-brand-600 dark:border-slate-800"
      >
        <h2 class="font-semibold">Post a job</h2>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Define working conditions and daily targets.
        </p>
      </NuxtLink>
      <NuxtLink
        to="/admin/verifications"
        class="rounded-lg border border-slate-200 p-6 hover:border-brand-600 dark:border-slate-800"
      >
        <h2 class="font-semibold">Verifications</h2>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">Admins only.</p>
      </NuxtLink>
    </div>
  </section>
</template>
