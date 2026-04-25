import { createShofeAppwrite } from "@shofe/appwrite-client";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const appwrite = createShofeAppwrite({
    endpoint: config.public.appwriteEndpoint,
    projectId: config.public.appwriteProjectId,
    databaseId: config.public.appwriteDatabaseId,
  });
  return {
    provide: { appwrite },
  };
});
