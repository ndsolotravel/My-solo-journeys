import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { PostEditor } from "@/components/admin/PostEditor";
import { adminGetPost } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/posts/$id")({
  component: EditPostPage,
});

function EditPostPage() {
  const { id } = Route.useParams();
  const fn = useServerFn(adminGetPost);
  const { data, isLoading } = useQuery({
    queryKey: ["admin-post", id],
    queryFn: () => fn({ data: { id } }),
  });
  if (isLoading) return <p className="text-muted-foreground">Loading…</p>;
  if (!data) return <p className="text-muted-foreground">Post not found.</p>;
  return <PostEditor initial={data} />;
}
