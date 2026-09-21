"use client";

import { catalogueQueryOptions } from "@/hooks/useCatalogues";
import { useCatalogueIds } from "@/hooks/useFacets";
import { countCatalogueGapsForFacet } from "@/utils/buildFacetComparison";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";

export const useFacetGapCounts = (
  facetNames: string[],
): Record<string, number> => {
  const catalogueIds = useCatalogueIds();

  const versionsLast = useQueries({
    queries: catalogueIds.map((id) => catalogueQueryOptions.versionsLast(id)),
  });

  return useMemo(() => {
    const versions = versionsLast.map((result) => result.data);
    const gapCountByFacet: Record<string, number> = {};

    facetNames.forEach((name) => {
      gapCountByFacet[name] = countCatalogueGapsForFacet(name, versions);
    });

    return gapCountByFacet;
  }, [facetNames, versionsLast]);
};
