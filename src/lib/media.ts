const DEFAULT_SUPABASE_URL = "https://mqoybarqgzzvillignbr.supabase.co";

/**
 * Pure client-safe utility to resolve Supabase storage and CDN media URLs.
 * Can be safely imported in both client-side and server-side components.
 */
export function resolveMediaUrl(urlOrPath: string | null | undefined, client?: any): string {
  if (!urlOrPath || typeof urlOrPath !== "string") return "";
  const trimmed = urlOrPath.trim();
  if (!trimmed) return "";

  // Convert Google Drive sharing/file links into direct renderable CDN image links
  if (trimmed.includes("drive.google.com")) {
    const fileIdMatch =
      trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
    }
  }

  // If it's already an absolute HTTP(S) URL or data/blob URI
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }

  // It's a storage path in blog-media (e.g. "userId/filename.jpg" or "/blog-media/userId/filename.jpg")
  let cleanPath = trimmed.replace(/^\/+/, "");
  if (cleanPath.startsWith("blog-media/")) {
    cleanPath = cleanPath.slice("blog-media/".length);
  }

  if (client?.storage?.from) {
    try {
      const { data } = client.storage.from("blog-media").getPublicUrl(cleanPath);
      if (data?.publicUrl) return data.publicUrl;
    } catch {
      // fallback
    }
  }

  const baseUrl =
    (typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
      : "") ||
    (typeof import.meta !== "undefined" && import.meta.env
      ? import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL
      : "") ||
    DEFAULT_SUPABASE_URL;

  return `${baseUrl.replace(/\/+$/, "")}/storage/v1/object/public/blog-media/${cleanPath}`;
}

export function extractBlogMediaPath(url: string | null | undefined): string | null {
  if (!url || typeof url !== "string") return null;
  try {
    const cleanUrl = url.split("?")[0].split("#")[0].trim();
    const marker = "/blog-media/";
    const markerIdx = cleanUrl.indexOf(marker);
    if (markerIdx === -1) return null;
    const pathPart = cleanUrl.slice(markerIdx + marker.length);
    return pathPart ? decodeURIComponent(pathPart) : null;
  } catch {
    return null;
  }
}
