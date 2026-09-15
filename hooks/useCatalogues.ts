import apiInstance, { safeFetch } from "@/services/axios";
import { components } from "@/types/api";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const catalogueKeys = {
  all: ["catalogues"] as const,
  list: () => [...catalogueKeys.all, "list"] as const,
  detail: (id: string) => [...catalogueKeys.all, "detail", id] as const,
  facets: (id: string) => [...catalogueKeys.all, "facets", id] as const,
  vocabularies: (id: string) =>
    [...catalogueKeys.all, "vocabularies", id] as const,
  facetCoverage: (id: string) =>
    [...catalogueKeys.all, "facet-coverage", id] as const,
  provenance: (id: string) => [...catalogueKeys.all, "provenance", id] as const,
};

export const catalogueEndpoints = {
  list: () => "/v1/catalogues",
  detail: (id: string) => `/v1/catalogues/${id}`,
  facets: (id: string) => `/v1/catalogues/${id}/facets`,
  vocabularies: (id: string) => `/v1/catalogues/${id}/vocabularies`,
  facetCoverage: (id: string) => `/v1/catalogues/${id}/facet-coverage`,
  provenance: (id: string) => `/v1/catalogues/${id}/provenance`,
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

  facets: (id: string) =>
    queryOptions({
      queryKey: catalogueKeys.facets(id),
      queryFn: (): Promise<components["schemas"]["FacetExposure"][]> =>
        safeFetch(() => apiInstance.get(catalogueEndpoints.facets(id)), []),
      enabled: Boolean(id),
      networkMode: "always",
      retry: false,
    }),

  vocabularies: (id: string) =>
    queryOptions({
      queryKey: catalogueKeys.vocabularies(id),
      queryFn: (): Promise<components["schemas"]["Vocabulary"][]> =>
        safeFetch(
          () => apiInstance.get(catalogueEndpoints.vocabularies(id)),
          [],
        ),
      enabled: Boolean(id),
      networkMode: "always",
      retry: false,
    }),

  facetCoverage: (id: "ariadne" | "clarin-vlo" | "gotriple" | "sshomp") =>
    queryOptions({
      queryKey: catalogueKeys.facetCoverage(id),
      queryFn: async (): Promise<{
        catalogueId: "ariadne" | "clarin-vlo" | "gotriple" | "sshomp";
        coverage: {
          [key: string]: components["schemas"]["FacetExposureStatus"];
        };
      }> => {
        const coverage = await safeFetch(
          () => apiInstance.get(catalogueEndpoints.facetCoverage(id)),
          {},
        );
        return { catalogueId: id, coverage };
      },
      enabled: Boolean(id),
      networkMode: "always",
      retry: false,
    }),

  provenance: (id: string) =>
    queryOptions({
      queryKey: catalogueKeys.provenance(id),
      queryFn: (): Promise<{ [key: string]: unknown }> =>
        safeFetch(() => apiInstance.get(catalogueEndpoints.provenance(id)), {}),
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
export const useCatalogueFacets = (
  id: "ariadne" | "clarin-vlo" | "gotriple" | "sshomp",
) => {
  return useSuspenseQuery(catalogueQueryOptions.facets(id));
};

export const useCatalogueVocabularies = (
  id: "ariadne" | "clarin-vlo" | "gotriple" | "sshomp",
) => {
  return useSuspenseQuery(catalogueQueryOptions.vocabularies(id));
};

export const useCatalogueFacetCoverage = (
  id: "ariadne" | "clarin-vlo" | "gotriple" | "sshomp",
) => {
  return useSuspenseQuery(catalogueQueryOptions.facetCoverage(id));
};

export const useCatalogueProvenance = (
  id: "ariadne" | "clarin-vlo" | "gotriple" | "sshomp",
) => {
  return useSuspenseQuery(catalogueQueryOptions.provenance(id));
};
