import { ID } from "appwrite";
import type { BucketId } from "./collections";
import type { ShofeAppwrite } from "./client";

export async function uploadFile(
  aw: ShofeAppwrite,
  bucketId: BucketId,
  file: File,
): Promise<string> {
  const result = await aw.storage.createFile(bucketId, ID.unique(), file);
  return result.$id;
}

export function getFilePreviewUrl(aw: ShofeAppwrite, bucketId: BucketId, fileId: string): string {
  return aw.storage.getFilePreview(bucketId, fileId).toString();
}
