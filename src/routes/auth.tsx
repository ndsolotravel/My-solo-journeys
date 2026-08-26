import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { getMyRoles } from "@/lib/admin.functions";
import { toast } from "sonner";
import { ShieldAlert, Info, KeyRound, CheckCircle2, Lock, ArrowLeft, Mail } from "lucide-react";
import logoPath from "@/assets/ndsolo-travel-logo.png";

const authSearchSchema = z.object({
  redirect: z.string().optional(),
  error: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: authSearchSchema,
  head: () => ({
    meta: [
      { title: "Sign In — ndsolotravel" },
      {
        name: "description",
        content: "Sign in with your credentials to access the CMS or your account.",
      },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:url", content: "/auth" },
    ],
    links: [{ rel: "canonical", href: "/auth" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const redirectTarget = search.redirect || "";
  const isForAdmin = redirectTarget.startsWith("/admin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAdminHelp, setShowAdminHelp] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        if (redirectTarget) {
          navigate({ to: redirectTarget as "/admin" });
        } else {
          try {
            const roles = await getMyRoles();
            if (roles.includes("admin") || roles.includes("editor")) {
              navigate({ to: "/admin" });
            } else {
              navigate({ to: "/account" });
            }
          } catch {
            navigate({ to: "/account" });
          }
        }
      }
    });
  }, [navigate, redirectTarget]);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return toast.error("Please enter your email address");
    if (!password) return toast.error("Please enter your password");

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials") || error.status === 400) {
          throw new Error("Invalid email or password. Please check your credentials.");
        }
        if (error.message.includes("Email not confirmed")) {
          throw new Error("Your email address is not confirmed yet. Please check your inbox.");
        }
        throw error;
      }

      if (data.user) {
        toast.success("Signed in successfully");
        const { data: rolesData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id);
        const roles = ((rolesData as { role: string }[]) ?? []).map((r) => r.role);
        const isStaff = roles.includes("admin") || roles.includes("editor");

        if (redirectTarget) {
          navigate({ to: redirectTarget as "/admin" });
        } else if (isStaff) {
          navigate({ to: "/admin" });
        } else {
          navigate({ to: "/account" });
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return toast.error("Please enter your email address to reset password");

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth?redirect=${encodeURIComponent(redirectTarget || "/admin")}`,
      });

      if (error) throw error;
      setResetSent(true);
      toast.success("Password reset instructions sent! Please check your email.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <Link to="/" className="mx-auto inline-flex items-center gap-2">
        <img src={logoPath} alt="ndsolotravel" className="h-8 w-auto" />
      </Link>

      <div className="mt-8 rounded-3xl border border-border bg-card p-8 shadow-elegant">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">
            {showReset ? "Reset Password" : isForAdmin ? "Admin Sign In" : "Sign In"}
          </h1>
          {isForAdmin && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
              <KeyRound className="h-3 w-3" /> Admin CMS
            </span>
          )}
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          {showReset
            ? "Enter your email address to receive password reset instructions."
            : isForAdmin
              ? "Sign in with your admin credentials to access the CMS."
              : "Sign in to access your account."}
        </p>

        {search.error === "unauthorized_admin" && (
          <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2.5">
            <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />
            <div>
              <p className="font-semibold">Admin Role Required</p>
              <p className="mt-0.5">
                Your account is signed in, but your user ID needs to be granted the{" "}
                <code className="font-mono bg-background/50 px-1 py-0.5 rounded">admin</code> role
                in the{" "}
                <code className="font-mono bg-background/50 px-1 py-0.5 rounded">user_roles</code>{" "}
                table.
              </p>
            </div>
          </div>
        )}

        {showReset ? (
          <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <div className="relative mt-1">
                <input
                  type="email"
                  required
                  placeholder="admin@ndsolotravel.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
                />
              </div>
            </div>

            {resetSent ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>Password reset link sent to {email}. Check your inbox!</span>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? "Sending reset email…" : "Send Reset Link"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowReset(false);
                setResetSent(false);
              }}
              className="mt-2 flex w-full items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3 w-3" /> Back to Sign In
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignIn} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="admin@ndsolotravel.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowReset(true)}
                  className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs">
          <span className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
            <Lock className="h-3 w-3 text-muted-foreground/70" /> Authorized access only
          </span>
          <button
            type="button"
            onClick={() => setShowAdminHelp(!showAdminHelp)}
            className="text-accent hover:underline flex items-center gap-1"
          >
            <Info className="h-3.5 w-3.5" /> Admin Help
          </button>
        </div>

        {showAdminHelp && (
          <div className="mt-4 rounded-2xl border border-border bg-muted/30 p-4 text-xs space-y-2">
            <p className="font-semibold flex items-center gap-1.5 text-foreground">
              <CheckCircle2 className="h-4 w-4 text-accent" /> Assigning Admin Role in Supabase
            </p>
            <p className="text-muted-foreground">
              If your email exists in Supabase Auth but you receive an authorization error, run this
              SQL in your Supabase SQL Editor:
            </p>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-background p-3 text-[11px] text-foreground border border-border font-mono">
              {`INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = '${email || "your-email@example.com"}'
ON CONFLICT (user_id, role) DO NOTHING;`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
