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

const getTopTwoRows = (
  items: FacetComparisonRow[],
  score: (item: FacetComparisonRow) => number,
) => {
  const dominant = maxBy(items, score);
  const otherItems = items.filter((item) => item.value !== dominant?.value);
  const secondLargest = maxBy(otherItems, score);

  return { dominant: dominant, second: secondLargest };
};

const describeCatalogue = (
  catalogue: string,
  total: number,
  data: FacetComparisonRow[],
  index: number,
) => {
  const name = getShortName(catalogue);
  const totalLabel = formatCompactNumber(total);

  if (total < MINIMAL_PRESENCE) {
    return `${name}'s counts are orders of magnitude smaller (${totalLabel} total), though its cells reach full intensity on its own scale.`;
  }

  const { dominant, second } = getTopTwoRows(data, (row) =>
    getCount(row, catalogue),
  );
  const dominantCount = formatCompactNumber(
    dominant ? getCount(dominant, catalogue) : 0,
  );
  const secondCount = second
    ? formatCompactNumber(getCount(second, catalogue))
    : undefined;

  if (index === 0)
    return `${name} follows with strong coverage in ${dominant?.value} (${dominantCount})${secondCount && ` and ${second?.value} (${secondCount})`}`;

  return `${name} concentrates in ${dominant?.value} (${dominantCount})${secondCount && ` and ${second?.value} (${secondCount})`}`;
};

export const generateHeatmapSummary = (
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
  const { dominant: leaderTopRow, second: leaderSecondRow } = getTopTwoRows(
    data,
    (row) => getCount(row, leader),
  );

  const sentences = [
    `${facetLabel} Distribution (Heatmap). Each catalogue column uses its own colour scale, normalised to that catalogue's own range - intensity shows magnitude within a catalogue, not across catalogues`,
    `${leaderName} dominates in absolute terms across nearly all facets, with ${(leaderTopRow ?? topRow).value} (${formatCompactNumber(getCount(leaderTopRow ?? topRow, leader))})${leaderSecondRow && ` and ${leaderSecondRow?.value} (${formatCompactNumber(getCount(leaderSecondRow, leader))})`}`,
    ...otherCatalogues.map((catalogue, index) =>
      describeCatalogue(
        catalogue,
        catalogueTotals.get(catalogue) ?? 0,
        data,
        index,
      ),
    ),
    "Hatched N/A cells indicate catalogue-facet pairs with no data; these are distinct from low-value cells",
  ];

  return `${sentences.join(". ")}.`;
};
