"use client";
import { Slider } from "@/components/ui/Slider/Slider";
import { SystemBadge } from "@/components/ui/SystemBadge/SystemBadge";
import { ToggleButton } from "@/components/ui/ToggleButton/ToggleButton";
import { Typography } from "@/components/ui/Typography/Typography";
import {
    useFacetGapCounts,
} from "@/hooks/useFacetComparison";
import { useFacetList } from "@/hooks/useFacets";
import {
    DEFAULT_MIN_COUNT,
    DEFAULT_MIN_COUNT_MAX,
    DEFAULT_MIN_COUNT_MIN,
    DEFAULT_SORT,
    SORT_MODES,
    VISUALIZATION_MODES,
} from "@/schema/facetComparisonFilters.constants";
import { useFacetComparisonFiltersStore } from "@/store/FacetComparisonFilters";
import { useEffect, useState } from "react";
import { type Selection, ToggleButtonGroup } from "react-aria-components";
import { useShallow } from "zustand/react/shallow";

const getKeyString = (keys: Selection) => {
    return [...keys].length > 0 ? [...keys].join(" ") : null;
};

const FacetComparisonFiltersSidebar = () => {
    const {
        pivotFacet,
        visualization,
        minCount,
        sort,
        setPivotFacet,
        setVisualization,
        setSort,
        setMinCount,
    } = useFacetComparisonFiltersStore(
        useShallow((state) => ({
            pivotFacet: state.pivotFacet,
            visualization: state.visualization,
            minCount: state.minCount,
            sort: state.sort,
            setPivotFacet: state.setPivotFacet,
            setVisualization: state.setVisualization,
            setSort: state.setSort,
            setMinCount: state.setMinCount,
        })),
    );

    const { data: facetNames } = useFacetList();
    const [draftMinCount, setDraftMinCount] = useState(minCount);
    const gapCountByFacet = useFacetGapCounts(facetNames);

    useEffect(() => {
        if (!facetNames.length) return;
        if (pivotFacet !== null) return;

        setPivotFacet(facetNames[0]);
    }, [facetNames, pivotFacet, setPivotFacet]);
    
    return (
        <div className="bg-white-500 w-58.75 border-r border-b border-beige-600">
            <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
                <Typography className="uppercase text-[0.625rem] px-4 pb-1.75 mt-4 border-b border-beige-600 text-black-400">
                    filters / refine
                </Typography>
                <div className="my-1.75">
                    <Typography className="text-[0.625rem] px-4 text-black-400 uppercase">
                        pivot facet
                    </Typography>
                    <ToggleButtonGroup
                        selectionMode="single"
                        selectedKeys={new Set([pivotFacet ?? ""])}
                        onSelectionChange={(keys) =>
                            setPivotFacet(getKeyString(keys))
                        }
                    >
                        {facetNames.map((facetName) => (
                            <ToggleButton
                                id={facetName}
                                key={facetName}
                                className="flex justify-between items-center w-full p-0! h-8 px-4! bg-transparent border-none rounded-none [&:hover,&[data-selected]:hover]:bg-[#DFB1AA]!"
                            >
                                <Typography
                                    variant="caption-meta"
                                    className="text-xs capitalize"
                                >
                                    {facetName}
                                </Typography>
                                <SystemBadge gapCount={gapCountByFacet[facetName]}/>
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </div>

                <div className="pl-4 pr-2.75 flex flex-col gap-2 mt-1">
                    <div>
                        <Typography
                            className="text-[0.625rem] text-black-400 uppercase"
                            variant="caption"
                        >
                            visualization
                        </Typography>
                        <ToggleButtonGroup
                            selectionMode="single"
                            selectedKeys={new Set([visualization])}
                            onSelectionChange={(keys) =>
                                setVisualization(getKeyString(keys))
                            }
                        >
                            <div className="grid grid-cols-2 gap-1">
                                {VISUALIZATION_MODES.map((mode) => (
                                    <ToggleButton
                                        className="w-full text-start pl-1.25 border border-gray-400 text-gray-500 font-normal! text-[0.625rem] capitalize"
                                        id={mode}
                                        key={mode}
                                    >
                                        {mode}
                                    </ToggleButton>
                                ))}
                            </div>
                        </ToggleButtonGroup>
                    </div>
                    <div>
                        <Typography
                            className="text-[0.625rem] text-black-400 uppercase"
                            variant="caption"
                        >
                            min count
                        </Typography>
                        <div className="flex items-center">
                            <Slider
                                defaultValue={DEFAULT_MIN_COUNT}
                                minValue={DEFAULT_MIN_COUNT_MIN}
                                maxValue={DEFAULT_MIN_COUNT_MAX}
                                value={draftMinCount}
                                onChange={setDraftMinCount}
                                onChangeEnd={setMinCount}
                                aria-labelledby="min-count-slider"
                            />
                            <Typography
                                id="min-count-slider"
                                className="text-[0.625rem] w-1/2 ml-2.5"
                            >
                                ≥ {draftMinCount}
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <Typography
                            className="text-[0.625rem] text-black-400 uppercase"
                            variant="caption"
                        >
                            sort
                        </Typography>
                        <ToggleButtonGroup
                            selectionMode="single"
                            selectedKeys={new Set([sort])}
                            onSelectionChange={(keys) =>
                                setSort(getKeyString(keys))
                            }
                            className="grid grid-cols-2 gap-1"
                            defaultSelectedKeys={DEFAULT_SORT}
                        >
                            {Object.values(SORT_MODES).map((mode) => (
                                <ToggleButton
                                    className="w-full font-normal! data-selected:font-medium! text-[0.625rem]"
                                    key={mode}
                                    id={mode}
                                >
                                    {mode}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacetComparisonFiltersSidebar;
