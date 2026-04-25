export type Role = "driver" | "fleet_owner" | "admin";

export type VerificationStatus = "pending" | "verified" | "rejected";

export type JobStatus = "open" | "closed" | "filled";

export type ApplicationStatus = "pending" | "accepted" | "rejected";

export type VehicleStatus = "active" | "inactive" | "in_service";

export interface Profile {
  $id: string;
  userId: string;
  role: Role;
  fullName: string;
  phone: string;
  verificationStatus: VerificationStatus;
  $createdAt: string;
  $updatedAt: string;
}

export interface Driver {
  $id: string;
  profileId: string;
  licenseNumber: string;
  licenseExpiry: string;
  licenseFileId: string | null;
  idFileId: string | null;
  yearsExperience: number;
}

export interface FleetOwner {
  $id: string;
  profileId: string;
  companyName: string;
  companyRegNumber: string | null;
}

export interface Vehicle {
  $id: string;
  ownerId: string;
  make: string;
  model: string;
  year: number;
  plate: string;
  logbookFileId: string | null;
  insuranceFileId: string | null;
  status: VehicleStatus;
}

export interface Job {
  $id: string;
  ownerId: string;
  vehicleId: string;
  title: string;
  description: string;
  workingConditions: string;
  dailyTargetKm: number;
  dailyTargetRevenue: number | null;
  payStructure: string;
  status: JobStatus;
  $createdAt: string;
}

export interface Application {
  $id: string;
  jobId: string;
  driverProfileId: string;
  coverNote: string;
  status: ApplicationStatus;
  $createdAt: string;
}
