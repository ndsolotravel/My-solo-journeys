import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/analytics" });
  },
});

export default function DashboardPage() {
  return null;
}
