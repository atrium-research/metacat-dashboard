import FacetComparisonFiltersSidebar from "@/components/FacetComparisonPage/FacetComparisonFiltersSidebar";
import FacetComparison from "@/components/FacetComparisonPage";
import { catalogueQueryOptions } from "@/hooks/useCatalogues";
import { facetQueryOptions } from "@/hooks/useFacets";
import { getQueryClient } from "@/services/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facet Comparison",
  description: "Compare facets across catalogues",
};

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(catalogueQueryOptions.list());
  await queryClient.prefetchQuery(facetQueryOptions.list());

  const catalogues = queryClient.getQueryData(
    catalogueQueryOptions.list().queryKey,
  );

  if (catalogues?.length) {
    await Promise.all(
      catalogues.flatMap((catalogue) => [
        queryClient.prefetchQuery(
          catalogueQueryOptions.versionsLast(catalogue.id),
        ),
        queryClient.prefetchQuery(catalogueQueryOptions.versions(catalogue.id)),
      ]),
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex flex-1 w-full">
        <FacetComparisonFiltersSidebar />
        <FacetComparison />
      </main>
    </HydrationBoundary>
  );
};

export default page;
