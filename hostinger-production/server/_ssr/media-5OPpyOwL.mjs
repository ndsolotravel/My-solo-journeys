const __vite_import_meta_env__ = {};
const DEFAULT_SUPABASE_URL = "https://mqoybarqgzzvillignbr.supabase.co";
function resolveMediaUrl(urlOrPath, client) {
  if (!urlOrPath || typeof urlOrPath !== "string") return "";
  const trimmed = urlOrPath.trim();
  if (!trimmed) return "";
  if (trimmed.includes("unsplash.com") || trimmed.includes("unsplash-photos.com")) {
    return "";
  }
  if (trimmed.includes("drive.google.com") || trimmed.includes("docs.google.com")) {
    const fileIdMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
    }
  }
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
    return trimmed;
  }
  let cleanPath = trimmed.replace(/^\/+/, "");
  if (cleanPath.startsWith("blog-media/")) {
    cleanPath = cleanPath.slice("blog-media/".length);
  }
  if (client?.storage?.from) {
    try {
      const { data } = client.storage.from("blog-media").getPublicUrl(cleanPath);
      if (data?.publicUrl) return data.publicUrl;
    } catch {
    }
  }
  const baseUrl = (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL : "") || (typeof import.meta !== "undefined" && __vite_import_meta_env__ ? "https://mqoybarqgzzvillignbr.supabase.co" : "") || DEFAULT_SUPABASE_URL;
  return `${baseUrl.replace(/\/+$/, "")}/storage/v1/object/public/blog-media/${cleanPath}`;
}
function getOptimizedImageUrl(urlOrPath, width, client) {
  const resolved = resolveMediaUrl(urlOrPath, client);
  if (!resolved) return "";
  if (resolved.includes("lh3.googleusercontent.com/d/")) {
    const base = resolved.split("=")[0];
    const targetWidth = width && width > 0 ? Math.round(width) : 1600;
    return `${base}=w${targetWidth}-rw`;
  }
  return resolved;
}
function getImageSrcSet(urlOrPath, widths = [640, 1024, 1600], client) {
  const resolved = resolveMediaUrl(urlOrPath, client);
  if (!resolved || !resolved.includes("lh3.googleusercontent.com/d/")) {
    return "";
  }
  return widths.map((w) => `${getOptimizedImageUrl(resolved, w, client)} ${w}w`).join(", ");
}
function extractBlogMediaPath(url) {
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
export {
  getOptimizedImageUrl as a,
  extractBlogMediaPath as e,
  getImageSrcSet as g,
  resolveMediaUrl as r
};
