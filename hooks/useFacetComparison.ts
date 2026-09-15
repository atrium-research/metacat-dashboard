"use client";

import { countFacetComparisonGaps } from "@/components/Chart/BarChart/buildFacetComparisonBarData";
import { useCatalogueFacets } from "@/hooks/useCatalogues";
import { facetQueryOptions } from "@/hooks/useFacets";
import { components } from "@/types/api";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";

type FacetExposureList = components["schemas"]["FacetExposure"][] | undefined;
const getFacetNamesFromFacetArrays = (facetArrays: FacetExposureList[]): string[] => {
    const labels = new Set<string>();
    
    for (const facets of facetArrays) {
        if (!facets) continue;

        for (const facet of facets) {
            if (!facet?.facet) continue;

            labels.add(facet.facet);
        }
    }

    return Array.from(labels);
};

export const useFacetNames = (): string[] => {
  const { data: ariadneFacets } = useCatalogueFacets("ariadne");
  const { data: clarinVloFacets } = useCatalogueFacets("clarin-vlo");
  const { data: gotripleFacets } = useCatalogueFacets("gotriple");
  const { data: sshompFacets } = useCatalogueFacets("sshomp");

  return useMemo(() =>
      getFacetNamesFromFacetArrays([
        ariadneFacets,
        clarinVloFacets,
        gotripleFacets,
        sshompFacets,
      ]),
    [ariadneFacets, clarinVloFacets, gotripleFacets, sshompFacets],
  );
};

export const useFacetGapCounts = (
  facetNames: string[],
  minCount: number,
): Record<string, number> => {
  const comparisons = useQueries({
    queries: facetNames.map((name) => facetQueryOptions.compare(name)),
    combine: (results) => results.map((result) => result.data),
  });

  return useMemo(() => {
    const gapCountByFacet: Record<string, number> = {};

    facetNames.forEach((name, index) => {
      gapCountByFacet[name] = countFacetComparisonGaps(
        comparisons[index],
        minCount,
      ) + 1;
    });

    return gapCountByFacet;
  }, [facetNames, comparisons, minCount]);
};
