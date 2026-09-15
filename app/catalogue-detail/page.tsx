import CatalogueDetailTabs from "@/components/CatalogueDetailPage/CatalogueDetailTabs";
import { catalogueQueryOptions } from "@/hooks/useCatalogues";
import { getQueryClient } from "@/services/queryClient";
import React from "react";

const page = async () => {
  const queryClient = getQueryClient();

  const catalogues = await queryClient.fetchQuery(catalogueQueryOptions.list());

  if (catalogues?.length) {
    await Promise.all(
      catalogues.map((catalogue) => {
        return [
          queryClient.prefetchQuery(
            catalogueQueryOptions.facetCoverage(
              catalogue.id as "ariadne" | "clarin-vlo" | "gotriple" | "sshomp",
            ),
          ),
          queryClient.prefetchQuery(
            catalogueQueryOptions.facets(
              catalogue.id as "ariadne" | "clarin-vlo" | "gotriple" | "sshomp",
            ),
          ),
          queryClient.prefetchQuery(
            catalogueQueryOptions.vocabularies(
              catalogue.id as "ariadne" | "clarin-vlo" | "gotriple" | "sshomp",
            ),
          ),
        ];
      }),
    );
  }

  return (
    <div className="py-6 px-8">
      <CatalogueDetailTabs />
    </div>
  );
};

export default page;
