import { api } from "@/lib/api";
import type { UploadResponse } from "./types";

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.upload<UploadResponse>("/api/upload/image", formData);
  return response.data.url;
}
