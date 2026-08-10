import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import { adminListComments, adminDeleteComment } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/comments")({
  component: AdminComments,
});

function AdminComments() {
  const listFn = useServerFn(adminListComments);
  const delFn = useServerFn(adminDeleteComment);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-comments"], queryFn: () => listFn() });
  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-comments"] }); toast.success("Deleted"); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Comments & Reviews</h1>
      <p className="mt-1 text-sm text-muted-foreground">Moderate visitor reviews. Delete inappropriate or spam comments.</p>

      <div className="mt-6 space-y-3">
        {isLoading && <p className="text-muted-foreground">Loading…</p>}
        {data?.map((c) => {
          const post = (c as { posts?: { title?: string; slug?: string } }).posts;
          return (
            <div key={c.id} className="rounded-2xl border border-border p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{c.guest_name || "Anonymous"}</p>
                  <p className="text-xs text-muted-foreground">
                    on <a href={`/blog/${post?.slug}`} target="_blank" rel="noreferrer" className="hover:text-accent">{post?.title ?? "Post"}</a> · {new Date(c.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {c.rating && (
                    <div className="inline-flex items-center gap-0.5">
                      {[1,2,3,4,5].map((i) => <Star key={i} className={`h-3.5 w-3.5 ${i <= (c.rating ?? 0) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />)}
                    </div>
                  )}
                  <button onClick={() => { if (confirm("Delete this comment?")) del.mutate(c.id); }} className="text-red-500 hover:bg-muted rounded p-1.5">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm whitespace-pre-wrap">{c.comment}</p>
              {c.guest_email && <p className="mt-2 text-xs text-muted-foreground">{c.guest_email}</p>}
            </div>
          );
        })}
        {data?.length === 0 && <p className="text-muted-foreground py-8 text-center">No comments yet.</p>}
      </div>
    </div>
  );
}
