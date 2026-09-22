"use client";

import BarChart from "@/components/Chart/BarChart";
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
import { VisualizationModes } from "@/schema/facetComparisonFilters.constants";
import { useFacetComparisonFiltersStore } from "@/store/FacetComparisonFilters";
import type {
  FacetComparison,
  FacetComparisonRow,
} from "@/types/catalogue-version";
import { useMemo } from "react";

type VisualizationItemProps = {
  visualization: VisualizationModes;
  chartData: FacetComparisonRow[];
  catalogueIds: string[];
  pivotFacet: string | null;
};

const getVisualizationItem = ({
  visualization,
  chartData,
  catalogueIds,
  pivotFacet,
}: VisualizationItemProps) => {
  switch (visualization) {
    case "grouped":
    case "stacked": {
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
              showGaps
            />
          </div>
          <FacetComparisonLegend catalogues={catalogueIds} showGapLegend />
          <div className="px-2">
            <ChartSummaryBlock summary={facetSummary} />
          </div>
        </div>
      );
    }
    case "small mult.": {
      const smallMultiplesSummary = generateSmallMultiplesSummary(
        chartData,
        catalogueIds,
      );
      return (
        <>
          <FacetComparisonSmallMultiples
            data={chartData}
            catalogueIds={catalogueIds}
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
    }
    case "heatmap": {
      const heatmapSummary = generateHeatmapSummary(
        chartData,
        pivotFacet ?? "",
      );
      return (
        <div className="rounded-sm border border-beige-600 bg-white-500">
          <div
            className="h-165 w-full max-2xl:overflow-x-auto overflow-y-auto overflow-x-hidden"
            role="presentation"
          >
            <HeatmapChart
              data={chartData.toReversed()}
              catalogueIds={catalogueIds}
            />
          </div>
          <HeatmapChartLegend catalogues={catalogueIds} />
          <div className="px-2">
            <ChartSummaryBlock summary={heatmapSummary} withMaxWidth={false} />
          </div>
        </div>
      );
    }
    default:
      return null;
  }
};

type FacetComparisonBarSectionProps = {
  pivotFacet: string | null;
  comparison: FacetComparison | undefined;
  chartData: FacetComparisonRow[];
  isLoading: boolean;
};

const FacetComparisonBarSection = ({
  pivotFacet,
  comparison,
  chartData,
  isLoading,
}: FacetComparisonBarSectionProps) => {
  const visualization = useFacetComparisonFiltersStore(
    (state) => state.visualization,
  );

  const catalogueIds = useMemo(
    () => comparison?.catalogues ?? getCatalogueIds(chartData),
    [comparison, chartData],
  );

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
          pivotFacet,
        })
      )}
    </>
  );
};

export default FacetComparisonBarSection;
