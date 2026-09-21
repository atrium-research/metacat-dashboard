"use client";

import BarChart from "@/components/Chart/BarChart";
import { getCatalogueIds } from "@/components/Chart/BarChart/buildFacetComparisonBarData";
import { Typography } from "@/components/ui/Typography/Typography";
import type { FacetComparisonRow } from "@/types/catalogue-version";
import { getShortName, getThemeColor } from "@/utils/catalogue.utils";
import { formatCompactNumber } from "@/utils/global.utils";
import { useMemo } from "react";

type SmallMultiplePanel = {
    catalogue: string;
    rows: FacetComparisonRow[];
    total: number;
    tickValues: number[];
};

const PANEL_HEIGHT = 289;

const buildPanels = (
    data: FacetComparisonRow[],
    catalogueIds: string[],
): SmallMultiplePanel[] =>
    catalogueIds.map((catalogue) => {
        let total = 0;
        let max = 0;

        const rows = data.map((row) => {
            const count = row.counts?.[catalogue] ?? null;

            if (count !== null) {
                total += count;
                max = Math.max(max, count);
            }

            return { value: row.value, counts: { [catalogue]: count } };
        });

        return {
            catalogue,
            rows,
            total,
            tickValues: max > 0 ? [0, max / 2, max] : [0],
        };
    });

type FacetComparisonSmallMultiplesProps = {
    data: FacetComparisonRow[];
    authorityByValue?: Record<string, string>;
    catalogueIds?: string[];
};

const FacetComparisonSmallMultiples = ({
    data,
    authorityByValue,
    catalogueIds: catalogueIdsProp,
}: FacetComparisonSmallMultiplesProps) => {
    const panels = useMemo(
        () => buildPanels(data, catalogueIdsProp ?? getCatalogueIds(data)),
        [data, catalogueIdsProp],
    );

    return (
        <div
            className="grid grid-cols-1 gap-5 xl:grid-cols-2 mt-2"
            style={{ gridAutoRows: PANEL_HEIGHT }}
        >
            {panels.map(({ catalogue, rows, total, tickValues }) => {
                const name = getShortName(catalogue);

                return (
                    <section
                        key={catalogue}
                        className="flex h-full min-h-0 flex-col rounded-sm bg-[#F9F4EB] px-1.5 pt-2.5 pb-1"
                    >
                        <header
                            className="flex shrink-0 items-center gap-2 px-1 h-7"
                        >
                            <span
                                aria-hidden
                                className="size-2 shrink-0 rounded-full"
                                style={{
                                    backgroundColor: `var(--color-${getThemeColor(catalogue)})`,
                                }}
                            />
                            <Typography
                                variant="caption-meta"
                                className="font-bold text-black-500 text-xs"
                            >
                                {name}
                            </Typography>
                            <Typography
                                variant="caption"
                                className="text-[#595245] text-[0.563rem]"
                            >
                                {formatCompactNumber(total)} total
                            </Typography>
                        </header>

                        <div
                            className="min-h-0 flex-1 overflow-y-auto"
                            role="presentation"
                        >
                            <BarChart
                                data={rows}
                                catalogueIds={[catalogue]}
                                authorityByValue={authorityByValue}
                                showGaps
                                variant="compact"
                                margin={{ top: -12, right: 56, bottom: 28, left: 96 }}
                                axisBottomTickValues={tickValues}
                                rowGap={10}
                                ariaLabel={`${name} facet distribution, charted on its own scale`}
                            />
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export default FacetComparisonSmallMultiples;
