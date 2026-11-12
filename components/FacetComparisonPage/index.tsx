"use client";

import { buildFacetComparisonView } from "@/components/Chart/BarChart/buildFacetComparisonBarData";
import FacetComparisonBarSection from "@/components/FacetComparisonPage/FacetComparisonBarSection";
import FacetComparisonHeader from "@/components/FacetComparisonPage/FacetComparisonHeader";
import FacetComparisonTimelineSection from "@/components/FacetComparisonPage/FacetComparisonTimelineSection";
import { Typography } from "@/components/ui/Typography/Typography";
import { catalogueQueryOptions, useCatalogueList } from "@/hooks/useCatalogues";
import { useFacetCompare } from "@/hooks/useFacets";
import { useFacetComparisonFiltersStore } from "@/store/FacetComparisonFilters";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

const FacetComparison = () => {
  const { pivotFacet, minCount, sort } = useFacetComparisonFiltersStore(
    useShallow((state) => ({
      pivotFacet: state.pivotFacet,
      minCount: state.minCount,
      sort: state.sort,
    })),
  );

  const { data: comparison, isLoading } = useFacetCompare(pivotFacet ?? "");

  const { rows, totalCount } = useMemo(
    () => buildFacetComparisonView(comparison, sort, minCount),
    [comparison, sort, minCount],
  );

  const { data: catalogues = [] } = useCatalogueList();

  const catalogueVersions = useSuspenseQueries({
    queries: catalogues.map((cat) =>
      catalogueQueryOptions.versionsLast(cat.id),
    ),
  }).filter(
    (catalogueVersion) =>
      typeof catalogueVersion.data.harvest_error === "string",
  );

  return (
    <div className="px-4 xl:px-8 my-3 w-full max-w-full overflow-hidden">
      <FacetComparisonHeader
        pivotFacet={pivotFacet}
        minCount={minCount}
        shownValuesCount={rows.length}
        totalValuesCount={totalCount}
      />

      {catalogueVersions.length > 0 && (
        <div className="flex flex-col gap-1 py-2">
          {catalogueVersions.map(({ data }) => (
            <Typography
              key={data.catalogue_id}
              variant="caption-meta"
              className="uppercase text-[0.5625rem] text-red-600"
            >
              Warining for catalogue {data.catalogue_id}: {data.harvest_error}
            </Typography>
          ))}
        </div>
      )}

      <FacetComparisonBarSection
        pivotFacet={pivotFacet}
        comparison={comparison}
        chartData={rows}
        isLoading={isLoading}
      />

      <FacetComparisonTimelineSection />
    </div>
  );
};

export default FacetComparison;
