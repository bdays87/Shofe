import { createShofeAppwrite } from "@shofe/appwrite-client";

export const appwrite = createShofeAppwrite({
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT ?? "",
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID ?? "",
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID ?? "shofe",
});
