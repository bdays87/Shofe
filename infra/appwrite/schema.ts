// Schema-as-code for the Shofe Appwrite project. `sync.ts` reads this and
// idempotently creates/updates the database, collections, attributes, indexes,
// and storage buckets.

export interface AttributeSpec {
  key: string;
  type: "string" | "integer" | "float" | "boolean" | "datetime" | "enum";
  size?: number;
  required: boolean;
  array?: boolean;
  elements?: string[]; // for enum
  default?: string | number | boolean | null;
}

export interface IndexSpec {
  key: string;
  type: "key" | "unique" | "fulltext";
  attributes: string[];
}

export interface CollectionSpec {
  id: string;
  name: string;
  attributes: AttributeSpec[];
  indexes?: IndexSpec[];
}

export interface BucketSpec {
  id: string;
  name: string;
  fileSecurity: boolean;
  maximumFileSize: number; // bytes
  allowedFileExtensions?: string[];
}

export const COLLECTIONS: CollectionSpec[] = [
  {
    id: "profiles",
    name: "Profiles",
    attributes: [
      { key: "userId", type: "string", size: 36, required: true },
      {
        key: "role",
        type: "enum",
        required: true,
        elements: ["driver", "fleet_owner", "admin"],
      },
      { key: "fullName", type: "string", size: 255, required: true },
      { key: "phone", type: "string", size: 32, required: true },
      {
        key: "verificationStatus",
        type: "enum",
        required: true,
        elements: ["pending", "verified", "rejected"],
        default: "pending",
      },
    ],
    indexes: [
      { key: "by_userId", type: "unique", attributes: ["userId"] },
      { key: "by_role", type: "key", attributes: ["role"] },
    ],
  },
  {
    id: "drivers",
    name: "Drivers",
    attributes: [
      { key: "profileId", type: "string", size: 36, required: true },
      { key: "licenseNumber", type: "string", size: 64, required: true },
      { key: "licenseExpiry", type: "datetime", required: true },
      { key: "licenseFileId", type: "string", size: 36, required: false },
      { key: "idFileId", type: "string", size: 36, required: false },
      { key: "yearsExperience", type: "integer", required: true, default: 0 },
    ],
    indexes: [{ key: "by_profileId", type: "unique", attributes: ["profileId"] }],
  },
  {
    id: "fleet_owners",
    name: "Fleet owners",
    attributes: [
      { key: "profileId", type: "string", size: 36, required: true },
      { key: "companyName", type: "string", size: 255, required: true },
      { key: "companyRegNumber", type: "string", size: 64, required: false },
    ],
    indexes: [{ key: "by_profileId", type: "unique", attributes: ["profileId"] }],
  },
  {
    id: "vehicles",
    name: "Vehicles",
    attributes: [
      { key: "ownerId", type: "string", size: 36, required: true },
      { key: "make", type: "string", size: 64, required: true },
      { key: "model", type: "string", size: 64, required: true },
      { key: "year", type: "integer", required: true },
      { key: "plate", type: "string", size: 32, required: true },
      { key: "logbookFileId", type: "string", size: 36, required: false },
      { key: "insuranceFileId", type: "string", size: 36, required: false },
      {
        key: "status",
        type: "enum",
        required: true,
        elements: ["active", "inactive", "in_service"],
        default: "active",
      },
    ],
    indexes: [
      { key: "by_owner", type: "key", attributes: ["ownerId"] },
      { key: "by_plate", type: "unique", attributes: ["plate"] },
    ],
  },
  {
    id: "jobs",
    name: "Jobs",
    attributes: [
      { key: "ownerId", type: "string", size: 36, required: true },
      { key: "vehicleId", type: "string", size: 36, required: true },
      { key: "title", type: "string", size: 255, required: true },
      { key: "description", type: "string", size: 4000, required: true },
      { key: "workingConditions", type: "string", size: 4000, required: true },
      { key: "dailyTargetKm", type: "integer", required: true, default: 0 },
      { key: "dailyTargetRevenue", type: "integer", required: false },
      { key: "payStructure", type: "string", size: 255, required: true },
      {
        key: "status",
        type: "enum",
        required: true,
        elements: ["open", "closed", "filled"],
        default: "open",
      },
    ],
    indexes: [
      { key: "by_owner", type: "key", attributes: ["ownerId"] },
      { key: "by_status", type: "key", attributes: ["status"] },
    ],
  },
  {
    id: "applications",
    name: "Applications",
    attributes: [
      { key: "jobId", type: "string", size: 36, required: true },
      { key: "driverProfileId", type: "string", size: 36, required: true },
      { key: "coverNote", type: "string", size: 2000, required: true },
      {
        key: "status",
        type: "enum",
        required: true,
        elements: ["pending", "accepted", "rejected"],
        default: "pending",
      },
    ],
    indexes: [
      { key: "by_job", type: "key", attributes: ["jobId"] },
      { key: "by_driver", type: "key", attributes: ["driverProfileId"] },
    ],
  },

  // Phase 2 — driver location tracking. Add to COLLECTIONS once the mobile app
  // starts reporting Capacitor Geolocation pings.
  // {
  //   id: "tracking_pings",
  //   name: "Tracking pings",
  //   attributes: [
  //     { key: "driverProfileId", type: "string", size: 36, required: true },
  //     { key: "jobId", type: "string", size: 36, required: false },
  //     { key: "lat", type: "float", required: true },
  //     { key: "lng", type: "float", required: true },
  //     { key: "speedKph", type: "float", required: false },
  //     { key: "recordedAt", type: "datetime", required: true },
  //   ],
  //   indexes: [
  //     { key: "by_driver_recordedAt", type: "key", attributes: ["driverProfileId", "recordedAt"] },
  //     { key: "by_job_recordedAt", type: "key", attributes: ["jobId", "recordedAt"] },
  //   ],
  // },
];

export const BUCKETS: BucketSpec[] = [
  {
    id: "driver-docs",
    name: "Driver documents",
    fileSecurity: true,
    maximumFileSize: 10 * 1024 * 1024,
    allowedFileExtensions: ["pdf", "jpg", "jpeg", "png", "webp"],
  },
  {
    id: "vehicle-docs",
    name: "Vehicle documents",
    fileSecurity: true,
    maximumFileSize: 10 * 1024 * 1024,
    allowedFileExtensions: ["pdf", "jpg", "jpeg", "png", "webp"],
  },
  {
    id: "avatars",
    name: "Avatars",
    fileSecurity: false,
    maximumFileSize: 2 * 1024 * 1024,
    allowedFileExtensions: ["jpg", "jpeg", "png", "webp"],
  },
];
