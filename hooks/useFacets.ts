import { catalogueQueryOptions, useCatalogueList } from "@/hooks/useCatalogues";
import apiInstance, { safeFetch } from "@/services/axios";
import type {
  CatalogueVersion,
  FacetValueItem,
  FacetValuesQuery,
  PageFacetValues,
  PivotFacet,
} from "@/types/catalogue-version";
import {
  buildFacetComparisonFromValues,
  buildTimeseriesFromVersions,
  getGapCataloguesForFacet,
} from "@/utils/buildFacetComparison";
import {
  queryOptions,
  useQueries,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useMemo } from "react";

type FacetValuesQueryInput = Omit<FacetValuesQuery, "facets" | "catalogues"> & {
  facets?: string | string[] | null;
  catalogues?: string | string[] | null;
};

const toCommaSeparated = (value?: string | string[] | null) => {
  if (value == null) return undefined;
  if (Array.isArray(value)) return value.join(",") || undefined;
  return value || undefined;
};

const serializeFacetValuesQuery = (
  query?: FacetValuesQueryInput,
): FacetValuesQuery | undefined => {
  if (!query) return undefined;

  return {
    ...query,
    facets: toCommaSeparated(query.facets),
    catalogues: toCommaSeparated(query.catalogues),
  };
};

const FACET_VALUES_PAGE_SIZE = 100;

export const facetKeys = {
  all: ["facets"] as const,
  list: () => [...facetKeys.all, "list"] as const,
  values: (query?: FacetValuesQueryInput) =>
    [...facetKeys.all, "values", serializeFacetValuesQuery(query) ?? {}] as const,
  valuesAll: (query?: FacetValuesQueryInput) =>
    [
      ...facetKeys.all,
      "valuesAll",
      serializeFacetValuesQuery(query) ?? {},
    ] as const,
};

const facetEndpoints = {
  list: () => "/v1/facets",
  values: () => "/v1/facets/values",
};

const fetchFacetValuesPage = async (
  query?: FacetValuesQueryInput,
): Promise<PageFacetValues> => {
  const { data } = await apiInstance.get<PageFacetValues>(
    facetEndpoints.values(),
    {
      params: serializeFacetValuesQuery(query),
    },
  );
  return data;
};

const fetchAllFacetValues = async (
  query?: FacetValuesQueryInput,
): Promise<FacetValueItem[]> => {
  const firstPage = await fetchFacetValuesPage({
    ...query,
    page: 1,
    size: FACET_VALUES_PAGE_SIZE,
  });

  if (firstPage.pages <= 1) {
    return firstPage.items;
  }

  const remainingPages = await Promise.all(
    Array.from({ length: firstPage.pages - 1 }, (_, index) =>
      fetchFacetValuesPage({
        ...query,
        page: index + 2,
        size: FACET_VALUES_PAGE_SIZE,
      }),
    ),
  );

  return [
    ...firstPage.items,
    ...remainingPages.flatMap((page) => page.items),
  ];
};

export const facetQueryOptions = {
  list: () =>
    queryOptions({
      queryKey: facetKeys.list(),
      queryFn: (): Promise<PivotFacet[]> =>
        safeFetch(() => apiInstance.get(facetEndpoints.list()), []),
      networkMode: "always",
      retry: false,
    }),

  values: (query?: FacetValuesQueryInput) =>
    queryOptions({
      queryKey: facetKeys.values(query),
      queryFn: (): Promise<PageFacetValues> => fetchFacetValuesPage(query),
      networkMode: "always",
      retry: false,
    }),

  valuesAll: (query?: FacetValuesQueryInput) =>
    queryOptions({
      queryKey: facetKeys.valuesAll(query),
      queryFn: (): Promise<FacetValueItem[]> => fetchAllFacetValues(query),
      networkMode: "always",
      retry: false,
    }),
};

export const useFacetList = () => {
  return useSuspenseQuery(facetQueryOptions.list());
};

export const useFacetValues = (query?: FacetValuesQueryInput) => {
  return useQuery(facetQueryOptions.values(query));
};

export const useCatalogueIds = (): string[] => {
  const { data: catalogues } = useCatalogueList();
  return useMemo(
    () => catalogues?.map((catalogue) => catalogue.id) ?? [],
    [catalogues],
  );
};

export const useFacetCompare = (facet: string) => {
  const catalogueIds = useCatalogueIds();

  const versionsLast = useQueries({
    queries: catalogueIds.map((id) =>
      catalogueQueryOptions.versionsLast(id),
    ),
  });

  const hasVersionsError = versionsLast.some((result) => result.isError);

  const gapCatalogues = useMemo(() => {
    if (hasVersionsError) return new Set<string>();

    return getGapCataloguesForFacet(
      facet,
      versionsLast.map((result) => result.data),
      catalogueIds,
    );
  }, [facet, versionsLast, catalogueIds, hasVersionsError]);

  const valuesQuery = useQuery({
    ...facetQueryOptions.valuesAll({
      facets: facet,
      catalogues: catalogueIds,
    }),
    enabled: Boolean(facet) && catalogueIds.length > 0,
  });

  const comparison = useMemo(() => {
    if (!facet || !valuesQuery.data || hasVersionsError) return undefined;

    return buildFacetComparisonFromValues(
      facet,
      valuesQuery.data,
      catalogueIds,
      gapCatalogues,
    );
  }, [facet, valuesQuery.data, catalogueIds, gapCatalogues, hasVersionsError]);

  const isLoading =
    valuesQuery.isLoading ||
    versionsLast.some((result) => result.isLoading);

  return { data: comparison, isLoading, isError: hasVersionsError };
};

export const useFacetTimeseries = (facet: string) => {
  const catalogueIds = useCatalogueIds();

  const versionsQueries = useQueries({
    queries: catalogueIds.map((id) => ({
      ...catalogueQueryOptions.versions(id),
      enabled: Boolean(facet),
    })),
  });

  const isLoading = versionsQueries.some((result) => result.isLoading);

  const versionsByCatalogue = new Map<string, CatalogueVersion[]>();
  catalogueIds.forEach((id, index) => {
    versionsByCatalogue.set(
      id,
      (versionsQueries[index].data as CatalogueVersion[] | undefined) ?? [],
    );
  });

  const timeseries = facet
    ? buildTimeseriesFromVersions(facet, versionsByCatalogue)
    : [];

  return { data: timeseries, isLoading };
};
