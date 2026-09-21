"use client";

import {
    ResponsiveLine,
    type LineCustomSvgLayerProps,
    type LineSvgProps,
} from "@nivo/line";
import { formatCompactNumber } from "@/utils/global.utils";
import { getShortName, getThemeColor } from "@/utils/catalogue.utils";
import type {
    FacetComparisonLineSeries,
    TimelineDomain,
} from "@/components/Chart/LineChart/buildFacetComparisonLineData";
import {
    formatTimelineTick,
    getTimelineMonthTicks,
} from "@/components/Chart/LineChart/buildFacetComparisonLineData";
import { CATALOGUE_DASH_ARRAYS } from "@/components/Chart/BarChart/BarChartConfig";
import { chartTheme } from "@/components/Chart/BarChart/BarChartTheme";
import { useMemo } from "react";

type LineProps = LineSvgProps<FacetComparisonLineSeries>;

type FacetComparisonLineChartProps = {
    data: FacetComparisonLineSeries[];
    xDomain: TimelineDomain;
};

const DashedLines = ({
    series,
    lineGenerator,
}: LineCustomSvgLayerProps<FacetComparisonLineSeries>) => (
    <g>
        {series.map((s) => (
            <path
                key={s.id}
                d={lineGenerator(s.data.map((d) => d.position)) ?? undefined}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeDasharray={CATALOGUE_DASH_ARRAYS[getThemeColor(s.id)]}
            />
        ))}
    </g>
);

const SeriesEndLabels = ({
    series,
    innerWidth,
}: LineCustomSvgLayerProps<FacetComparisonLineSeries>) => (
    <g>
        {series.map((s) => {
            const lastPoint = s.data[s.data.length - 1];
            if (!lastPoint) return null;

            return (
                <text
                    key={s.id}
                    x={innerWidth + 8}
                    y={lastPoint.position.y}
                    dominantBaseline="central"
                    fontFamily="var(--font-jetbrains-mono), monospace"
                    fontSize="0.625rem"
                    fontWeight={500}
                    fill={s.color}
                >
                    {getShortName(s.id)}
                </text>
            );
        })}
    </g>
);

const SliceTooltip: LineProps["sliceTooltip"] = ({ slice }) => {
    const x = slice.points[0]?.data.x;
    const dateLabel =
        x instanceof Date ? formatTimelineTick(x) : String(x ?? "");

    return (
    <div className="relative z-50 rounded border border-beige-600 bg-white-500 px-3 py-2 text-xs shadow-md">
        <div className="mb-1 font-medium text-gray-700">{dateLabel}</div>
        {slice.points.map((point) => (
            <div
                key={point.id}
                className="flex items-center gap-3"
                style={{ color: point.seriesColor }}
            >
                <span>{getShortName(point.seriesId)}</span>
                <span className="ml-auto font-medium">
                    {formatCompactNumber(Number(point.data.y))}
                </span>
            </div>
        ))}
    </div>
    );
};

const LineChart = ({ data, xDomain }: FacetComparisonLineChartProps) => {
    const tickValues = useMemo(
        () => getTimelineMonthTicks(xDomain),
        [xDomain],
    );

    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 28, right: 76, bottom: 40, left: 56 }}
            xScale={{
                type: "time",
                format: "native",
                precision: "day",
                useUTC: true,
                min: xDomain.min,
                max: xDomain.max,
            }}
            xFormat="time:%Y-%m-%d"
            yScale={{ type: "linear", min: 0, max: "auto" }}
            colors={({ id }) => `var(--color-${getThemeColor(String(id))})`}
            enablePoints
            pointSize={5}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            enableGridX={false}
            enableGridY
            axisTop={null}
            axisRight={null}
            axisLeft={{
                tickSize: 0,
                tickPadding: 12,
                tickRotation: 0,
                format: (value) => formatCompactNumber(Number(value)),
            }}
            axisBottom={{
                tickSize: 0,
                tickPadding: 10,
                tickRotation: 0,
                tickValues,
                format: (value) => formatTimelineTick(new Date(value)),
            }}
            theme={chartTheme}
            layers={[
                "grid",
                "axes",
                DashedLines,
                "points",
                SeriesEndLabels,
                "slices",
                "mesh",
            ]}
            enableSlices="x"
            useMesh
            sliceTooltip={SliceTooltip}
            role="img"
            ariaLabel="Evolution of total counts over time by catalogue"
            animate={false}
        />
    );
};

export default LineChart;
