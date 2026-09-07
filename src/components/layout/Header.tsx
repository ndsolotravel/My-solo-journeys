import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Search, User, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog } from "./SearchDialog";
import { LanguageSelector } from "./LanguageSelector";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useTranslations } from "@/lib/translate/store";
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
  const t = useTranslations();
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
      toast.success(t("Signed out"));
      navigate({ to: "/auth", replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("Sign out failed"));
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${headerClass} ${
          overHero ? "py-4" : "py-3 shadow-xs"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 shrink-0 transition-transform duration-300 hover:scale-[1.02]">
            <img
              src={logoPath}
              alt="ndsolotravel"
              className={`h-8 w-auto transition-all duration-500 ${overHero ? "brightness-0 invert" : ""}`}
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
                  className={`group relative py-1 text-sm font-medium transition-colors duration-300 ${
                    overHero
                      ? active
                        ? "text-white font-semibold"
                        : "text-white/80 hover:text-white"
                      : active
                        ? "text-accent font-semibold"
                        : "text-foreground/80 hover:text-[#FF7A00]"
                  }`}
                >
                  <span className="relative z-10">{t(l.label)}</span>
                  {active && (
                    <span
                      className={`absolute inset-x-0 -bottom-1 h-0.5 rounded-full transition-all duration-300 ${
                        overHero ? "bg-white" : "bg-accent"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <button
              onClick={() => setSearchOpen(true)}
              aria-label={t("Search")}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
                overHero
                  ? "border-white/30 text-white hover:bg-white/10 hover:scale-105"
                  : "border-border/60 text-foreground hover:bg-muted/60 hover:scale-105"
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
                className={`hidden sm:inline-flex items-center rounded-full border px-3 py-2 text-xs font-medium transition-all duration-300 ${
                  overHero
                    ? "border-white/30 text-white hover:bg-white/10 hover:scale-105"
                    : "border-border hover:border-accent hover:scale-105"
                }`}
              >
                {t("Admin")}
              </Link>
            )}
            <Link
              to={signedIn ? "/account" : "/auth"}
              aria-label={signedIn ? t("Account") : t("Sign in")}
              className={`hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                overHero
                  ? "bg-white text-foreground hover:bg-white/90 hover:scale-105"
                  : "bg-foreground text-background hover:opacity-90 hover:scale-105"
              }`}
            >
              {signedIn ? <User className="h-3.5 w-3.5" /> : null}
              {signedIn ? t("Account") : t("Sign in")}
            </Link>
            {signedIn && (
              <button
                type="button"
                onClick={handleSignOut}
                aria-label={t("Sign out")}
                title={t("Sign out")}
                className={`hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
                  overHero
                    ? "border-white/30 text-white hover:bg-white/10 hover:scale-105"
                    : "border-border/60 text-foreground hover:bg-muted/60 hover:scale-105"
                }`}
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={t("Menu")}
              aria-expanded={open}
              className={`md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
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
          className="md:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}
      <aside
        className={`md:hidden fixed top-0 right-0 z-[70] h-dvh w-[82%] max-w-sm bg-background border-l border-border shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] rtl:right-auto rtl:left-0 rtl:border-l-0 rtl:border-r ${
          open
            ? "translate-x-0"
            : "translate-x-full rtl:-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("Menu")}
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label={t("Close menu")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex flex-col px-3 py-3">
          {LINKS.map((l, idx) => {
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
                style={{
                  transitionDelay: open ? `${idx * 40}ms` : "0ms",
                  transform: open ? "translateX(0)" : "translateX(16px)",
                  opacity: open ? 1 : 0,
                }}
                className={`rounded-lg px-4 py-3 text-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  active
                    ? "bg-muted text-accent font-medium"
                    : "text-foreground hover:bg-muted hover:text-[#FF7A00]"
                }`}
              >
                {t(l.label)}
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
            <Search className="h-4 w-4" /> {t("Search")}
          </button>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              {t("Theme")}
            </span>
            <ThemeToggle />
          </div>
          {isStaff && (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="block w-full rounded-full border border-border px-4 py-2 text-center text-sm font-medium hover:border-accent"
            >
              {t("Admin")}
            </Link>
          )}
          <Link
            to={signedIn ? "/account" : "/auth"}
            onClick={() => setOpen(false)}
            className="block w-full rounded-full bg-foreground px-4 py-2 text-center text-sm font-medium text-background"
          >
            {signedIn ? t("Account") : t("Sign in")}
          </Link>
          {signedIn && (
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              <LogOut className="h-4 w-4" /> {t("Sign out")}
            </button>
          )}
        </div>
      </aside>


      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
