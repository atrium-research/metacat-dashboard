"use client";

import {
    generateTimeseriesSummary,
    getTimelineMonthsSpan,
} from "@/components/Chart/generateTimeseriesSummary";
import FacetComparisonLineLegend from "@/components/Chart/LineChart/FacetComparisonLineLegend";
import { buildFacetComparisonLineData } from "@/components/Chart/LineChart/buildFacetComparisonLineData";
import ChartPanelMessage from "@/components/FacetComparisonPage/ChartPanelMessage";
import ChartSummaryBlock from "@/components/FacetComparisonPage/ChartSummaryBlock";
import { Typography } from "@/components/ui/Typography/Typography";
import { useFacetTimeseries } from "@/hooks/useFacets";
import { memo, useMemo } from "react";
import { useFacetComparisonFiltersStore } from "@/store/FacetComparisonFilters";
import LineChart from "@/components/Chart/LineChart";


const FacetComparisonTimelineSection = () => {
    const pivotFacet = useFacetComparisonFiltersStore((state) => state.pivotFacet);

    const { data: timeseries, isLoading } = useFacetTimeseries(pivotFacet ?? "");

    const lineData = useMemo(() => buildFacetComparisonLineData(timeseries), [timeseries]);
    const timelineMonthsSpan = useMemo(() => getTimelineMonthsSpan(lineData), [lineData]);
    const catalogues = useMemo(() => lineData.map((series) => series.id), [lineData]);

    const summary = useMemo(
        () => generateTimeseriesSummary(lineData, timelineMonthsSpan),
        [lineData, timelineMonthsSpan],
    );

    return (
        <div className="mt-4 rounded-sm border border-beige-600 bg-white-500">
            <div className="flex flex-col gap-1 px-6 pt-5">
                <Typography
                    variant="caption"
                    className="uppercase text-gray-700"
                >
                    {timelineMonthsSpan > 0
                        ? `${timelineMonthsSpan}-Month Timeline`
                        : "Timeline"}
                </Typography>
                <Typography variant="h3">Evolution of Total Counts</Typography>
            </div>

            <div className="h-105 w-full pt-4" role="presentation">
                {isLoading ? (
                    <ChartPanelMessage message="Loading timeline data…" />
                ) : lineData.length === 0 ? (
                    <ChartPanelMessage message="No timeline data available for the selected facet." />
                ) : (
                    <LineChart data={lineData} />
                )}
            </div>

            <FacetComparisonLineLegend catalogues={catalogues} />

            <ChartSummaryBlock
                className="px-4 pt-0"
                summary={isLoading ? "Loading timeline summary…" : summary}
            />
        </div>
    );
};

export default memo(FacetComparisonTimelineSection);
