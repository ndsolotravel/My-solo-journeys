import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, ExternalLink } from "lucide-react";
import { HeroBannerManager } from "@/components/admin/HeroBannerManager";

export const Route = createFileRoute("/_authenticated/admin/contact")({
  head: () => ({
    meta: [{ title: "Contact Page — Admin CMS" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminContactPage,
});

function AdminContactPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar matching other CMS pages */}
      <div className="sticky top-16 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-brand/10 text-brand">
            <Mail className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Contact Page Management
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage the banner image at the top of the public contact page.
            </p>
          </div>
        </div>

        <Link
          to="/contact"
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer shadow-2xs shrink-0"
        >
          <ExternalLink className="h-3.5 w-3.5 text-accent" />
          <span>View Contact Page</span>
        </Link>
      </div>

      <HeroBannerManager
        page="contact"
        autoHint="Automatically uses a suitable image from the site's available photo content."
        manualHint="Pick an image from the site's available photos below, upload one, or paste a URL."
        optionsLabel="Available Site Images"
      />
    </div>
  );
}
