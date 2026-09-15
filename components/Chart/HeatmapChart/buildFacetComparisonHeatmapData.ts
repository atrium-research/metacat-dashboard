import type { BarChartDatum } from "@/components/Chart/BarChart/BarChartConfig";
import { HeatmapChartDatum } from "@/components/Chart/HeatmapChart/HeatmapChartConfig";
import { type FacetComparisonFilters } from "@/schema/FacetComparisonFilters";
import { SORT_MODES } from "@/schema/facetComparisonFilters.constants";
import type { components } from "@/types/api";

type FacetComparisonRow = components["schemas"]["FacetComparisonRow"];
type FacetComparison = components["schemas"]["FacetComparison"];

type RankedRow = {
  row: FacetComparisonRow;
  total: number;
};

export type FacetComparisonView = {
  rows: FacetComparisonRow[];
  totalCount: number;
};

const EMPTY_VIEW: FacetComparisonView = { rows: [], totalCount: 0 };

const filterByMinCount = (
  comparison: FacetComparison | undefined,
  minCount: number,
): RankedRow[] => {
  const ranked: RankedRow[] = [];

  for (const row of comparison?.values ?? []) {
    const counts: Record<string, number | null> = {};
    let total = 0;

    for (const [catalogueId, count] of Object.entries(row.counts ?? {})) {
      if (count === null || count === undefined) {
        counts[catalogueId] = null;
        continue;
      }

      const kept = count >= minCount ? count : 0;
      counts[catalogueId] = kept;
      total += kept;
    }

    if (total > 0) {
      ranked.push({ row: { value: row.value, counts }, total });
    }
  }

  return ranked;
};

export const buildFacetComparisonView = (
  comparison: FacetComparison | undefined,
  sort: FacetComparisonFilters["sort"],
  minCount: FacetComparisonFilters["minCount"] = 0,
): FacetComparisonView => {
  const ranked = filterByMinCount(comparison, minCount);
  if (ranked.length === 0) return EMPTY_VIEW;

  const top = ranked
    .toSorted((a, b) => b.total - a.total)
    .map(({ row }) => row);

  const rows =
    sort === SORT_MODES.A_TO_Z
      ? top.toSorted((a, b) => b.value.localeCompare(a.value))
      : top.reverse();

  return { rows, totalCount: ranked.length };
};

export const getCatalogueIds = (rows: FacetComparisonRow[]): string[] =>
  Array.from(new Set(rows.flatMap((row) => Object.keys(row.counts ?? {}))));

export const toBarChartData = (
  rows: FacetComparisonRow[],
  catalogueIds: string[],
): HeatmapChartDatum[] => {
  const data = rows.map((row) => {
    const datum: HeatmapChartDatum = { id: row.value, data: [] };

    for (const id of catalogueIds) {
      const count = row.counts?.[id];
      datum.data.push({
        x: id,
        y: count ?? undefined,
      });
    }

    return datum;
  });

  return data;
};
