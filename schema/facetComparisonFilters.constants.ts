export const SORT_MODES = {
    BY_TOTAL: "By total",
    A_TO_Z: "A -> Z",
} as const;

export const VISUALIZATION_MODES = [
    "grouped",
    "stacked",
    "heatmap",
    "small mult.",
] as const;

export type VisualizationModes = typeof VISUALIZATION_MODES[number];

export const DEFAULT_MIN_COUNT_MIN = 0;
export const DEFAULT_MIN_COUNT = 50;
export const DEFAULT_MIN_COUNT_MAX = 10000;
export const DEFAULT_SORT = SORT_MODES.BY_TOTAL;
export const DEFAULT_VISUALIZATION = "grouped";
