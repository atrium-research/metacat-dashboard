import AxisTermTick, {
  ROW_HEIGHT_SINGLE,
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
import { components } from "@/types/api";
import { CellComponentProps, ResponsiveHeatMap } from "@nivo/heatmap";
import { useMemo } from "react";

type HeatmapChartProps = {
  data: components["schemas"]["FacetComparisonRow"][];
  catalogueIds?: string[];
  margin?: { top: number; right: number; bottom: number; left: number };
  ariaLabel?: string;
};

interface ColumnBounds {
  min: number;
  max: number;
}

const DEFAULT_MARGIN = { top: 50, right: 100, bottom: 18, left: 150 };

const CustomCell = ({
  cell,
  columnBounds,
}: CellComponentProps<{ x: string; y: number | undefined }> & {
  columnBounds: ColumnBounds;
}) => {
  const colKey = cell.id.split(".")[1]; // np. 'colA'
  const hasValue = cell.data.y !== undefined;
  const value = cell.formattedValue;
  const numberValue = cell.data.y ?? 0;

  const { min, max } = columnBounds;

  const rawNormalized = max === min ? 0 : (numberValue - min) / (max - min);
  const normalized = Math.max(0, Math.min(1, rawNormalized));

  const step = Math.min(19, Math.floor(normalized * 20));

  const percentValue = 5 + step * 5;

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
  catalogueIds: catalogueIdsProp,
  margin = DEFAULT_MARGIN,
  ariaLabel = "Facet comparison heatmap chart by catalogue",
}: HeatmapChartProps) => {
  const catalogueIds = useMemo(
    () => catalogueIdsProp ?? getCatalogueIds(data),
    [catalogueIdsProp, data],
  );

  const columnBounds = useMemo(() => {
    const bounds: { min: number; max: number } = { min: 0, max: 0 };
    const values = data
      .flatMap((d) => Object.values(d.counts))
      .filter((value) => value !== null);

    bounds.max = Math.max(...values);
    return bounds;
  }, [data]);

  const chartData = useMemo(
    () => toBarChartData(data, catalogueIds),
    [data, catalogueIds],
  );

  return (
    <div className="w-full max-2xl:min-w-200 h-full ml-2">
      <ResponsiveHeatMap
        valueFormat=" >-.2s"
        cellComponent={(props) => (
          <CustomCell {...props} columnBounds={columnBounds} />
        )}
        animate={false}
        data={chartData}
        ariaLabel={ariaLabel}
        margin={margin}
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
