import {
    type FacetComparisonFilters,
    facetComparisonFiltersSchema,
} from "@/schema/FacetComparisonFilters";
import {
    DEFAULT_MIN_COUNT,
    DEFAULT_SORT,
    DEFAULT_VISUALIZATION,
} from "@/schema/facetComparisonFilters.constants";
import { create } from "zustand";

type FacetComparisonFiltersState = FacetComparisonFilters & {
    setPivotFacet: (pivotFacet: unknown) => boolean;
    setVisualization: (visualization: unknown) => boolean;
    setMinCount: (minCount: unknown) => boolean;
    setSort: (sort: unknown) => boolean;
    setFilters: (filters: unknown) => boolean;
    resetFilters: () => void;
};

export const DEFAULT_FILTERS: FacetComparisonFilters =
    facetComparisonFiltersSchema.parse({
        pivotFacet: null,
        visualization: DEFAULT_VISUALIZATION,
        minCount: DEFAULT_MIN_COUNT,
        sort: DEFAULT_SORT,
    });

const pickFilters = (
    state: FacetComparisonFiltersState,
): FacetComparisonFilters => ({
    pivotFacet: state.pivotFacet,
    visualization: state.visualization,
    minCount: state.minCount,
    sort: state.sort,
});

export const useFacetComparisonFiltersStore =
    create<FacetComparisonFiltersState>((set) => {
        const applyPatch = (patch: Record<string, unknown>): boolean => {
            let success = false;

            set((state) => {
                const result = facetComparisonFiltersSchema.safeParse({
                    ...pickFilters(state),
                    ...patch,
                });

                if (!result.success) {
                    return state;
                }

                success = true;
                return result.data;
            });

            return success;
        };

        return {
            ...DEFAULT_FILTERS,
            setPivotFacet: (pivotFacet) => applyPatch({ pivotFacet }),
            setVisualization: (visualization) => applyPatch({ visualization }),
            setMinCount: (minCount) => applyPatch({ minCount }),
            setSort: (sort) => applyPatch({ sort }),
            setFilters: (filters) => {
                if (filters === null) {
                    return false;
                }

                return applyPatch(filters as Record<string, unknown>);
            },
            resetFilters: () => set(DEFAULT_FILTERS),
        };
    });
