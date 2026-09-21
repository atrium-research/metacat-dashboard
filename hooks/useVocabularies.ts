import apiInstance, { safeFetch } from "@/services/axios";
import { components, operations } from "@/types/api";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const vocabularyKeys = {
  all: ["vocabularies"] as const,
  list: () => [...vocabularyKeys.all, "list"] as const,
  detail: (id: string) => [...vocabularyKeys.all, "detail", id] as const,
};

export const vocabularyEndpoints = {
  list: () => "/v1/vocabularies",
  detail: (id: string) => `/v1/vocabularies/${id}`,
  concepts: (id: string) => `/v1/vocabularies/${id}/concepts`,
};

export const vocabularyQueryOptions = {
  list: () =>
    queryOptions({
      queryKey: vocabularyKeys.list(),
      queryFn: (): Promise<components["schemas"]["Vocabulary"][]> =>
        safeFetch(() => apiInstance.get(vocabularyEndpoints.list()), []),
      networkMode: "always",
      retry: false,
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: vocabularyKeys.detail(id),
      queryFn: (): Promise<components["schemas"]["Vocabulary"] | null> =>
        safeFetch(() => apiInstance.get(vocabularyEndpoints.detail(id)), null),
      enabled: Boolean(id),
      networkMode: "always",
      retry: false,
    }),
};

export const useVocabularyList = () => {
  return useSuspenseQuery(vocabularyQueryOptions.list());
};

export const useVocabulary = (id: string) => {
  return useSuspenseQuery(vocabularyQueryOptions.detail(id));
};
