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
    query?: operations["facet_values_v1_facets_values_get"]["parameters"]["query"],
  ) =>
    [
      ...facetKeys.all,
      "values",
      ...(query ? Object.values(query) : []),
    ] as const,
};

export const facetEndpoints = {
  list: () => "/v1/facets",
  values: () => `/v1/facets/values`,
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
    query?: operations["facet_values_v1_facets_values_get"]["parameters"]["query"],
  ) =>
    queryOptions({
      queryKey: facetKeys.values(query),
      queryFn: (): Promise<components["schemas"]["FacetValue"][]> =>
        safeFetch(
          () =>
            apiInstance.get(facetEndpoints.values(), {
              params: query,
            }),
          [],
        ),
      networkMode: "always",
      retry: false,
    }),
};

export const useFacetList = () => {
  return useSuspenseQuery(facetQueryOptions.list());
};

export const useFacetValues = (
  query?: operations["facet_values_v1_facets_values_get"]["parameters"]["query"],
) => {
  return useQuery(facetQueryOptions.values(query));
};
