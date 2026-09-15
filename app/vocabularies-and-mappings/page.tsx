import VocabulariesAndMappingsWrapper from "@/components/VocabulariesAndMappingsPage/VocabulariesAndMappingsWrapper";
import { catalogueQueryOptions } from "@/hooks/useCatalogues";
import { mappingQueryOptions } from "@/hooks/useMappings";
import { vocabularyQueryOptions } from "@/hooks/useVocabularies";
import { getQueryClient } from "@/services/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(catalogueQueryOptions.list());
  await queryClient.prefetchQuery(mappingQueryOptions.list());
  await queryClient.prefetchQuery(vocabularyQueryOptions.list());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VocabulariesAndMappingsWrapper />
    </HydrationBoundary>
  );
};

export default page;
