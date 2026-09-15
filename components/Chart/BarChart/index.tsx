"use client";

import { useCallback, useMemo } from "react";
import { ResponsiveBar, type BarCustomLayerProps } from "@nivo/bar";
import { formatCompactNumber } from "@/utils/global.utils";
import { getShortName, getThemeColor } from "@/utils/catalogue.utils";
import {
    CATALOGUE_PATTERN_IDS,
    type BarChartDatum,
} from "@/components/Chart/BarChart/BarChartConfig";
import {
    AXIS_LABEL_INSET,
    BAR_CHART_VARIANT,
    CATALOGUE_PATTERN_DEFS,
    chartTheme,
    compactChartTheme,
    DEFAULT_ROW_PADDING,
    MAX_ROW_PADDING,
    MIN_SUBROW_HEIGHT,
} from "@/components/Chart/BarChart/BarChartTheme";
import {
    getCatalogueIds,
    toBarChartData,
} from "@/components/Chart/BarChart/buildFacetComparisonBarData";
import AxisTermTick, {
    ROW_HEIGHT_SINGLE,
    ROW_HEIGHT_WITH_AUTHORITY,
} from "@/components/Chart/BarChart/AxisTermTick";
import GapMarkers from "@/components/Chart/BarChart/GapMarkers";
import { components } from "@/types/api";

type BarChartProps = {
    data: components["schemas"]["FacetComparisonRow"][];
    groupMode?: "grouped" | "stacked";
    authorityByValue?: Record<string, string>;
    showGaps?: boolean;
    catalogueIds?: string[];
    margin?: { top: number; right: number; bottom: number; left: number };
    ariaLabel?: string;
    variant?: "default" | "compact";
    axisBottomTickValues?: number[];
    height?: number;
    rowGap?: number;
};

const BarChart = ({
    data,
    groupMode = "grouped",
    authorityByValue,
    showGaps = false,
    catalogueIds: catalogueIdsProp,
    margin = { top: -12, right: 56, bottom: 28, left: 148 },
    ariaLabel = "Facet comparison horizontal bar chart by catalogue",
    variant = "default",
    axisBottomTickValues,
    height,
    rowGap,
}: BarChartProps) => {
    const { enableValueLabels, compactLabels, enableGridY, enableGridX } =
        BAR_CHART_VARIANT[variant];
    const catalogueIds = useMemo(
        () => catalogueIdsProp ?? getCatalogueIds(data),
        [catalogueIdsProp, data],
    );

    const { data: chartData, gaps } = useMemo(
        () => toBarChartData(data, catalogueIds),
        [data, catalogueIds],
    );

    const isGap = useCallback(
        (rowValue: string, catalogueId: string) =>
            showGaps && gaps.has(`${rowValue}-${catalogueId}`),
        [showGaps, gaps],
    );

    const hasAuthority =
        authorityByValue !== undefined &&
        Object.keys(authorityByValue).length > 0;

    const labelRowHeight = hasAuthority
        ? ROW_HEIGHT_WITH_AUTHORITY
        : ROW_HEIGHT_SINGLE;

    const autoRowHeight =
        groupMode === "grouped"
            ? Math.max(labelRowHeight, catalogueIds.length * MIN_SUBROW_HEIGHT)
            : labelRowHeight;
            
    const rowHeight =
        height === undefined
            ? autoRowHeight
            : Math.max(height - margin.top - margin.bottom, data.length) /
              Math.max(data.length, 1);

    const tickRowHeight = Math.min(labelRowHeight, rowHeight);
    const showAuthority = tickRowHeight >= ROW_HEIGHT_WITH_AUTHORITY;

    const chartHeight =
        height ?? data.length * rowHeight + margin.top + margin.bottom;

    const rowPadding =
        rowGap === undefined
            ? DEFAULT_ROW_PADDING
            : Math.min(rowGap / rowHeight, MAX_ROW_PADDING);

    return (
        <div
            className="w-full"
            style={{
                height: chartHeight,
                minHeight: height === undefined ? "100%" : undefined,
            }}
        >
            <ResponsiveBar
                data={chartData}
                keys={catalogueIds}
                indexBy="value"
                layout="horizontal"
                groupMode={groupMode}
                margin={margin}
                padding={rowPadding}
                innerPadding={2}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={({ id }) => `var(--color-${getThemeColor(String(id))})`}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.15]],
                }}
                borderWidth={0}
                enableLabel={enableValueLabels}
                labelPosition="end"
                labelOffset={6}
                labelSkipWidth={1}
                labelTextColor="var(--color-gray-500)"
                enableGridY={enableGridY}
                enableGridX={enableGridX}
                axisTop={null}
                axisRight={null}
                axisLeft={{
                    tickSize: 0,
                    tickPadding: 12,
                    tickRotation: 0,
                    renderTick: (tick) => (
                        <AxisTermTick
                            value={tick.value}
                            x={tick.x}
                            y={tick.y}
                            authority={
                                showAuthority
                                    ? authorityByValue?.[tick.value]
                                    : undefined
                            }
                            rowHeight={tickRowHeight}
                            labelWidth={margin.left - AXIS_LABEL_INSET}
                            compact={compactLabels}
                        />
                    ),
                }}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 10,
                    tickRotation: 0,
                    tickValues: axisBottomTickValues,
                    format: (value) => formatCompactNumber(Number(value)),
                }}
                valueFormat={(value) => formatCompactNumber(Number(value))}
                theme={compactLabels ? compactChartTheme : chartTheme}
                defs={CATALOGUE_PATTERN_DEFS}
                fill={catalogueIds.flatMap((id) => {
                    const patternId = CATALOGUE_PATTERN_IDS[getThemeColor(id)];
                    return patternId ? [{ match: { id }, id: patternId }] : [];
                })}
                layers={[
                    "grid",
                    "axes",
                    "bars",
                    (props: BarCustomLayerProps<BarChartDatum>) => (
                        <GapMarkers {...props} isGap={isGap} />
                    ),
                    "markers",
                    "legends",
                    "annotations",
                    "totals",
                ]}
                role="img"
                ariaLabel={ariaLabel}
                barAriaLabel={(datum) => {
                    const catalogue = getShortName(String(datum.id));
                    const count = isGap(
                        String(datum.indexValue),
                        String(datum.id),
                    )
                        ? "N/A"
                        : `${formatCompactNumber(datum.value ?? 0)} records`;
                    return `${catalogue} - ${datum.indexValue}: ${count}`;
                }}
                animate={false}
            />
        </div>
    );
};

export default BarChart;
