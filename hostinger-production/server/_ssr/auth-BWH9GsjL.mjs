import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { supabase } from "./client-BaIz-VBI.mjs";
import { g as getMyRoles } from "./admin.functions-CnC9mk6Y.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as Route$s, l as logoPath } from "./router-BbnFzWay.mjs";
import "../_libs/ws.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import { K as KeyRound, q as ShieldAlert, o as CircleCheck, r as ArrowLeft, s as Lock, t as Info } from "../_libs/lucide-react.mjs";
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
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "./auth-middleware-BO6ULLpK.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function AuthPage() {
  const navigate = useNavigate();
  const search = Route$s.useSearch();
  const redirectTarget = search.redirect || "";
  const isForAdmin = redirectTarget.startsWith("/admin");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [showAdminHelp, setShowAdminHelp] = reactExports.useState(false);
  const [showReset, setShowReset] = reactExports.useState(false);
  const [resetSent, setResetSent] = reactExports.useState(false);
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
  async function handleSignIn(e) {
    e.preventDefault();
    if (!email.trim()) return toast.error("Please enter your email address");
    if (!password) return toast.error("Please enter your password");
    setLoading(true);
    try {
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
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }
  async function handleResetPassword(e) {
    e.preventDefault();
    if (!email.trim()) return toast.error("Please enter your email address to reset password");
    setLoading(true);
    try {
      const {
        error
      } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth?redirect=${encodeURIComponent(redirectTarget || "/admin")}`
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mx-auto inline-flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoPath, alt: "ndsolotravel", className: "h-8 w-auto" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-3xl border border-border bg-card p-8 shadow-elegant", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: showReset ? "Reset Password" : isForAdmin ? "Admin Sign In" : "Sign In" }),
        isForAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-3 w-3" }),
          " Admin CMS"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: showReset ? "Enter your email address to receive password reset instructions." : isForAdmin ? "Sign in with your admin credentials to access the CMS." : "Sign in to access your account." }),
      search.error === "unauthorized_admin" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4 shrink-0 mt-0.5 text-amber-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Admin Role Required" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5", children: [
            "Your account is signed in, but your user ID needs to be granted the",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono bg-background/50 px-1 py-0.5 rounded", children: "admin" }),
            " role in the",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono bg-background/50 px-1 py-0.5 rounded", children: "user_roles" }),
            " ",
            "table."
          ] })
        ] })
      ] }),
      showReset ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleResetPassword, className: "mt-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, placeholder: "admin@ndsolotravel.com", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" }) })
        ] }),
        resetSent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 shrink-0 text-emerald-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Password reset link sent to ",
            email,
            ". Check your inbox!"
          ] })
        ] }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "w-full rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50 transition-opacity", children: loading ? "Sending reset email…" : "Send Reset Link" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
          setShowReset(false);
          setResetSent(false);
        }, className: "mt-2 flex w-full items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3 w-3" }),
          " Back to Sign In"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSignIn, className: "mt-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, placeholder: "admin@ndsolotravel.com", value: email, onChange: (e) => setEmail(e.target.value), className: "mt-1 w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowReset(true), className: "text-[11px] text-muted-foreground hover:text-foreground transition-colors", children: "Forgot password?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, minLength: 6, placeholder: "••••••••", value: password, onChange: (e) => setPassword(e.target.value), className: "mt-1 w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "w-full rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50 transition-opacity", children: loading ? "Signing in…" : "Sign In" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1.5 text-[11px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3 text-muted-foreground/70" }),
          " Authorized access only"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setShowAdminHelp(!showAdminHelp), className: "text-accent hover:underline flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-3.5 w-3.5" }),
          " Admin Help"
        ] })
      ] }),
      showAdminHelp && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl border border-border bg-muted/30 p-4 text-xs space-y-2", children: [
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
