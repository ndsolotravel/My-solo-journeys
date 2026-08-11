import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-BaX1TKIB.mjs";
import { R as Route$g, g as getMyRoles, l as logoPath } from "./router-Pb4k1ggT.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import { K as KeyRound, h as ShieldAlert, i as Info, j as CircleCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./auth-middleware-7J1GkVFt.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
function AuthPage() {
  const navigate = useNavigate();
  const search = Route$g.useSearch();
  const redirectTarget = search.redirect || "";
  const isForAdmin = redirectTarget.startsWith("/admin");
  const [mode, setMode] = reactExports.useState("signin");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [showAdminHelp, setShowAdminHelp] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(async ({
      data
    }) => {
      if (data.session) {
        if (redirectTarget) {
          navigate({
            to: redirectTarget
          });
        } else {
          try {
            const roles = await getMyRoles();
            if (roles.includes("admin") || roles.includes("editor")) {
              navigate({
                to: "/admin"
              });
            } else {
              navigate({
                to: "/account"
              });
            }
          } catch {
            navigate({
              to: "/account"
            });
          }
        }
      }
    });
  }, [navigate, redirectTarget]);
  async function handleAuth(e) {
    e.preventDefault();
    if (!email.trim()) return toast.error("Please enter your email address");
    if (!password) return toast.error("Please enter your password");
    setLoading(true);
    try {
      if (mode === "signin") {
        const {
          data,
          error
        } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
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
          const {
            data: rolesData
          } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
          const roles = (rolesData ?? []).map((r) => r.role);
          const isStaff = roles.includes("admin") || roles.includes("editor");
          if (redirectTarget) {
            navigate({
              to: redirectTarget
            });
          } else if (isStaff) {
            navigate({
              to: "/admin"
            });
          } else {
            navigate({
              to: "/account"
            });
          }
        }
      } else {
        const {
          error
        } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        if (error) throw error;
        toast.success("Account created successfully! You can now sign in.");
        setMode("signin");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }
  async function onGoogle() {
    setLoading(true);
    const {
      error
    } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${redirectTarget ? redirectTarget : "/"}`
      }
    });
    if (error) {
      toast.error("Google sign-in failed: " + error.message);
      setLoading(false);
      return;
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mx-auto inline-flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoPath, alt: "ndsolotravel", className: "h-8 w-auto" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-3xl border border-border bg-card p-8 shadow-elegant", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: isForAdmin ? "Admin Sign In" : mode === "signin" ? "Welcome back" : "Join the journey" }),
        isForAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-3 w-3" }),
          " Admin CMS"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: isForAdmin ? "Sign in with your admin credentials to access the CMS." : mode === "signin" ? "Sign in to manage posts and save stories." : "Create an account to join the journey." }),
      search.error === "unauthorized_admin" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4 shrink-0 mt-0.5 text-amber-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Admin Role Required" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5", children: [
            "Your account is signed in, but your user ID needs to be granted the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono bg-background/50 px-1 py-0.5 rounded", children: "admin" }),
            " role in the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono bg-background/50 px-1 py-0.5 rounded", children: "user_roles" }),
            " table."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: onGoogle, disabled: loading, className: "mt-6 flex w-full items-center justify-center gap-3 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-muted disabled:opacity-50 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", "aria-hidden": true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FBBC05", d: "M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z" })
        ] }),
        "Continue with Google"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-6 flex items-center gap-3 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" }),
        " or ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAuth, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, placeholder: "admin@ndsolotravel.com", value: email, onChange: (e) => setEmail(e.target.value), className: "mt-1 w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, minLength: 6, placeholder: "••••••••", value: password, onChange: (e) => setPassword(e.target.value), className: "mt-1 w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "w-full rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50 transition-opacity", children: loading ? "Authenticating…" : mode === "signin" ? "Sign in" : "Create account" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode(mode === "signin" ? "signup" : "signin"), className: "text-muted-foreground hover:text-foreground underline underline-offset-4", children: mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setShowAdminHelp(!showAdminHelp), className: "text-accent hover:underline flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-3.5 w-3.5" }),
          " Admin Help"
        ] })
      ] }),
      showAdminHelp && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-2xl border border-border bg-muted/30 p-4 text-xs space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold flex items-center gap-1.5 text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-accent" }),
          " Assigning Admin Role in Supabase"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "If your email exists in Supabase Auth but you receive an authorization error, run this SQL in your Supabase SQL Editor:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-2 overflow-x-auto rounded-xl bg-background p-3 text-[11px] text-foreground border border-border font-mono", children: `INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = '${email || "your-email@example.com"}'
ON CONFLICT (user_id, role) DO NOTHING;` })
      ] })
    ] })
  ] });
}
export {
  AuthPage as component
};
