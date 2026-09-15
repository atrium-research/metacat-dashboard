import apiInstance, { safeFetch } from "@/services/axios";
import { components, operations } from "@/types/api";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const catalogueKeys = {
  all: ["catalogues"] as const,
  list: () => [...catalogueKeys.all, "list"] as const,
  detail: (id: string) => [...catalogueKeys.all, "detail", id] as const,
  versions: (id: string) => [...catalogueKeys.all, "versions", id] as const,
  versionsLast: (id: string) =>
    [...catalogueKeys.all, "versionsLast", id] as const,
  versionsById: (id: string, versionId: string) =>
    [...catalogueKeys.all, "versionsById", id, versionId] as const,
  versionsLastFacetValues: (
    id: string,
    query?: operations["catalogue_version_by_id_v1_catalogues__catalogue_id__versions__version_id__get"]["parameters"]["query"],
  ) =>
    [
      ...catalogueKeys.all,
      "versionsLastFacetValues",
      id,
      ...(query ? Object.values(query) : []),
    ] as const,
};

export const catalogueEndpoints = {
  list: () => "/v1/catalogues",
  detail: (id: string) => `/v1/catalogues/${id}`,
  versions: (id: string) => `/v1/catalogues/${id}/versions`,
  versionsLast: (id: string) => `/v1/catalogues/${id}/versions/last`,
  versionsById: (id: string, versionId: string) =>
    `/v1/catalogues/${id}/versions/${versionId}`,
  versionsLastFacetValues: (id: string) =>
    `/v1/catalogues/${id}/versions/last/facet_values`,
};
export const catalogueQueryOptions = {
  list: () =>
    queryOptions({
      queryKey: catalogueKeys.list(),
      queryFn: (): Promise<components["schemas"]["Catalogue"][]> =>
        safeFetch(() => apiInstance.get(catalogueEndpoints.list()), []),
      networkMode: "always",
      retry: false,
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: catalogueKeys.detail(id),
      queryFn: (): Promise<components["schemas"]["Catalogue"] | null> =>
        safeFetch(() => apiInstance.get(catalogueEndpoints.detail(id)), null),
      enabled: Boolean(id),
      networkMode: "always",
      retry: false,
    }),

  versions: (id: string) =>
    queryOptions({
      queryKey: catalogueKeys.versions(id),
      queryFn: (): Promise<components["schemas"]["CatalogueVersion"][]> =>
        safeFetch(() => apiInstance.get(catalogueEndpoints.versions(id)), []),
      enabled: Boolean(id),
      networkMode: "always",
      retry: false,
    }),

  versionsLast: (id: string) =>
    queryOptions({
      queryKey: catalogueKeys.versionsLast(id),
      queryFn: (): Promise<components["schemas"]["CatalogueVersion"]> =>
        safeFetch(
          () => apiInstance.get(catalogueEndpoints.versionsLast(id)),
          {} as components["schemas"]["CatalogueVersion"],
        ),
      enabled: Boolean(id),
      networkMode: "always",
      retry: false,
    }),

  versionsById: (id: string, versionId: string) =>
    queryOptions({
      queryKey: catalogueKeys.versionsById(id, versionId),
      queryFn: (): Promise<components["schemas"]["CatalogueVersion"]> =>
        safeFetch(
          () => apiInstance.get(catalogueEndpoints.versionsById(id, versionId)),
          {} as components["schemas"]["CatalogueVersion"],
        ),
      enabled: Boolean(id),
      networkMode: "always",
      retry: false,
    }),

  versionsLastFacetValues: (
    id: "ariadne" | "clarin-vlo" | "gotriple" | "sshomp",
    query?: operations["catalogue_version_by_id_v1_catalogues__catalogue_id__versions__version_id__get"]["parameters"]["query"],
  ) =>
    queryOptions({
      queryKey: catalogueKeys.versionsLastFacetValues(id, query),
      queryFn: async (): Promise<components["schemas"]["Page_FacetValue_"]> =>
        safeFetch(
          () =>
            apiInstance.get(catalogueEndpoints.versionsLastFacetValues(id), {
              params: query,
            }),
          {} as components["schemas"]["Page_FacetValue_"],
        ),
      enabled: Boolean(id),
      networkMode: "always",
      retry: false,
    }),
};

export const useCatalogueList = () => {
  return useSuspenseQuery(catalogueQueryOptions.list());
};

export const useCatalogue = (
  id: "ariadne" | "clarin-vlo" | "gotriple" | "sshomp",
) => {
  return useSuspenseQuery(catalogueQueryOptions.detail(id));
};
export const useCatalogueVersions = (
  id: "ariadne" | "clarin-vlo" | "gotriple" | "sshomp",
) => {
  return useSuspenseQuery(catalogueQueryOptions.versions(id));
};

export const useCatalogueVersionsLast = (
  id: "ariadne" | "clarin-vlo" | "gotriple" | "sshomp",
) => {
  return useSuspenseQuery(catalogueQueryOptions.versionsLast(id));
};

export const useCatalogueVersionsById = (
  id: "ariadne" | "clarin-vlo" | "gotriple" | "sshomp",
  versionId: string,
) => {
  return useSuspenseQuery(catalogueQueryOptions.versionsById(id, versionId));
};

export const useCatalogueVersionsLastFacetValues = (
  id: "ariadne" | "clarin-vlo" | "gotriple" | "sshomp",
  query?: operations["catalogue_version_by_id_v1_catalogues__catalogue_id__versions__version_id__get"]["parameters"]["query"],
) => {
  return useSuspenseQuery(
    catalogueQueryOptions.versionsLastFacetValues(id, query),
  );
};
