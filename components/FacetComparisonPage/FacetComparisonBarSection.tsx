"use client";

import BarChart from "@/components/Chart/BarChart";
import { buildFacetAuthorityMap } from "@/components/Chart/BarChart/buildFacetAuthorityMap";
import { getCatalogueIds } from "@/components/Chart/BarChart/buildFacetComparisonBarData";
import FacetComparisonLegend from "@/components/Chart/BarChart/FacetComparisonLegend";
import FacetComparisonSmallMultiples from "@/components/Chart/BarChart/FacetComparisonSmallMultiples";
import { generateChartSummary } from "@/components/Chart/generateChartSummary";
import { generateHeatmapSummary } from "@/components/Chart/generateHeatmapSummary";
import { generateSmallMultiplesSummary } from "@/components/Chart/generateSmallMultiplesSummary";
import HeatmapChart from "@/components/Chart/HeatmapChart";
import HeatmapChartLegend from "@/components/Chart/HeatmapChart/HeatmapChartLegend";
import ChartNote from "@/components/FacetComparisonPage/ChartNote";
import ChartPanelMessage from "@/components/FacetComparisonPage/ChartPanelMessage";
import ChartSummaryBlock from "@/components/FacetComparisonPage/ChartSummaryBlock";
import { useFacetValues } from "@/hooks/useFacets";
import { VisualizationModes } from "@/schema/facetComparisonFilters.constants";
import { useFacetComparisonFiltersStore } from "@/store/FacetComparisonFilters";
import { components } from "@/types/api";
import { useMemo } from "react";

type VisualizationItemProps = {
  visualization: VisualizationModes;
  chartData: components["schemas"]["FacetComparisonRow"][];
  catalogueIds: string[];
  authorityByValue: Record<string, string>;
  pivotFacet: string | null;
};

const getVisualizationItem = ({
  visualization,
  chartData,
  catalogueIds,
  authorityByValue,
  pivotFacet,
}: VisualizationItemProps) => {
  switch (visualization) {
    case "grouped":
    case "stacked":
      const facetSummary = generateChartSummary(chartData, pivotFacet ?? "");
      return (
        <div className="mt-1.75 rounded-sm border border-beige-600 bg-white-500">
          <div
            className="h-157.5 w-full overflow-y-auto pt-4"
            role="presentation"
          >
            <BarChart
              data={chartData}
              groupMode={visualization}
              catalogueIds={catalogueIds}
              authorityByValue={authorityByValue}
              showGaps
            />
          </div>
          <FacetComparisonLegend catalogues={catalogueIds} showGapLegend />
          <div className="px-2">
            <ChartSummaryBlock summary={facetSummary} />
          </div>
        </div>
      );
    case "small mult.":
      const smallMultiplesSummary = generateSmallMultiplesSummary(
        chartData,
        catalogueIds,
      );
      return (
        <>
          <FacetComparisonSmallMultiples
            data={chartData}
            catalogueIds={catalogueIds}
            authorityByValue={authorityByValue}
          />
          <div className="space-y-2 mt-3">
            <ChartNote />
            <ChartSummaryBlock
              summary={smallMultiplesSummary}
              className="p-0"
            />
          </div>
        </>
      );
    case "heatmap":
      const heatmapSummary = generateHeatmapSummary(
        chartData,
        pivotFacet ?? "",
      );
      return (
        <div className="rounded-sm border border-beige-600 bg-white-500">
          <div
            className="h-165 w-full max-2xl:overflow-auto"
            role="presentation"
          >
            <HeatmapChart data={chartData.toReversed()} />
          </div>
          <HeatmapChartLegend catalogues={catalogueIds} />
          <div className="px-2">
            <ChartSummaryBlock summary={heatmapSummary} withMaxWidth={false} />
          </div>
        </div>
      );
    default:
      return null;
  }
};

type FacetComparisonBarSectionProps = {
  pivotFacet: string | null;
  comparison: components["schemas"]["FacetComparison"] | undefined;
  chartData: components["schemas"]["FacetComparisonRow"][];
  isLoading: boolean;
};

const FacetComparisonBarSection = ({
  pivotFacet,
  chartData,
  isLoading,
}: FacetComparisonBarSectionProps) => {
  const visualization = useFacetComparisonFiltersStore(
    (state) => state.visualization,
  );

  const { data: facetValues } = useFacetValues({ facets: pivotFacet ?? "" });

  const authorityByValue = useMemo(
    () => buildFacetAuthorityMap(facetValues),
    [facetValues],
  );
  const catalogueIds = useMemo(() => getCatalogueIds(chartData), [chartData]);

  return (
    <>
      {isLoading ? (
        <ChartPanelMessage message="Loading comparison data…" />
      ) : chartData.length === 0 ? (
        <ChartPanelMessage message="No facet values match the current filters." />
      ) : (
        getVisualizationItem({
          visualization,
          chartData,
          catalogueIds,
          authorityByValue,
          pivotFacet,
        })
      )}
    </>
  );
};

export default FacetComparisonBarSection;
