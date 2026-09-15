import type { components } from "@/types/api";
import { formatMonthLabel } from "@/utils/date.utils";

export type FacetComparisonLinePoint = {
    x: string;
    y: number;
    timestamp: string;
    timestampMs: number;
};

export type FacetComparisonLineSeries = {
    id: string;
    data: FacetComparisonLinePoint[];
};

const EMPTY_SERIES: FacetComparisonLineSeries[] = [];

export const buildFacetComparisonLineData = (
    points: components["schemas"]["FacetTimeseriesPoint"][] | undefined,
): FacetComparisonLineSeries[] => {
    if (!points?.length) return EMPTY_SERIES;

    const byCatalogue = new Map<string, FacetComparisonLinePoint[]>();

    for (const point of points) {
        const date = new Date(point.timestamp);
        const linePoint: FacetComparisonLinePoint = {
            x: formatMonthLabel(date),
            y: point.total_count,
            timestamp: point.timestamp,
            timestampMs: date.getTime(),
        };

        const series = byCatalogue.get(point.catalogue_id);
        if (series) {
            series.push(linePoint);
        } else {
            byCatalogue.set(point.catalogue_id, [linePoint]);
        }
    }

    return Array.from(byCatalogue.keys())
        .sort()
        .map((id) => ({
            id,
            data: byCatalogue
                .get(id)!
                .sort((a, b) => a.timestampMs - b.timestampMs),
        }));
};
