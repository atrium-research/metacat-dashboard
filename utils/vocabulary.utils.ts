import { components } from "@/types/api";

export const getAuthorities = (
  vocabularies: components["schemas"]["Vocabulary"][],
) => {
  return Array.from(
    new Set(vocabularies.map((vocabulary) => vocabulary.authority)).values(),
  );
};

export const getGrouppedVocabularies = (
  vocabularies: components["schemas"]["Vocabulary"][],
) => {
  const vocabulariesWithUsedFacets = vocabularies.filter(
    (vocabulary) => vocabulary.used_for_facets.length > 0,
  );

  const sortedVocabulariesByFacets = vocabulariesWithUsedFacets
    .map((vocabulary) => {
      return {
        ...vocabulary,
        used_for_facets: vocabulary.used_for_facets.toSorted(),
      };
    })
    .toSorted((a, b) => {
      if (a.used_for_facets.length !== b.used_for_facets.length) {
        return a.used_for_facets.length - b.used_for_facets.length;
      }

      return a.used_for_facets[0].localeCompare(b.used_for_facets[0]);
    });

  const grouppedVocabularies = sortedVocabulariesByFacets.reduce<
    Record<string, components["schemas"]["Vocabulary"][]>
  >((acc, vocabulary) => {
    const facet = vocabulary.used_for_facets.toSorted().join(", ");

    acc[facet] = [...(acc[facet] || []), vocabulary];
    return acc;
  }, {});

  return grouppedVocabularies;
};
