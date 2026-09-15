import { CATALOGUE_DASH_ARRAYS } from "@/components/Chart/BarChart/BarChartConfig";
import { getShortName, getThemeColor } from "@/utils/catalogue.utils";

type FacetComparisonLineLegendProps = {
    catalogues: string[];
};

const FacetComparisonLineLegend = ({ catalogues }: FacetComparisonLineLegendProps) => {
    return (
        <ul
            className="flex list-none flex-wrap items-center justify-center gap-6 px-4 pb-4"
            aria-label="Catalogue legend"
        >
            {catalogues.map((catalogue) => {
                const themeKey = getThemeColor(catalogue);

                return (
                    <li key={catalogue} className="flex items-center gap-2">
                        <svg
                            width={20}
                            height={10}
                            aria-hidden
                            className="shrink-0"
                        >
                            <line
                                x1={0}
                                y1={5}
                                x2={20}
                                y2={5}
                                stroke={`var(--color-${themeKey})`}
                                strokeWidth={2}
                                strokeDasharray={
                                    CATALOGUE_DASH_ARRAYS[themeKey]
                                }
                            />
                        </svg>
                        <span className="font-jetbrains-mono text-[0.625rem] font-medium uppercase text-gray-700">
                            {getShortName(catalogue)}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
};

export default FacetComparisonLineLegend;
