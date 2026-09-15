import { components } from "@/types/api";
import { getShortName } from "@/utils/catalogue.utils";
import { formatCompactNumber } from "@/utils/global.utils";

type FacetComparisonRow = components["schemas"]["FacetComparisonRow"];

const MINIMAL_PRESENCE = 10_000;

const getCount = (row: FacetComparisonRow, catalogue: string) =>
    row.counts?.[catalogue] ?? 0;

const getRowTotal = (row: FacetComparisonRow) =>
    Object.values(row.counts ?? {}).reduce<number>(
        (sum, count) => sum + (count ?? 0),
        0,
    );

const maxBy = <T>(items: T[], score: (item: T) => number) =>
    items.reduce<T | undefined>(
        (best, item) =>
            best !== undefined && score(best) >= score(item) ? best : item,
        undefined,
    );

const getCatalogueTotals = (data: FacetComparisonRow[]) => {
    const totals = new Map<string, number>();

    for (const row of data) {
        for (const [catalogue, count] of Object.entries(row.counts ?? {})) {
            totals.set(catalogue, (totals.get(catalogue) ?? 0) + (count ?? 0));
        }
    }

    return totals;
};

const getRowLeader = (row: FacetComparisonRow) =>
    maxBy(Object.entries(row.counts ?? {}), ([, count]) => count ?? 0)?.[0];

const describeCatalogue = (
    catalogue: string,
    total: number,
    data: FacetComparisonRow[],
) => {
    const name = getShortName(catalogue);
    const totalLabel = formatCompactNumber(total);

    if (total < MINIMAL_PRESENCE) {
        return `${name} (${totalLabel}) has minimal representation across all types`;
    }

    const dominant = maxBy(data, (row) => getCount(row, catalogue));
    const dominantCount = formatCompactNumber(dominant ? getCount(dominant, catalogue) : 0);

    return `${name} contributes ${totalLabel} records, strongest in ${dominant?.value} (${dominantCount})`;
};

export const generateChartSummary = (
    data: FacetComparisonRow[],
    facetLabel = "Resource Type",
): string => {
    const catalogueTotals = getCatalogueTotals(data);
    const [leader, ...otherCatalogues] = [...catalogueTotals.keys()].sort(
        (a, b) => (catalogueTotals.get(b) ?? 0) - (catalogueTotals.get(a) ?? 0),
    );

    if (data.length === 0 || leader === undefined) {
        return "No facet values match the current filters.";
    }

    const leaderName = getShortName(leader);
    const rankedRows = [...data].sort((a, b) => getRowTotal(b) - getRowTotal(a));
    const topRow = rankedRows[0];
    const leaderTopRow = maxBy(data, (row) => getCount(row, leader)) ?? topRow;
    const runnersUp = rankedRows.slice(1, 3).map((row) => row.value);

    const alsoLeads = rankedRows
        .filter(
            (row) =>
                row.value !== leaderTopRow.value && getRowLeader(row) === leader,
        )
        .slice(0, 3)
        .map((row) => row.value);

    const sentences = [
        `${facetLabel} Distribution: ${leaderName} leads with ${formatCompactNumber(catalogueTotals.get(leader) ?? 0)} total records, dominated by ${leaderTopRow.value} (~${formatCompactNumber(getCount(leaderTopRow, leader))})`,
        ...otherCatalogues.map((catalogue) =>
            describeCatalogue(catalogue, catalogueTotals.get(catalogue) ?? 0, data),
        ),
        runnersUp.length > 0
            ? `${topRow.value} is the dominant resource type overall, followed by ${runnersUp.join(" and ")}`
            : `${topRow.value} is the dominant resource type overall`,
        ...(alsoLeads.length > 0
            ? [`${leaderName} also leads in ${alsoLeads.join(", ")}`]
            : []),
    ];

    return `${sentences.join(". ")}.`;
};
