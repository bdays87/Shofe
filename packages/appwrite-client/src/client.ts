import { Account, Client, Databases, Functions, Storage } from "appwrite";

export interface ShofeAppwriteConfig {
  endpoint: string;
  projectId: string;
  databaseId: string;
}

export interface ShofeAppwrite {
  client: Client;
  account: Account;
  databases: Databases;
  storage: Storage;
  functions: Functions;
  databaseId: string;
}

export function createShofeAppwrite(config: ShofeAppwriteConfig): ShofeAppwrite {
  if (!config.endpoint || !config.projectId) {
    // Warn but don't throw — the app renders without Appwrite (e.g. landing page,
    // fresh clone before .env is filled in). The first SDK call will fail.
    console.warn(
      "[shofe] Appwrite is not configured. Set APPWRITE_ENDPOINT and APPWRITE_PROJECT_ID (or their NUXT_PUBLIC_/VITE_ variants).",
    );
  }
  const client = new Client();
  if (config.endpoint) client.setEndpoint(config.endpoint);
  if (config.projectId) client.setProject(config.projectId);
  return {
    client,
    account: new Account(client),
    databases: new Databases(client),
    storage: new Storage(client),
    functions: new Functions(client),
    databaseId: config.databaseId,
  };
}
