"use client";

import {
    ResponsiveLine,
    type LineCustomSvgLayerProps,
    type LineSvgProps,
} from "@nivo/line";
import { formatCompactNumber } from "@/utils/global.utils";
import { getShortName, getThemeColor } from "@/utils/catalogue.utils";
import type { FacetComparisonLineSeries } from "@/components/Chart/LineChart/buildFacetComparisonLineData";
import { CATALOGUE_DASH_ARRAYS } from "@/components/Chart/BarChart/BarChartConfig";
import { chartTheme } from "@/components/Chart/BarChart/BarChartTheme";
import { useMemo } from "react";

type LineProps = LineSvgProps<FacetComparisonLineSeries>;

type FacetComparisonLineChartProps = {
    data: FacetComparisonLineSeries[];
};

const MAX_AXIS_TICKS = 12;

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

const SliceTooltip: LineProps["sliceTooltip"] = ({ slice }) => (
    <div className="rounded border border-beige-600 bg-white-500 px-3 py-2 text-xs shadow-md">
        <div className="mb-1 font-medium text-gray-700">
            {slice.points[0]?.data.xFormatted}
        </div>
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


const LineChart = ({ data }: FacetComparisonLineChartProps) => {
    const tickValues = useMemo(() => {
        const monthByTimestamp = new Map<string, number>();

        for (const series of data) {
            for (const point of series.data) {
                if (!monthByTimestamp.has(point.x)) {
                    monthByTimestamp.set(point.x, point.timestampMs);
                }
            }
        }

        const monthLabels = Array.from(monthByTimestamp.entries())
            .sort(([, a], [, b]) => a - b)
            .map(([label]) => label);

        if (monthLabels.length <= MAX_AXIS_TICKS) return monthLabels;

        return Array.from({ length: MAX_AXIS_TICKS }, (_, index) =>
            monthLabels[
                Math.round(
                    (index * (monthLabels.length - 1)) /
                        (MAX_AXIS_TICKS - 1),
                )
            ],
        );
    }, [data]);

    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 16, right: 76, bottom: 40, left: 56 }}
            xScale={{ type: "point" }}
            yScale={{ type: "linear", min: 0, max: "auto" }}
            colors={({ id }) => `var(--color-${getThemeColor(String(id))})`}
            enablePoints={false}
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
            }}
            theme={chartTheme}
            layers={[
                "grid",
                "axes",
                DashedLines,
                SeriesEndLabels,
                "slices",
                "mesh"
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
