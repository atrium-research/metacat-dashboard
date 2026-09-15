import {
    CATALOGUE_PATTERN_IDS,
    GAP_FILL_COLOR,
    GAP_LEGEND_LABEL,
} from "@/components/Chart/BarChart/BarChartConfig";
import { getShortName, getThemeColor } from "@/utils/catalogue.utils";

type FacetComparisonLegendProps = {
    catalogues: string[];
    showGapLegend?: boolean;
};

const FacetComparisonLegend = ({
    catalogues,
    showGapLegend = false,
}: FacetComparisonLegendProps) => {
    return (
        <>
            <svg width={0} height={0} aria-hidden className="absolute">
                <defs>
                    <pattern
                        id="legend-clarin-lines"
                        patternUnits="userSpaceOnUse"
                        width={6}
                        height={6}
                        patternTransform="rotate(45)"
                    >
                        <rect width={6} height={6} fill="var(--color-clarin)" />
                        <line
                            x1={0}
                            y1={0}
                            x2={0}
                            y2={6}
                            stroke="var(--color-white-100)"
                            strokeWidth={2}
                        />
                    </pattern>
                    <pattern
                        id="legend-gotriple-dots"
                        patternUnits="userSpaceOnUse"
                        width={6}
                        height={6}
                    >
                        <rect
                            width={6}
                            height={6}
                            fill="var(--color-gotriple)"
                        />
                        <circle
                            cx={1.5}
                            cy={1.5}
                            r={1}
                            fill="var(--color-white-100)"
                        />
                        <circle
                            cx={4.5}
                            cy={4.5}
                            r={1}
                            fill="var(--color-white-100)"
                        />
                    </pattern>
                    <pattern
                        id="legend-sshomp-lines"
                        patternUnits="userSpaceOnUse"
                        width={6}
                        height={6}
                    >
                        <rect width={6} height={6} fill="var(--color-sshomp)" />
                        <line
                            x1={0}
                            y1={3}
                            x2={6}
                            y2={3}
                            stroke="var(--color-black-600)"
                            strokeWidth={1.5}
                        />
                    </pattern>
                </defs>
            </svg>

            <ul
                className="flex list-none flex-wrap items-center justify-center gap-6 pb-4"
                aria-label="Catalogue legend"
            >
                {catalogues.map((catalogue) => {
                    const themeKey = getThemeColor(catalogue);
                    const patternId = CATALOGUE_PATTERN_IDS[themeKey];
                    const fill = patternId
                        ? `url(#legend-${patternId})`
                        : `var(--color-${themeKey})`;

                    return (
                        <li key={catalogue} className="flex items-center gap-2">
                            <svg
                                width={14}
                                height={14}
                                aria-hidden
                                className="shrink-0 rounded-[1px]"
                            >
                                <rect width={14} height={14} fill={fill} />
                                <rect
                                    width={14}
                                    height={14}
                                    fill="none"
                                    stroke="var(--color-beige-600)"
                                    strokeWidth={1}
                                />
                            </svg>
                            <span className="font-jetbrains-mono text-[0.625rem] font-medium uppercase text-gray-700">
                                {getShortName(catalogue)}
                            </span>
                        </li>
                    );
                })}

                {showGapLegend && (
                    <li className="flex items-center gap-2">
                        <svg
                            width={14}
                            height={14}
                            aria-hidden
                            className="shrink-0"
                        >
                            <rect width={14} height={14} fill={GAP_FILL_COLOR} />
                        </svg>
                        <span className="text-[0.625rem] text-gray-500">
                            {GAP_LEGEND_LABEL}
                        </span>
                    </li>
                )}
            </ul>
        </>
    );
};

export default FacetComparisonLegend;
