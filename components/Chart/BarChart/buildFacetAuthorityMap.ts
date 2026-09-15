import type { components } from "@/types/api";

type FacetValue = components["schemas"]["FacetValue"];

export const buildFacetAuthorityMap = (
    values: FacetValue[] | undefined,
): Record<string, string> => {
    const authorityByValue: Record<string, string> = {};

    for (const facetValue of values ?? []) {
        const scheme = facetValue.vocabulary_term?.scheme;
        if (scheme && !authorityByValue[facetValue.value]) {
            authorityByValue[facetValue.value] = scheme;
        }
    }

    return authorityByValue;
};
