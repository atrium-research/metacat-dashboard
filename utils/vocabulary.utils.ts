import { components } from "@/types/api";

export const getAuthorities = (
  vocabularies: components["schemas"]["Vocabulary"][],
) => {
  return Array.from(
    new Set(vocabularies.map((vocabulary) => vocabulary.authority)).values(),
  );
};

export const getGroupedVocabulariesByAuthority = (
  vocabularies: components["schemas"]["Vocabulary"][],
) => {
  return vocabularies
    .toSorted((a, b) => a.name.localeCompare(b.name))
    .reduce<Record<string, components["schemas"]["Vocabulary"][]>>(
      (acc, vocabulary) => {
        const key = vocabulary.authority;
        acc[key] = [...(acc[key] || []), vocabulary];
        return acc;
      },
      {},
    );
};
