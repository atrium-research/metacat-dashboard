"use client";

import { buildFacetComparisonView } from "@/components/Chart/BarChart/buildFacetComparisonBarData";
import FacetComparisonBarSection from "@/components/FacetComparisonPage/FacetComparisonBarSection";
import FacetComparisonHeader from "@/components/FacetComparisonPage/FacetComparisonHeader";
import FacetComparisonTimelineSection from "@/components/FacetComparisonPage/FacetComparisonTimelineSection";
import { useFacetCompare } from "@/hooks/useFacets";
import { useFacetComparisonFiltersStore } from "@/store/FacetComparisonFilters";
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

  return (
    <div className="px-4 xl:px-8 my-3 w-full max-w-full overflow-hidden">
      <FacetComparisonHeader
        pivotFacet={pivotFacet}
        minCount={minCount}
        shownValuesCount={rows.length}
        totalValuesCount={totalCount}
      />

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
