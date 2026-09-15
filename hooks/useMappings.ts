import apiInstance, { safeFetch } from "@/services/axios";
import { components, operations } from "@/types/api";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const mappingKeys = {
  all: ["mappings"] as const,
  list: (
    query?: operations["list_mappings_v1_mappings_get"]["parameters"]["query"],
  ) =>
    [
      ...mappingKeys.all,
      "list",
      ...(query ? Object.values(query) : []),
    ] as const,
  overlap: (
    query?: operations["vocabulary_overlap_v1_mappings_overlap_get"]["parameters"]["query"],
  ) =>
    [
      ...mappingKeys.all,
      "overlap",
      ...(query ? Object.values(query) : []),
    ] as const,
};

export const mappingEndpoints = {
  list: () => "/v1/mappings",
  overlap: () => `/v1/mappings/overlap`,
};

export const mappingQueryOptions = {
  list: (
    query?: operations["list_mappings_v1_mappings_get"]["parameters"]["query"],
  ) =>
    queryOptions({
      queryKey: mappingKeys.list(query),
      queryFn: (): Promise<components["schemas"]["Mapping"][]> =>
        safeFetch(
          () =>
            apiInstance.get(mappingEndpoints.list(), {
              params: query,
            }),
          [],
        ),
      networkMode: "always",
      retry: false,
    }),

  overlap: (
    query?: operations["vocabulary_overlap_v1_mappings_overlap_get"]["parameters"]["query"],
  ) =>
    queryOptions({
      queryKey: mappingKeys.overlap(query),
      queryFn: (): Promise<components["schemas"]["Mapping"] | null> =>
        safeFetch(
          () =>
            apiInstance.get(mappingEndpoints.overlap(), {
              params: query,
            }),
          null,
        ),
      networkMode: "always",
      retry: false,
    }),
};

export const useMappingList = (
  query?: operations["list_mappings_v1_mappings_get"]["parameters"]["query"],
) => {
  return useSuspenseQuery(mappingQueryOptions.list(query));
};

export const useMappingOverlap = (
  query?: operations["vocabulary_overlap_v1_mappings_overlap_get"]["parameters"]["query"],
) => {
  return useSuspenseQuery(mappingQueryOptions.overlap(query));
};
