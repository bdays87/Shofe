import { ID, Query } from "appwrite";
import type { Vehicle, VehicleStatus } from "@shofe/types";
import { COLLECTIONS } from "./collections";
import type { ShofeAppwrite } from "./client";

export async function listVehiclesByOwner(
  aw: ShofeAppwrite,
  ownerId: string,
): Promise<Vehicle[]> {
  const res = await aw.databases.listDocuments(aw.databaseId, COLLECTIONS.vehicles, [
    Query.equal("ownerId", ownerId),
    Query.orderDesc("$createdAt"),
  ]);
  return res.documents as unknown as Vehicle[];
}

export type CreateVehicleInput = Omit<Vehicle, "$id" | "status"> & {
  status?: VehicleStatus;
};

export async function createVehicle(
  aw: ShofeAppwrite,
  input: CreateVehicleInput,
): Promise<Vehicle> {
  const doc = await aw.databases.createDocument(
    aw.databaseId,
    COLLECTIONS.vehicles,
    ID.unique(),
    { status: "active", ...input },
  );
  return doc as unknown as Vehicle;
}
