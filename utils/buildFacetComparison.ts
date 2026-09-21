import type {
  CatalogueVersion,
  FacetComparison,
  FacetTimeseriesPoint,
  FacetValueItem,
  PivotFacet,
} from "@/types/catalogue-version";

export const getGapCataloguesForFacet = (
  facet: string,
  versions: (CatalogueVersion | undefined)[],
  catalogueIds: string[],
): Set<string> => {
  const gaps = new Set<string>();

  versions.forEach((version, index) => {
    const exposure = version?.facet_exposures?.find(
      (item) => item.facet === facet,
    );
    if (exposure?.status === "gap") {
      gaps.add(catalogueIds[index]);
    }
  });

  return gaps;
};

export const buildFacetComparisonFromValues = (
  facet: string,
  items: FacetValueItem[],
  catalogueIds: string[],
  gapCatalogues: ReadonlySet<string>,
): FacetComparison => {
  const valueMap = new Map<string, Record<string, number | null>>();

  for (const item of items) {
    let counts = valueMap.get(item.value);
    if (!counts) {
      counts = Object.fromEntries(catalogueIds.map((id) => [id, null]));
      valueMap.set(item.value, counts);
    }

    if (!gapCatalogues.has(item.catalogue_id)) {
      counts[item.catalogue_id] = item.count;
    }
  }

  return {
    facet: facet as PivotFacet,
    catalogues: catalogueIds,
    snapshot_timestamp: new Date().toISOString(),
    values: Array.from(valueMap.entries()).map(([value, counts]) => ({
      value,
      counts,
    })),
  };
};

export const buildTimeseriesFromVersions = (
  facet: string,
  versionsByCatalogue: Map<string, CatalogueVersion[]>,
): FacetTimeseriesPoint[] => {
  const points: FacetTimeseriesPoint[] = [];

  for (const [catalogueId, versions] of versionsByCatalogue) {
    const sortedVersions = [...versions].sort(
      (a, b) =>
        new Date(a.harvest_at).getTime() - new Date(b.harvest_at).getTime(),
    );

    const pointByDay = new Map<string, FacetTimeseriesPoint>();

    for (const version of sortedVersions) {
      if (version.harvest_status !== "success") continue;

      const exposure = version.facet_exposures?.find(
        (item) => item.facet === facet,
      );

      if (exposure?.total_count == null) continue;

      const dayKey = version.harvest_at.slice(0, 10);

      pointByDay.set(dayKey, {
        catalogue_id: catalogueId,
        facet: facet as PivotFacet,
        timestamp: version.harvest_at,
        total_count: exposure.total_count,
      });
    }

    points.push(...pointByDay.values());
  }

  return points;
};

export const countCatalogueGapsForFacet = (
  facet: string,
  versions: (CatalogueVersion | undefined)[],
): number => {
  return versions.filter((version) => {
    const exposure = version?.facet_exposures?.find(
      (item) => item.facet === facet,
    );
    return exposure?.status === "gap";
  }).length;
}
  