import { getAccessToken } from "./supabase";

const API = process.env.NEXT_PUBLIC_API_URL;

export interface GalleryItem {
  id: string;
  src: string;
  storage_path: string | null;
  title: string;
  description: string;
  category: "Outreach" | "Skill Training" | "Campaign" | "Community";
  date: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type GalleryItemCreate = Omit<GalleryItem, "id" | "created_at" | "updated_at">;
export type GalleryItemUpdate = Partial<GalleryItemCreate>;

/** Builds auth headers for protected requests */
async function authHeaders(): Promise<HeadersInit> {
  const token = await getAccessToken();
  if (!token) throw new Error("Not authenticated");
  return { Authorization: `Bearer ${token}` };
}

export const galleryApi = {
  /** Public — fetch all gallery items (no auth needed) */
  getAll: async (): Promise<GalleryItem[]> => {
    const res = await fetch(`${API}/api/v1/gallery`);
    if (!res.ok) throw new Error("Failed to fetch gallery items");
    return res.json();
  },

  /** Upload an image file to Supabase Storage via FastAPI. Returns { url, storage_path }. */
  uploadImage: async (file: File): Promise<{ url: string; storage_path: string }> => {
    const headers = await authHeaders();
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API}/api/v1/gallery/upload`, {
      method: "POST",
      headers,
      body: form,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail ?? "Image upload failed");
    }
    return res.json();
  },

  /** Create a new gallery item */
  create: async (item: GalleryItemCreate): Promise<GalleryItem> => {
    const headers = await authHeaders();
    const res = await fetch(`${API}/api/v1/gallery`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail ?? "Failed to create gallery item");
    }
    return res.json();
  },

  /** Update an existing gallery item by id */
  update: async (id: string, item: GalleryItemUpdate): Promise<GalleryItem> => {
    const headers = await authHeaders();
    const res = await fetch(`${API}/api/v1/gallery/${id}`, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail ?? "Failed to update gallery item");
    }
    return res.json();
  },

  /** Delete a gallery item by id */
  delete: async (id: string): Promise<void> => {
    const headers = await authHeaders();
    const res = await fetch(`${API}/api/v1/gallery/${id}`, {
      method: "DELETE",
      headers,
    });
    if (!res.ok && res.status !== 204) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail ?? "Failed to delete gallery item");
    }
  },
};
