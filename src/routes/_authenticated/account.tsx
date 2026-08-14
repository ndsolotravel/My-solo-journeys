import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [
      { title: "Account — ndsolotravel" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email ?? "");
      const { data } = await (supabase.from("profiles") as any).select("username,bio").eq("id", user.id).maybeSingle();
      if (data) {
        setUsername((data as any).username ?? "");
        setBio((data as any).bio ?? "");
      }
    })();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await (supabase
      .from("profiles") as any)
      .upsert({ id: user.id, username, bio });
    setLoading(false);
    if (error) toast.error(error.message);
    else toast.success("Profile saved");
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold">Your account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Signed in as {email}</p>

      <form onSubmit={save} className="mt-8 space-y-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Bio</label>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background disabled:opacity-50">
            {loading ? "Saving…" : "Save profile"}
          </button>
          <button type="button" onClick={signOut} className="rounded-full border border-border px-5 py-2.5 text-sm">
            Sign out
          </button>
        </div>
      </form>
    </div>
  );
}
