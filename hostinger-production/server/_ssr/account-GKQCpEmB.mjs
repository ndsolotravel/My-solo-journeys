import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-DGR_8Jr1.mjs";
import { t as toast } from "../_libs/sonner.mjs";

import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/unenv.mjs";


import "../_libs/seroval-plugins.mjs";


import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
function AccountPage() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [username, setUsername] = reactExports.useState("");
  const [bio, setBio] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    (async () => {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email ?? "");
      const {
        data
      } = await supabase.from("profiles").select("username,bio").eq("id", user.id).maybeSingle();
      if (data) {
        setUsername(data.username ?? "");
        setBio(data.bio ?? "");
      }
    })();
  }, []);
  async function save(e) {
    e.preventDefault();
    setLoading(true);
    const {
      data: {
        user
      }
    } = await supabase.auth.getUser();
    if (!user) return;
    const {
      error
    } = await supabase.from("profiles").upsert({
      id: user.id,
      username,
      bio
    });
    setLoading(false);
    if (error) toast.error(error.message);
    else toast.success("Profile saved");
  }
  async function signOut() {
    await supabase.auth.signOut();
    navigate({
      to: "/",
      replace: true
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-4 py-16 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Your account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
      "Signed in as ",
      email
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "mt-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Username" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: username, onChange: (e) => setUsername(e.target.value), className: "mt-1 w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Bio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, value: bio, onChange: (e) => setBio(e.target.value), className: "mt-1 w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background disabled:opacity-50", children: loading ? "Saving…" : "Save profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: signOut, className: "rounded-full border border-border px-5 py-2.5 text-sm", children: "Sign out" })
      ] })
    ] })
  ] });
}
export {
  AccountPage as component
};
