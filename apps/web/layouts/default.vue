<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b border-slate-200 dark:border-slate-800">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NuxtLink to="/" class="text-xl font-bold text-brand-600">Shofe</NuxtLink>
        <nav class="flex items-center gap-4 text-sm">
          <template v-if="auth.user">
            <NuxtLink to="/dashboard" class="hover:text-brand-600">Dashboard</NuxtLink>
            <NuxtLink to="/vehicles" class="hover:text-brand-600">Vehicles</NuxtLink>
            <NuxtLink to="/jobs/new" class="hover:text-brand-600">Post job</NuxtLink>
            <button class="hover:text-brand-600" @click="auth.logout()">Sign out</button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="hover:text-brand-600">Sign in</NuxtLink>
            <NuxtLink
              to="/register"
              class="rounded-md bg-brand-600 px-3 py-1.5 text-white hover:bg-brand-700"
            >
              Get started
            </NuxtLink>
          </template>
        </nav>
      </div>
    </header>
    <main class="flex-1">
      <slot />
    </main>
    <footer class="border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-800">
      Shofe &copy; {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>
