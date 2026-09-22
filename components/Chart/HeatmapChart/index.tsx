import AxisTermTick, {
  ROW_HEIGHT_WITH_AUTHORITY as ROW_HEIGHT_SINGLE,
} from "@/components/Chart/BarChart/AxisTermTick";
import {
  AXIS_LABEL_INSET,
  chartTheme,
} from "@/components/Chart/BarChart/BarChartTheme";
import {
  getCatalogueIds,
  toBarChartData,
} from "@/components/Chart/HeatmapChart/buildFacetComparisonHeatmapData";
import { MatrixCell } from "@/components/ui/MatrixCell/MatrixCell";
import type { FacetComparisonRow } from "@/types/catalogue-version";
import { CellComponentProps, ResponsiveHeatMap } from "@nivo/heatmap";
import { useMemo } from "react";

type HeatmapChartProps = {
  data: FacetComparisonRow[];
  catalogueIds?: string[];
  margin?: { top: number; right: number; bottom: number; left: number };
  ariaLabel?: string;
  height?: number;
};

const DEFAULT_MARGIN = { top: 50, right: 100, bottom: 18, left: 150 };

const CustomCell = ({
  cell,
}: CellComponentProps<{ x: string; y: number | undefined }>) => {
  const colKey = cell.id.split(".")[1];
  const hasValue = cell.data.y !== undefined;
  const value = cell.formattedValue;
  const numberValue = cell.data.y ?? 0;

  const percentValue = Math.min(19, Math.floor((numberValue / 10000) * 20));

  return (
    <foreignObject
      x={cell.x - cell.width / 2}
      y={cell.y - cell.height / 2}
      width={cell.width}
      height={cell.height}
      className="p-px"
    >
      <MatrixCell
        variant="heatmap"
        alpha={percentValue}
        source={colKey as "ariadne" | "clarin-vlo" | "gotriple" | "sshomp"}
        hasValue={hasValue}
        textValue={value ?? undefined}
        className="max-w-full! max-h-full min-h-full"
      />
    </foreignObject>
  );
};

const HeatmapChart = ({
  data,
  margin = DEFAULT_MARGIN,
  ariaLabel = "Facet comparison heatmap chart by catalogue",
  height,
}: HeatmapChartProps) => {
  const catalogueIds = useMemo(() => getCatalogueIds(data), [data]);

  const chartData = useMemo(
    () => toBarChartData(data, catalogueIds),
    [data, catalogueIds],
  );

  const labelRowHeight = ROW_HEIGHT_SINGLE;

  const rowHeight =
    height === undefined
      ? labelRowHeight
      : Math.max(height - margin.top - margin.bottom, data.length) /
        Math.max(data.length, 1);

  const chartHeight =
    height ?? data.length * rowHeight + margin.top + margin.bottom;

  return (
    <div
      className={`w-full max-2xl:min-w-200 ml-2`}
      style={{
        height: chartHeight,
        minHeight: height === undefined ? "100%" : undefined,
      }}
    >
      <ResponsiveHeatMap
        valueFormat=" >-.2s"
        cellComponent={(props) => <CustomCell {...props} />}
        animate={false}
        data={chartData}
        ariaLabel={ariaLabel}
        margin={margin}
        role="img"
        axisTop={{
          tickSize: 0,
          renderTick: (tick) => (
            <AxisTermTick
              value={tick.value}
              x={tick.x}
              y={tick.y}
              rowHeight={ROW_HEIGHT_SINGLE}
              labelWidth={margin.left - AXIS_LABEL_INSET}
              variant="heatmapX"
            />
          ),
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 12,
          tickRotation: 0,
          renderTick: (tick) => (
            <AxisTermTick
              value={tick.value}
              x={tick.x}
              y={tick.y}
              rowHeight={ROW_HEIGHT_SINGLE}
              labelWidth={margin.left - AXIS_LABEL_INSET}
              variant="heatmapY"
            />
          ),
        }}
        theme={chartTheme}
      />
    </div>
  );
};

export default HeatmapChart;
