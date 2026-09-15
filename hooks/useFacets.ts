import apiInstance, { safeFetch } from "@/services/axios";
import { components, operations } from "@/types/api";
import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const facetKeys = {
  all: ["facets"] as const,
  list: () => [...facetKeys.all, "list"] as const,
  values: (
    id: string,
    query?: operations["facet_values_v1_facets__facet__values_get"]["parameters"]["query"],
  ) =>
    [
      ...facetKeys.all,
      "values",
      id,
      ...(query ? Object.values(query) : []),
    ] as const,
  compare: (
    id: string,
    query?: operations["facet_compare_v1_facets__facet__compare_get"]["parameters"]["query"],
  ) =>
    [
      ...facetKeys.all,
      "compare",
      id,
      ...(query ? Object.values(query) : []),
    ] as const,
  timeseries: (
    id: string,
    query?: operations["facet_timeseries_v1_facets__facet__timeseries_get"]["parameters"]["query"],
  ) =>
    [
      ...facetKeys.all,
      "timeseries",
      id,
      ...(query ? Object.values(query) : []),
    ] as const,
};

export const facetEndpoints = {
  list: () => "/v1/facets",
  values: (id: string) => `/v1/facets/${id}/values`,
  compare: (id: string) => `/v1/facets/${id}/compare`,
  timeseries: (id: string) => `/v1/facets/${id}/timeseries`,
};

export const facetQueryOptions = {
  list: () =>
    queryOptions({
      queryKey: facetKeys.list(),
      queryFn: (): Promise<string[]> =>
        safeFetch(() => apiInstance.get(facetEndpoints.list()), []),
      networkMode: "always",
      retry: false,
    }),

  values: (
    id: string,
    query?: operations["facet_values_v1_facets__facet__values_get"]["parameters"]["query"],
  ) =>
    queryOptions({
      queryKey: facetKeys.values(id, query),
      queryFn: (): Promise<components["schemas"]["FacetValue"][]> =>
        safeFetch(
          () =>
            apiInstance.get(facetEndpoints.values(id), {
              params: query,
            }),
          [],
        ),
      enabled: Boolean(id),
      networkMode: "always",
      retry: false,
    }),

  compare: (
    id: string,
    query?: operations["facet_compare_v1_facets__facet__compare_get"]["parameters"]["query"],
  ) =>
    queryOptions({
      queryKey: facetKeys.compare(id, query),
      queryFn: (): Promise<components["schemas"]["FacetComparison"]> =>
        safeFetch(
          () =>
            apiInstance.get(facetEndpoints.compare(id), {
              params: query,
            }),
          {} as components["schemas"]["FacetComparison"],
        ),
      enabled: Boolean(id),
      networkMode: "always",
      retry: false,
    }),

  timeseries: (
    id: string,
    query?: operations["facet_timeseries_v1_facets__facet__timeseries_get"]["parameters"]["query"],
  ) =>
    queryOptions({
      queryKey: facetKeys.timeseries(id, query),
      queryFn: (): Promise<components["schemas"]["FacetTimeseriesPoint"][]> =>
        safeFetch(
          () =>
            apiInstance.get(facetEndpoints.timeseries(id), {
              params: query,
            }),
          [],
        ),
      enabled: Boolean(id),
      networkMode: "always",
      retry: false,
    }),
};

export const useFacetList = () => {
  return useSuspenseQuery(facetQueryOptions.list());
};

export const useFacetValues = (
  id: string,
  query?: operations["facet_values_v1_facets__facet__values_get"]["parameters"]["query"],
) => {
  return useQuery(facetQueryOptions.values(id, query));
};

export const useFacetCompare = (
  id: string,
  query?: operations["facet_compare_v1_facets__facet__compare_get"]["parameters"]["query"],
) => {
  return useQuery(facetQueryOptions.compare(id, query));
};

export const useFacetTimeseries = (
  id: string,
  query?: operations["facet_timeseries_v1_facets__facet__timeseries_get"]["parameters"]["query"],
) => {
  return useQuery(facetQueryOptions.timeseries(id, query));
};
