import type { components, operations } from "@/types/api";

export type CatalogueVersion = components["schemas"]["CatalogueVersion"];
export type CatalogueVersionFacetExposure =
  components["schemas"]["FacetExposure"];
export type FacetValueItem = components["schemas"]["FacetValue"];
export type PageFacetValues = components["schemas"]["Page_FacetValue_"];
export type FacetValuesQuery = NonNullable<
  operations["facet_values_v1_facets_values_get"]["parameters"]["query"]
>;
export type PivotFacet = components["schemas"]["FacetId"];

export type FacetComparisonRow = {
  value: string;
  counts: Record<string, number | null>;
};

export type FacetComparison = {
  facet: PivotFacet;
  catalogues: string[];
  snapshot_timestamp: string;
  values: FacetComparisonRow[];
};

export type FacetTimeseriesPoint = {
  catalogue_id: string;
  facet: PivotFacet;
  timestamp: string;
  total_count: number;
};
