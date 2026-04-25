<script setup lang="ts">
definePageMeta({ auth: true, role: "admin" });
</script>

<template>
  <section class="mx-auto max-w-5xl px-6 py-12">
    <h1 class="text-3xl font-bold">Driver verifications</h1>
    <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
      Pending driver applications will list here. Admin role is required.
    </p>
  </section>
</template>
