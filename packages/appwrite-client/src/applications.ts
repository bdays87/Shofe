import { ID, Query } from "appwrite";
import type { Application, ApplicationStatus } from "@shofe/types";
import { COLLECTIONS } from "./collections";
import type { ShofeAppwrite } from "./client";

export async function applyToJob(
  aw: ShofeAppwrite,
  input: { jobId: string; driverProfileId: string; coverNote: string },
): Promise<Application> {
  const doc = await aw.databases.createDocument(
    aw.databaseId,
    COLLECTIONS.applications,
    ID.unique(),
    { ...input, status: "pending" satisfies ApplicationStatus },
  );
  return doc as unknown as Application;
}

export async function listApplicationsForJob(
  aw: ShofeAppwrite,
  jobId: string,
): Promise<Application[]> {
  const res = await aw.databases.listDocuments(aw.databaseId, COLLECTIONS.applications, [
    Query.equal("jobId", jobId),
    Query.orderDesc("$createdAt"),
  ]);
  return res.documents as unknown as Application[];
}

export async function listApplicationsForDriver(
  aw: ShofeAppwrite,
  driverProfileId: string,
): Promise<Application[]> {
  const res = await aw.databases.listDocuments(aw.databaseId, COLLECTIONS.applications, [
    Query.equal("driverProfileId", driverProfileId),
    Query.orderDesc("$createdAt"),
  ]);
  return res.documents as unknown as Application[];
}

export async function setApplicationStatus(
  aw: ShofeAppwrite,
  applicationId: string,
  status: ApplicationStatus,
): Promise<Application> {
  const doc = await aw.databases.updateDocument(
    aw.databaseId,
    COLLECTIONS.applications,
    applicationId,
    { status },
  );
  return doc as unknown as Application;
}
