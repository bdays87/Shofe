export const COLLECTIONS = {
  profiles: "profiles",
  drivers: "drivers",
  fleetOwners: "fleet_owners",
  vehicles: "vehicles",
  jobs: "jobs",
  applications: "applications",
} as const;

export const BUCKETS = {
  driverDocs: "driver-docs",
  vehicleDocs: "vehicle-docs",
  avatars: "avatars",
} as const;

export type CollectionId = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
export type BucketId = (typeof BUCKETS)[keyof typeof BUCKETS];
