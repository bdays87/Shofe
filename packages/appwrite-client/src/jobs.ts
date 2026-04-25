import { ID, Query } from "appwrite";
import type { Job, JobStatus } from "@shofe/types";
import { COLLECTIONS } from "./collections";
import type { ShofeAppwrite } from "./client";

export async function listOpenJobs(aw: ShofeAppwrite): Promise<Job[]> {
  const res = await aw.databases.listDocuments(aw.databaseId, COLLECTIONS.jobs, [
    Query.equal("status", "open" satisfies JobStatus),
    Query.orderDesc("$createdAt"),
    Query.limit(50),
  ]);
  return res.documents as unknown as Job[];
}

export async function listJobsByOwner(aw: ShofeAppwrite, ownerId: string): Promise<Job[]> {
  const res = await aw.databases.listDocuments(aw.databaseId, COLLECTIONS.jobs, [
    Query.equal("ownerId", ownerId),
    Query.orderDesc("$createdAt"),
  ]);
  return res.documents as unknown as Job[];
}

export type CreateJobInput = Omit<Job, "$id" | "$createdAt" | "status"> & {
  status?: JobStatus;
};

export async function createJob(aw: ShofeAppwrite, input: CreateJobInput): Promise<Job> {
  const doc = await aw.databases.createDocument(
    aw.databaseId,
    COLLECTIONS.jobs,
    ID.unique(),
    { status: "open", ...input },
  );
  return doc as unknown as Job;
}
