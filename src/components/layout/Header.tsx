import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Search, User, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog } from "./SearchDialog";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import logoPath from "@/assets/ndsolo-travel-logo.png";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Stories" },
  { to: "/destinations", label: "Destinations" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    try {
      await queryClient.cancelQueries();
      queryClient.clear();
      await supabase.auth.signOut();
      try {
        for (const k of Object.keys(localStorage)) {
          if (k.startsWith("sb-") && k.endsWith("-auth-token")) localStorage.removeItem(k);
        }
      } catch (e) {
        // ignore: best-effort cleanup of auth tokens
      }
      setSignedIn(false);
      setIsStaff(false);
      setOpen(false);
      toast.success("Signed out");
      navigate({ to: "/auth", replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Sign out failed");
    }
  }

  // Only the home page has the big cinematic hero; on other pages keep the
  // bar solid blurred from the very top.
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile sheet on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const checkRoles = async (uid: string | undefined) => {
      if (!uid) return setIsStaff(false);
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid);
      const roles = (data ?? []).map((r) => r.role);
      setIsStaff(roles.includes("admin") || roles.includes("editor"));
    };
    supabase.auth.getSession().then(({ data }) => {
      setSignedIn(!!data.session);
      checkRoles(data.session?.user.id);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((e, session) => {
      if (e === "SIGNED_IN" || e === "SIGNED_OUT" || e === "USER_UPDATED") {
        setSignedIn(!!session);
        checkRoles(session?.user.id);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const headerClass = overHero
    ? "bg-transparent text-white"
    : "bg-background/85 backdrop-blur-md border-b border-border";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${headerClass}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src={logoPath}
              alt="ndsolotravel"
              className={`h-8 w-auto ${overHero ? "brightness-0 invert" : ""}`}
            />
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            {LINKS.map((l) => {
              const isHashLink = "hash" in l && !!l.hash;
              const active =
                !isHashLink &&
                (l.to === "/"
                  ? pathname === "/"
                  : pathname === l.to || pathname.startsWith(l.to + "/"));
              return (
                <Link
                  key={`${l.to}-${l.label}`}
                  to={l.to}
                  hash={isHashLink ? (l as { hash: string }).hash : undefined}
                  activeOptions={{ exact: l.to === "/" }}
                  className={`relative transition-colors duration-200 ease-in-out ${
                    overHero
                      ? active
                        ? "text-white font-medium"
                        : "text-white/75 hover:text-[#FF7A00]"
                      : active
                        ? "text-accent font-medium"
                        : "text-muted-foreground hover:text-[#FF7A00]"
                  }`}
                >
                  {l.label}
                  {active && (
                    <span
                      aria-hidden
                      className={`absolute left-0 right-0 -bottom-1 mx-auto h-px w-6 ${
                        overHero ? "bg-white" : "bg-accent"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                overHero
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-border/60 text-foreground hover:bg-muted/60"
              }`}
            >
              <Search className="h-4 w-4" />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <ThemeToggle />
            </div>
            {isStaff && (
              <Link
                to="/admin"
                className={`hidden sm:inline-flex items-center rounded-full border px-3 py-2 text-xs font-medium transition-colors ${
                  overHero
                    ? "border-white/30 text-white hover:bg-white/10"
                    : "border-border hover:border-accent"
                }`}
              >
                Admin
              </Link>
            )}
            <Link
              to={signedIn ? "/account" : "/auth"}
              aria-label={signedIn ? "Account" : "Sign in"}
              className={`hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition ${
                overHero
                  ? "bg-white text-foreground hover:bg-white/90"
                  : "bg-foreground text-background hover:opacity-90"
              }`}
            >
              {signedIn ? <User className="h-3.5 w-3.5" /> : null}
              {signedIn ? "Account" : "Sign in"}
            </Link>
            {signedIn && (
              <button
                type="button"
                onClick={handleSignOut}
                aria-label="Sign out"
                title="Sign out"
                className={`hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                  overHero
                    ? "border-white/30 text-white hover:bg-white/10"
                    : "border-border/60 text-foreground hover:bg-muted/60"
                }`}
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={open}
              className={`md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border ${
                overHero ? "border-white/30 text-white" : "border-border"
              }`}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-out */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-[60] bg-black/50"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}
      <aside
        className={`md:hidden fixed top-0 right-0 z-[70] h-dvh w-[82%] max-w-sm bg-background border-l border-border shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Menu
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex flex-col px-3 py-3">
          {LINKS.map((l) => {
            const isHashLink = "hash" in l && !!l.hash;
            const active =
              !isHashLink &&
              (l.to === "/"
                ? pathname === "/"
                : pathname === l.to || pathname.startsWith(l.to + "/"));
            return (
              <Link
                key={`${l.to}-${l.label}`}
                to={l.to}
                hash={isHashLink ? (l as { hash: string }).hash : undefined}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm transition-colors duration-200 ease-in-out ${
                  active
                    ? "bg-muted text-accent font-medium"
                    : "text-foreground hover:bg-muted hover:text-[#FF7A00]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-2 border-t border-border px-5 py-4 space-y-3">
          <button
            onClick={() => {
              setOpen(false);
              setSearchOpen(true);
            }}
            className="flex w-full items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted"
          >
            <Search className="h-4 w-4" /> Search
          </button>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Theme
            </span>
            <ThemeToggle />
          </div>
          {isStaff && (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="block w-full rounded-full border border-border px-4 py-2 text-center text-sm font-medium hover:border-accent"
            >
              Admin
            </Link>
          )}
          <Link
            to={signedIn ? "/account" : "/auth"}
            onClick={() => setOpen(false)}
            className="block w-full rounded-full bg-foreground px-4 py-2 text-center text-sm font-medium text-background"
          >
            {signedIn ? "Account" : "Sign in"}
          </Link>
          {signedIn && (
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          )}
        </div>
      </aside>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
