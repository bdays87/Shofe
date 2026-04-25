<script setup lang="ts">
definePageMeta({ auth: false });
useHead({
  title: "Shofe — drivers and fleet owners, connected",
  meta: [
    {
      name: "description",
      content:
        "Shofe is a logistics platform that connects verified drivers with fleet owners. Post jobs, set daily targets, and track kilometres — all in one place.",
    },
  ],
});
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-white dark:from-slate-900 dark:to-slate-950" />
      <div class="mx-auto max-w-6xl px-6 pt-20 pb-24">
        <span class="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-xs font-medium text-brand-700 backdrop-blur dark:border-brand-700/40 dark:bg-slate-900/70 dark:text-brand-400">
          <span class="h-1.5 w-1.5 rounded-full bg-brand-500" />
          Phase 1 — early access
        </span>
        <h1 class="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
          Drivers and fleet owners,<br />
          <span class="bg-gradient-to-r from-brand-500 to-orange-400 bg-clip-text text-transparent">
            connected.
          </span>
        </h1>
        <p class="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Shofe is the modern way to run a fleet. Post jobs against your vehicles,
          set working conditions and daily targets, and pick from verified drivers.
          Daily kilometres are tracked from the driver's phone — no extra hardware.
        </p>
        <div class="mt-10 flex flex-wrap gap-4">
          <NuxtLink
            to="/register"
            class="rounded-md bg-brand-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            Create an account
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="rounded-md border border-slate-300 px-6 py-3 font-semibold hover:border-brand-600 hover:text-brand-600 dark:border-slate-700"
          >
            Sign in
          </NuxtLink>
          <a
            href="#how-it-works"
            class="rounded-md px-6 py-3 font-semibold text-slate-600 hover:text-brand-600 dark:text-slate-400"
          >
            See how it works ↓
          </a>
        </div>
      </div>
    </section>

    <!-- Audience cards -->
    <section class="mx-auto max-w-6xl px-6 py-20">
      <div class="grid gap-6 md:grid-cols-3">
        <article class="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-brand-600 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-700/20 dark:text-brand-400">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
          </div>
          <h2 class="mt-4 text-lg font-semibold">For drivers</h2>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Register, upload your license and ID, get verified. Browse jobs, see
            working conditions and daily targets up front, apply in one tap.
          </p>
        </article>
        <article class="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-brand-600 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-700/20 dark:text-brand-400">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9-1.5h.75v.75H5.25v-.75zm.75-13.5h13.5L21 12l-2.25 5.25H5.25L3 12l3-8.25z" /></svg>
          </div>
          <h2 class="mt-4 text-lg font-semibold">For fleet owners</h2>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Add your vehicles with logbook and insurance. Post jobs with the
            terms you want — pay structure, working conditions, daily targets.
            Pick the right driver from real applications.
          </p>
        </article>
        <article class="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-brand-600 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-700/20 dark:text-brand-400">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
          </div>
          <h2 class="mt-4 text-lg font-semibold">Tracking built-in</h2>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Daily kilometres are captured from the driver's phone. No GPS box
            to install, no third-party telematics — it just works.
          </p>
        </article>
      </div>
    </section>

    <!-- How it works -->
    <section id="how-it-works" class="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
      <div class="mx-auto max-w-6xl px-6 py-20">
        <h2 class="text-3xl font-bold tracking-tight">How it works</h2>
        <p class="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
          Four steps from posting a job to seeing daily kilometres covered.
        </p>
        <ol class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <li class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <span class="text-sm font-semibold text-brand-600">Step 1</span>
            <h3 class="mt-1 font-semibold">Drivers register</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
              License and ID upload, admin verification.
            </p>
          </li>
          <li class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <span class="text-sm font-semibold text-brand-600">Step 2</span>
            <h3 class="mt-1 font-semibold">Owners post jobs</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Pick a vehicle, set conditions, daily targets, pay structure.
            </p>
          </li>
          <li class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <span class="text-sm font-semibold text-brand-600">Step 3</span>
            <h3 class="mt-1 font-semibold">Drivers apply</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Browse, see the terms, apply. Owners pick the right fit.
            </p>
          </li>
          <li class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <span class="text-sm font-semibold text-brand-600">Step 4</span>
            <h3 class="mt-1 font-semibold">Track daily km</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Phone-GPS captures the route. See targets vs. actuals.
            </p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Roadmap teaser -->
    <section class="mx-auto max-w-6xl px-6 py-20">
      <div class="rounded-2xl bg-gradient-to-br from-brand-600 to-orange-500 p-10 text-white shadow-lg sm:p-14">
        <h2 class="text-3xl font-bold tracking-tight">More than a fleet platform</h2>
        <p class="mt-3 max-w-2xl text-brand-50">
          Shofe starts with logistics, then expands. Same drivers, same vehicles,
          new earning opportunities.
        </p>
        <ul class="mt-8 grid gap-4 sm:grid-cols-3">
          <li class="rounded-lg bg-white/10 p-4 backdrop-blur">
            <h3 class="font-semibold">Ehailing</h3>
            <p class="mt-1 text-sm text-brand-50">Riders book a Shofe driver.</p>
          </li>
          <li class="rounded-lg bg-white/10 p-4 backdrop-blur">
            <h3 class="font-semibold">Courier</h3>
            <p class="mt-1 text-sm text-brand-50">On-demand parcel delivery.</p>
          </li>
          <li class="rounded-lg bg-white/10 p-4 backdrop-blur">
            <h3 class="font-semibold">Commuter rides</h3>
            <p class="mt-1 text-sm text-brand-50">Shared scheduled routes.</p>
          </li>
        </ul>
        <div class="mt-10 flex flex-wrap gap-3">
          <NuxtLink
            to="/register"
            class="rounded-md bg-white px-5 py-2.5 font-semibold text-brand-700 hover:bg-brand-50"
          >
            Join the waitlist
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="rounded-md border border-white/40 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
          >
            I have an account
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
