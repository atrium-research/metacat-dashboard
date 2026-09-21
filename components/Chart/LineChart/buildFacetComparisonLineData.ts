import { TIMELINE_WINDOW_MONTHS } from "@/schema/facetComparisonFilters.constants";
import type { FacetTimeseriesPoint } from "@/types/catalogue-version";
import { formatMonthLabel } from "@/utils/date.utils";

export type FacetComparisonLinePoint = {
    x: Date;
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
    points: FacetTimeseriesPoint[] | undefined,
): FacetComparisonLineSeries[] => {
    if (!points?.length) return EMPTY_SERIES;

    const byCatalogue = new Map<string, FacetComparisonLinePoint[]>();

    for (const point of points) {
        const date = new Date(point.timestamp);
        const linePoint: FacetComparisonLinePoint = {
            x: date,
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
                .toSorted((a, b) => a.timestampMs - b.timestampMs),
        }));
};

export const formatTimelineTick = (value: Date) => formatMonthLabel(value);

export type TimelineDomain = {
    min: Date;
    max: Date;
    displayMonths: number;
};

const MS_PER_DAY = 86_400_000;
const MAX_AXIS_TICKS = 8;

export const getTimelineDomain = (
    series: FacetComparisonLineSeries[],
    windowMonths = TIMELINE_WINDOW_MONTHS,
): TimelineDomain | null => {
    let minMs = Number.POSITIVE_INFINITY;
    let maxMs = Number.NEGATIVE_INFINITY;

    for (const item of series) {
        for (const point of item.data) {
            minMs = Math.min(minMs, point.timestampMs);
            maxMs = Math.max(maxMs, point.timestampMs);
        }
    }

    if (!Number.isFinite(minMs) || !Number.isFinite(maxMs)) return null;

    const max = new Date(maxMs + 7 * MS_PER_DAY);
    const targetMonth = max.getUTCMonth() - windowMonths;
    const lastDayOfTargetMonth = new Date(
        Date.UTC(max.getUTCFullYear(), targetMonth + 1, 0),
    ).getUTCDate();
    const min = new Date(
        Date.UTC(
            max.getUTCFullYear(),
            targetMonth,
            Math.min(max.getUTCDate(), lastDayOfTargetMonth),
            max.getUTCHours(),
            max.getUTCMinutes(),
            max.getUTCSeconds(),
            max.getUTCMilliseconds(),
        ),
    );

    return {
        min,
        max,
        displayMonths: windowMonths,
    };
};

export const getTimelineMonthTicks = (domain: TimelineDomain): Date[] => {
    const span = domain.max.getTime() - domain.min.getTime();
    if (span <= 0 || MAX_AXIS_TICKS <= 1) return [domain.min];

    return Array.from({ length: MAX_AXIS_TICKS }, (_, index) =>
        new Date(domain.min.getTime() + (span * index) / (MAX_AXIS_TICKS - 1)),
    );
};
