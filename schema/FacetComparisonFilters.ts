import {
    DEFAULT_MIN_COUNT,
    DEFAULT_MIN_COUNT_MAX,
    DEFAULT_MIN_COUNT_MIN,
    DEFAULT_SORT,
    DEFAULT_VISUALIZATION,
    SORT_MODES,
    VISUALIZATION_MODES,
} from "@/schema/facetComparisonFilters.constants";
import { z } from "zod";

export const facetComparisonFiltersSchema = z.object({
    pivotFacet: z.string().nullable(),
    visualization: z.enum(VISUALIZATION_MODES).default(DEFAULT_VISUALIZATION),
    minCount: z
        .number()
        .int()
        .min(DEFAULT_MIN_COUNT_MIN)
        .max(DEFAULT_MIN_COUNT_MAX)
        .default(DEFAULT_MIN_COUNT),
    sort: z.enum(SORT_MODES).default(DEFAULT_SORT),
});

export type FacetComparisonFilters = z.infer<
    typeof facetComparisonFiltersSchema
>;
