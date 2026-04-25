import { Query } from "appwrite";
import type { Profile } from "@shofe/types";
import { COLLECTIONS } from "./collections";
import type { ShofeAppwrite } from "./client";

export async function getProfileByUserId(
  aw: ShofeAppwrite,
  userId: string,
): Promise<Profile | null> {
  const res = await aw.databases.listDocuments(aw.databaseId, COLLECTIONS.profiles, [
    Query.equal("userId", userId),
    Query.limit(1),
  ]);
  const doc = res.documents[0];
  return doc ? (doc as unknown as Profile) : null;
}
