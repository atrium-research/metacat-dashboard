export type BarChartDatum = {
    value: string;
    [catalogueId: string]: string | number;
};

export const CATALOGUE_DASH_ARRAYS: Record<string, string | undefined> = {
    clarin: "7 4",
    gotriple: "1 3",
    sshomp: "6 2 1 2",
};

export const CATALOGUE_PATTERN_IDS: Record<string, string | undefined> = {
    clarin: "clarin-lines",
    gotriple: "gotriple-dots",
    sshomp: "sshomp-lines",
};

export const GAP_FILL_COLOR = "var(--color-beige-600)";
export const GAP_TEXT_COLOR = "#3E3930";
export const GAP_LEGEND_LABEL = "N/A - No data available";
