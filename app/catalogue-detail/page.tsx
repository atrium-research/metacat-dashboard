import CatalogueDetailTabs from "@/components/CatalogueDetailPage/CatalogueDetailTabs";
import { catalogueQueryOptions } from "@/hooks/useCatalogues";
import { vocabularyQueryOptions } from "@/hooks/useVocabularies";
import { getQueryClient } from "@/services/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(catalogueQueryOptions.list());
  const catalogues = queryClient.getQueryData(
    catalogueQueryOptions.list().queryKey,
  );
  await queryClient.prefetchQuery(vocabularyQueryOptions.list());

  if (catalogues?.length) {
    await Promise.all(
      catalogues.map((catalogue) =>
        queryClient.prefetchQuery(
          catalogueQueryOptions.versionsLast(catalogue.id),
        ),
      ),
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="py-6 px-8">
        <CatalogueDetailTabs />
      </div>
    </HydrationBoundary>
  );
};

export default page;
