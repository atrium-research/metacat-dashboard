"use client";

import { Typography } from "@/components/ui/Typography/Typography";
import { catalogueQueryOptions, useCatalogueList } from "@/hooks/useCatalogues";
import { getThemeColor } from "@/utils/catalogue.utils";
import { formatCompactNumber } from "@/utils/global.utils";
import { useSuspenseQueries } from "@tanstack/react-query";

type FacetComparisonHeaderProps = {
    pivotFacet: string | null;
    minCount: number;
    shownValuesCount: number;
    totalValuesCount: number;
};

const FacetComparisonHeader = ({
    pivotFacet,
    minCount,
    shownValuesCount,
    totalValuesCount,
}: FacetComparisonHeaderProps) => {
    const { data: catalogues = [] } = useCatalogueList();

    const catalogueVersions = useSuspenseQueries({
        queries: catalogues.map((cat) =>
            catalogueQueryOptions.versionsLast(cat.id),
        ),
    });

    return (
        <header className="flex flex-col gap-4 xl:flex-row xl:justify-between xl:items-center">
            <div className="flex flex-col gap-1">
                <Typography className="text-[0.625rem] uppercase">
                    Facet Comparison
                </Typography>
                <Typography variant="h1" className="uppercase text-[1.75rem]">
                    {pivotFacet}
                </Typography>
                <Typography
                    variant="caption-meta"
                    className="text-xs text-gray-500"
                >
                    Showing {shownValuesCount} of {totalValuesCount}{" "}
                    {pivotFacet ?? "facet"} values across catalogues. Values
                    below {minCount} records are hidden by the active min count
                    filter.
                </Typography>
            </div>
            <div className="flex gap-12.5 mr-11.5">
                {catalogues.map((cat, index) => (
                    <div
                        key={cat.id}
                        className="border-l border-beige-600 pl-2.75 first:pl-0 first:border-none flex flex-col gap-1.25"
                    >
                        <Typography className="uppercase text-[0.625rem] whitespace-nowrap">
                            {cat.id}
                        </Typography>
                        <Typography
                            className={`text-xl font-bold font-inter! text-${getThemeColor(cat.id)}`}
                        >
                            {formatCompactNumber(
                                catalogueVersions[index]?.data?.total_resources ?? 0,
                            )}
                        </Typography>
                    </div>
                ))}
            </div>
        </header>
    );
};

export default FacetComparisonHeader;
