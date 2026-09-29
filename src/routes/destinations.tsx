import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/destinations")({
  
});

export default function DestinationsLayout() {
  return <Outlet />;
}
