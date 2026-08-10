import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Eye, EyeOff, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";
import { adminListPosts, adminTogglePublish, adminDeletePost } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/posts/")({
  component: AdminPostsList,
});

function AdminPostsList() {
  const listFn = useServerFn(adminListPosts);
  const toggleFn = useServerFn(adminTogglePublish);
  const delFn = useServerFn(adminDeletePost);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-posts"], queryFn: () => listFn() });

  const toggle = useMutation({
    mutationFn: (v: { id: string; published: boolean }) => toggleFn({ data: v }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-posts"] }); toast.success("Updated"); },
    onError: (e: Error) => toast.error(e.message),
  });
  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-posts"] }); toast.success("Deleted"); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Posts</h1>
        <Link to="/admin/posts/new" className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm text-background hover:opacity-90">
          <Plus className="h-4 w-4" /> New post
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3 hidden sm:table-cell">Status</th>
              <th className="px-4 py-3 hidden md:table-cell">Views</th>
              <th className="px-4 py-3 hidden md:table-cell">Updated</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Loading…</td></tr>}
            {data?.map((p) => (
              <tr key={p.id} className="border-t border-border hover:bg-muted/30">
                <td className="px-4 py-3">
                  <Link to="/admin/posts/$id" params={{ id: p.id }} className="font-medium hover:text-accent line-clamp-1">{p.title}</Link>
                  <p className="text-xs text-muted-foreground line-clamp-1">/{p.slug}</p>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  {p.published ? <Badge tone="green">Published</Badge> : p.scheduled_at ? <Badge tone="amber"><Clock className="h-3 w-3" /> Scheduled</Badge> : <Badge tone="gray">Draft</Badge>}
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{p.views ?? 0}</td>
                <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{new Date(p.updated_at).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <IconBtn title={p.published ? "Unpublish" : "Publish now"} onClick={() => toggle.mutate({ id: p.id, published: !p.published })}>
                      {p.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </IconBtn>
                    <IconBtn title="Delete" onClick={() => { if (confirm(`Delete "${p.title}"?`)) del.mutate(p.id); }}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </IconBtn>
                  </div>
                </td>
              </tr>
            ))}
            {data?.length === 0 && <tr><td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">No posts yet — create your first.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Badge({ children, tone }: { children: React.ReactNode; tone: "green" | "amber" | "gray" }) {
  const cls = { green: "bg-emerald-500/10 text-emerald-600", amber: "bg-amber-500/10 text-amber-600", gray: "bg-muted text-muted-foreground" }[tone];
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs ${cls}`}>{children}</span>;
}
function IconBtn({ children, title, onClick }: { children: React.ReactNode; title: string; onClick: () => void }) {
  return <button type="button" title={title} onClick={onClick} className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted">{children}</button>;
}
