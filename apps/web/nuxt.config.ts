// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      appwriteEndpoint: process.env.NUXT_PUBLIC_APPWRITE_ENDPOINT ?? "",
      appwriteProjectId: process.env.NUXT_PUBLIC_APPWRITE_PROJECT_ID ?? "",
      appwriteDatabaseId: process.env.NUXT_PUBLIC_APPWRITE_DATABASE_ID ?? "shofe",
    },
  },
  app: {
    head: {
      title: "Shofe — drivers and fleet owners, connected",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
