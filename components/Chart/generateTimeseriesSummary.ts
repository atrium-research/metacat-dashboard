import { getShortName } from "@/utils/catalogue.utils";
import { formatCompactNumber } from "@/utils/global.utils";
import type { FacetComparisonLineSeries } from "@/components/Chart/LineChart/buildFacetComparisonLineData";

const FLAT_PCT = 5;
const STEADY_PCT = 20;

type CatalogueTrend = {
    catalogue: string;
    first: number;
    last: number;
    pctChange: number | undefined;
};

const approx = (value: number) => `~${formatCompactNumber(value)}`;

const getPctChange = (first: number, last: number) => {
    if (first !== 0) return ((last - first) / first) * 100;
    return last === 0 ? 0 : undefined;
};

const toTrend = (series: FacetComparisonLineSeries): CatalogueTrend | null => {
    if (series.data.length === 0) return null;

    const first = series.data[0].y;
    const last = series.data[series.data.length - 1].y;

    return {
        catalogue: getShortName(series.id),
        first,
        last,
        pctChange: getPctChange(first, last),
    };
};

const rank = (trend: CatalogueTrend) =>
    trend.pctChange ?? Number.POSITIVE_INFINITY;

export const getTimelineMonthsSpan = (
    series: FacetComparisonLineSeries[],
): number => {
    const points = series.find((s) => s.data.length > 1)?.data;
    if (!points) return 0;

    const from = new Date(points[0].timestamp);
    const to = new Date(points[points.length - 1].timestamp);

    return (
        (to.getUTCFullYear() - from.getUTCFullYear()) * 12 +
        (to.getUTCMonth() - from.getUTCMonth())
    );
};

const describeTrend = (
    { catalogue, first, last, pctChange }: CatalogueTrend,
    {
        isLeader,
        isSmallest,
        monthsSpan,
    }: { isLeader: boolean; isSmallest: boolean; monthsSpan: number },
): string => {
    const range = `${approx(first)} to ${approx(last)}`;

    if (pctChange === undefined) {
        return isLeader
            ? `${catalogue} shows the strongest growth trajectory, rising from zero to ${approx(last)} records over ${monthsSpan} months`
            : `${catalogue} grew from zero to ${approx(last)} records over the period`;
    }

    if (Math.abs(pctChange) < FLAT_PCT) {
        const scaleNote = isSmallest
            ? ", reflecting its significantly smaller catalogue scale"
            : "";
        return `${catalogue} remains essentially flat at ${approx(last)} with negligible change over the period${scaleNote}`;
    }

    const isDecline = pctChange < 0;
    const change = `(${Math.abs(Math.round(pctChange))}% ${isDecline ? "decrease" : "increase"})`;

    if (isLeader) {
        return isDecline
            ? `${catalogue} shows the strongest decline, falling from ${range} records over ${monthsSpan} months ${change}`
            : `${catalogue} shows the strongest growth trajectory, rising from ${range} records over ${monthsSpan} months ${change}`;
    }

    if (Math.abs(pctChange) >= STEADY_PCT) {
        return isDecline
            ? `${catalogue} shows a steady decline from ${range} ${change}`
            : `${catalogue} shows steady growth from ${range} ${change}`;
    }

    return isDecline
        ? `${catalogue} shows a gradual decline from ${range} ${change}`
        : `${catalogue} maintains gradual growth from ${range} ${change}`;
};

export const generateTimeseriesSummary = (
    series: FacetComparisonLineSeries[],
    monthsSpan: number,
): string => {
    const trends = series
        .map(toTrend)
        .filter((trend) => trend !== null)
        .sort((a, b) => rank(b) - rank(a));

    if (trends.length === 0) {
        return "No timeline data available for the selected facet.";
    }

    const smallest = trends.reduce((a, b) => (b.last < a.last ? b : a));

    const sentences = trends.map((trend, index) =>
        describeTrend(trend, {
            isLeader: index === 0,
            isSmallest: trend.catalogue === smallest.catalogue,
            monthsSpan,
        }),
    );

    return `${monthsSpan}-Month Growth Trend: ${sentences.join(". ")}.`;
};
