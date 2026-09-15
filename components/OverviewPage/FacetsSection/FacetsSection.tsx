"use client";

import { ActivityCell } from "@/components/OverviewPage/FacetsSection/parts/ActivityCell";
import { CoverageMatrix } from "@/components/OverviewPage/FacetsSection/parts/CoverageMatrix";
import { Typography } from "@/components/ui/Typography/Typography";
import { useCatalogueList } from "@/hooks/useCatalogues";
import { ReactNode } from "react";
interface FactetSectionProps {
  shouldUseSkelton?: boolean;
}

export function FactetSection({
  shouldUseSkelton,
}: FactetSectionProps): ReactNode {
  const { data: catalogues = [] } = useCatalogueList();

  const skeltonArray = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className="flex flex-col w-full xl:flex-row xl:items-start gap-8 xl:flex-wrap 3xl:justify-center">
      <CoverageMatrix shouldUseSkelton={shouldUseSkelton} />
      <div className="flex p-8 gap-6 flex-col flex-1 xl:min-w-100 max-w-200 bg-white-500 border border-beige-600">
        <div className="flex flex-col gap-1">
          <Typography variant="caption" className="uppercase">
            Harvest Pipeline
          </Typography>
          <Typography variant="h3">Latest Activity</Typography>
        </div>

        <div className="flex flex-col">
          {shouldUseSkelton
            ? skeltonArray.map((skelton) => (
                <ActivityCell
                  key={skelton}
                  shouldUseSkelton={shouldUseSkelton}
                />
              ))
            : catalogues.map((catalogue) => {
                const { id, name, last_harvest_at } = catalogue;

                return (
                  <ActivityCell
                    key={id}
                    id={id}
                    name={name}
                    lastHarvestDate={new Date(last_harvest_at)}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}
