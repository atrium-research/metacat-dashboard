export type HeatmapChartDatum = {
  id: string;
  data: {
    x: string;
    y: number | undefined;
  }[];
};
