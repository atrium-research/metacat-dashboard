import FacetComparisonFiltersSidebar from "@/components/FacetComparisonPage/FacetComparisonFiltersSidebar";
import FacetComparison from "@/components/FacetComparisonPage";
import { catalogueQueryOptions } from "@/hooks/useCatalogues";
import { getQueryClient } from "@/services/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facet Comparison",
  description: "Compare facets across catalogues",
};

const page = async () => {
  const queryClient = getQueryClient();

  const catalogues = await queryClient.fetchQuery(catalogueQueryOptions.list());

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
      <main className="flex flex-1 w-full">
        {/* <FacetComparisonFiltersSidebar />
        <FacetComparison /> */}
        Facet Filters and Comparision waiting for endpoints.
      </main>
    </HydrationBoundary>
  );
};

export default page;
