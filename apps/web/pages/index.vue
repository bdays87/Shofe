<template>
  <section class="mx-auto max-w-4xl px-6 py-20">
    <h1 class="text-5xl font-extrabold tracking-tight">
      Drivers and fleet owners, <span class="text-brand-600">connected.</span>
    </h1>
    <p class="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
      Shofe lets fleet owners post jobs against their vehicles, drivers register and get verified,
      and tracks daily kilometres covered. Ehailing, courier, and commuter rides — coming soon.
    </p>
    <div class="mt-10 flex gap-4">
      <NuxtLink
        to="/register"
        class="rounded-md bg-brand-600 px-5 py-3 font-medium text-white hover:bg-brand-700"
      >
        Create an account
      </NuxtLink>
      <NuxtLink
        to="/login"
        class="rounded-md border border-slate-300 px-5 py-3 font-medium hover:border-brand-600 dark:border-slate-700"
      >
        Sign in
      </NuxtLink>
    </div>
    <div class="mt-16 grid gap-6 md:grid-cols-3">
      <article class="rounded-lg border border-slate-200 p-6 dark:border-slate-800">
        <h2 class="text-lg font-semibold">For drivers</h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Register, upload your license and ID, and get verified. Browse jobs that match you.
        </p>
      </article>
      <article class="rounded-lg border border-slate-200 p-6 dark:border-slate-800">
        <h2 class="text-lg font-semibold">For fleet owners</h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Add your vehicles, post jobs with working conditions and daily targets, pick the right driver.
        </p>
      </article>
      <article class="rounded-lg border border-slate-200 p-6 dark:border-slate-800">
        <h2 class="text-lg font-semibold">Tracking built-in</h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Daily kilometres covered, captured from the driver's phone. No extra hardware needed.
        </p>
      </article>
    </div>
  </section>
</template>
