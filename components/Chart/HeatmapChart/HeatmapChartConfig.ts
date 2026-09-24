export type HeatmapChartDatum = {
  id: string;
  data: {
    x: string;
    y: number | undefined;
  }[];
};

export type HeatmapChartMaxCount = {
  [key in "ariadne" | "clarin-vlo" | "gotriple" | "sshomp"]: number;
};
