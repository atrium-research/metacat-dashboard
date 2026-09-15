import OverviewWrapper from "@/components/OverviewPage/OverviewWrapper";
import { catalogueQueryOptions } from "@/hooks/useCatalogues";
import { facetQueryOptions } from "@/hooks/useFacets";
import { getQueryClient } from "@/services/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(catalogueQueryOptions.list());
  const catalogues = queryClient.getQueryData(
    catalogueQueryOptions.list().queryKey,
  );
  await queryClient.prefetchQuery(facetQueryOptions.list());

  if (catalogues?.length) {
    await Promise.all(
      catalogues.map((catalogue) =>
        queryClient.prefetchQuery(
          catalogueQueryOptions.versionsLast(
            catalogue.id as "ariadne" | "clarin-vlo" | "gotriple" | "sshomp",
          ),
        ),
      ),
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OverviewWrapper />
    </HydrationBoundary>
  );
}
