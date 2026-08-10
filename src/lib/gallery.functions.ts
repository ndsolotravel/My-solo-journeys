import { createServerFn } from "@tanstack/react-start";

export type GalleryItem = {
  id: string;
  image_url: string;
  caption: string | null;
  category: string | null;
  width: number | null;
  height: number | null;
};

export const listGallery = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("gallery")
    .select("id,image_url,caption,category,width,height")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as GalleryItem[];
});
