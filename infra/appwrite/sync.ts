// Idempotently provisions the Shofe Appwrite project from `schema.ts`.
// Usage: pnpm appwrite:sync (requires APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY).

import { Client, Databases, Permission, Role, Storage } from "node-appwrite";
import type { AttributeSpec, CollectionSpec } from "./schema.js";
import { BUCKETS, COLLECTIONS } from "./schema.js";

const endpoint = process.env.APPWRITE_ENDPOINT;
const projectId = process.env.APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;
const databaseId = process.env.APPWRITE_DATABASE_ID ?? "shofe";

if (!endpoint || !projectId || !apiKey) {
  console.error(
    "Missing env vars. Set APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, and APPWRITE_API_KEY in .env",
  );
  process.exit(1);
}

const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
const databases = new Databases(client);
const storage = new Storage(client);

async function ensureDatabase() {
  try {
    await databases.get(databaseId);
    console.log(`✓ database ${databaseId} exists`);
  } catch {
    await databases.create(databaseId, "Shofe");
    console.log(`+ database ${databaseId} created`);
  }
}

async function ensureCollection(spec: CollectionSpec) {
  try {
    await databases.getCollection(databaseId, spec.id);
    console.log(`✓ collection ${spec.id} exists`);
  } catch {
    await databases.createCollection(databaseId, spec.id, spec.name, [
      Permission.read(Role.users()),
      Permission.create(Role.users()),
      Permission.update(Role.users()),
      Permission.delete(Role.users()),
    ]);
    console.log(`+ collection ${spec.id} created`);
  }

  for (const attr of spec.attributes) {
    await ensureAttribute(spec.id, attr);
  }

  // Wait for attributes to become available before creating indexes.
  await waitForAttributes(spec);

  for (const index of spec.indexes ?? []) {
    try {
      await databases.getIndex(databaseId, spec.id, index.key);
      console.log(`  ✓ index ${spec.id}.${index.key}`);
    } catch {
      await databases.createIndex(databaseId, spec.id, index.key, index.type, index.attributes);
      console.log(`  + index ${spec.id}.${index.key}`);
    }
  }
}

async function ensureAttribute(collectionId: string, attr: AttributeSpec) {
  try {
    await databases.getAttribute(databaseId, collectionId, attr.key);
    return;
  } catch {
    // create below
  }
  const required = attr.required;
  switch (attr.type) {
    case "string":
      await databases.createStringAttribute(
        databaseId,
        collectionId,
        attr.key,
        attr.size ?? 255,
        required,
        attr.default as string | undefined,
        attr.array ?? false,
      );
      break;
    case "integer":
      await databases.createIntegerAttribute(
        databaseId,
        collectionId,
        attr.key,
        required,
        undefined,
        undefined,
        attr.default as number | undefined,
        attr.array ?? false,
      );
      break;
    case "float":
      await databases.createFloatAttribute(
        databaseId,
        collectionId,
        attr.key,
        required,
        undefined,
        undefined,
        attr.default as number | undefined,
        attr.array ?? false,
      );
      break;
    case "boolean":
      await databases.createBooleanAttribute(
        databaseId,
        collectionId,
        attr.key,
        required,
        attr.default as boolean | undefined,
        attr.array ?? false,
      );
      break;
    case "datetime":
      await databases.createDatetimeAttribute(
        databaseId,
        collectionId,
        attr.key,
        required,
        attr.default as string | undefined,
        attr.array ?? false,
      );
      break;
    case "enum":
      await databases.createEnumAttribute(
        databaseId,
        collectionId,
        attr.key,
        attr.elements ?? [],
        required,
        attr.default as string | undefined,
        attr.array ?? false,
      );
      break;
  }
  console.log(`  + attribute ${collectionId}.${attr.key} (${attr.type})`);
}

async function waitForAttributes(spec: CollectionSpec) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    const list = await databases.listAttributes(databaseId, spec.id);
    const allReady = spec.attributes.every((a) =>
      list.attributes.some(
        (x: { key: string; status: string }) => x.key === a.key && x.status === "available",
      ),
    );
    if (allReady) return;
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Attributes for ${spec.id} did not become available within 30s`);
}

async function ensureBuckets() {
  for (const bucket of BUCKETS) {
    try {
      await storage.getBucket(bucket.id);
      console.log(`✓ bucket ${bucket.id} exists`);
    } catch {
      await storage.createBucket(
        bucket.id,
        bucket.name,
        [
          Permission.read(Role.users()),
          Permission.create(Role.users()),
          Permission.update(Role.users()),
          Permission.delete(Role.users()),
        ],
        bucket.fileSecurity,
        true,
        bucket.maximumFileSize,
        bucket.allowedFileExtensions,
      );
      console.log(`+ bucket ${bucket.id} created`);
    }
  }
}

async function main() {
  await ensureDatabase();
  for (const c of COLLECTIONS) await ensureCollection(c);
  await ensureBuckets();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
