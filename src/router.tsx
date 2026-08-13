import { dehydrate, hydrate, QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    dehydrate: () =>
      ({
        queryClient: dehydrate(queryClient),
      }) as never,
    hydrate: (data) => {
      if (data && typeof data === "object" && "queryClient" in data) {
        hydrate(queryClient, (data as { queryClient: unknown }).queryClient);
      }
    },
  });

  return router;
};
