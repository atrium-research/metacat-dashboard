import { patternDotsDef, Def, patternLinesDef } from "@nivo/core";

export const CATALOGUE_PATTERN_DEFS: Def[] = [
    patternLinesDef("clarin-lines", {
        spacing: 6,
        rotation: -45,
        lineWidth: 2,
        background: "var(--color-clarin)",
        color: "var(--color-white-100)",
    }),
    patternDotsDef("gotriple-dots", {
        size: 2,
        padding: 3,
        stagger: true,
        background: "var(--color-gotriple)",
        color: "var(--color-white-100)",
    }),
    patternLinesDef("sshomp-lines", {
        spacing: 5,
        rotation: 0,
        lineWidth: 1.5,
        background: "var(--color-sshomp)",
        color: "var(--color-black-600)",
    }),
];

export const chartTheme = {
    background: "transparent",
    text: {
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: "0.688rem",
        fill: "var(--color-gray-500)",
    },
    axis: {
        domain: {
            line: {
                stroke: "transparent",
            },
        },
        ticks: {
            line: {
                stroke: "transparent",
            },
            text: {
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.688rem",
                fill: "var(--color-gray-500)",
            },
        },
    },
    grid: {
        line: {
            stroke: "var(--color-beige-600)",
            strokeWidth: 1,
        },
    },
    labels: {
        text: {
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "0.5625rem",
            fontWeight: 500,
            fill: "var(--color-gray-500)",
        },
    },
    tooltip: {
        container: {
            background: "var(--color-white-100)",
            color: "var(--color-black-500)",
            fontSize: "0.75rem",
            borderRadius: 4,
            boxShadow: "0px 6px 16px 0px #0000001A",
            border: "1px solid var(--color-beige-600)",
        },
    },
};

const COMPACT_LABEL = {
    fontFamily: "var(--font-inter), sans-serif",
    fontSize: "0.5rem",
    fill: "var(--color-gray-500)",
};

export const compactChartTheme = {
    ...chartTheme,
    text: { ...chartTheme.text, ...COMPACT_LABEL },
    axis: {
        ...chartTheme.axis,
        ticks: {
            ...chartTheme.axis.ticks,
            text: { ...chartTheme.axis.ticks.text, ...COMPACT_LABEL },
        },
    },
    labels: {
        text: { ...chartTheme.labels.text, ...COMPACT_LABEL },
    },
};

export const BAR_CHART_VARIANT = {
    default: {
        enableValueLabels: false,
        compactLabels: false,
        enableGridY: true,
        enableGridX: true,
    },
    compact: {
        enableValueLabels: true,
        compactLabels: true,
        enableGridY: true,
        enableGridX: false,
    },
} as const;

export const MIN_SUBROW_HEIGHT = 18;
export const AXIS_LABEL_INSET = 18;
export const DEFAULT_ROW_PADDING = 0.28;
export const MAX_ROW_PADDING = 0.55;