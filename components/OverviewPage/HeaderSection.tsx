"use client";

import { Typography } from "@/components/ui/Typography/Typography";
import { useCatalogueList } from "@/hooks/useCatalogues";
import { formatCompactNumber } from "@/utils/global.utils";
import { ReactNode } from "react";

interface HeaderSectionProps {
  shouldUseSkelton?: boolean;
}

export function HeaderSection({
  shouldUseSkelton,
}: HeaderSectionProps): ReactNode {
  const { data: catalogues = [] } = useCatalogueList();

  const totalCatalogues = catalogues.length;
  const activeCatalogues = catalogues.filter(
    (catalogue) => catalogue.harvest_status === "live",
  ).length;

  const totalResources = catalogues.reduce(
    (sum, catalogue) => sum + catalogue.total_resources,
    0,
  );
  const vocabulariesCount = catalogues.reduce(
    (sum, catalogue) => sum + catalogue.vocabularies_count,
    0,
  );
  return (
    <div className="flex flex-col gap-8 w-full items-end justify-end xl:flex-row xl:justify-between">
      <div className="flex flex-col gap-4 flex-1 max-w-full xl:max-w-200">
        <div className="flex flex-col gap-1">
          <Typography variant="caption" className="text-[0.6825rem] uppercase">
            WP3 · Catalogue of Catalogues
          </Typography>
          <Typography variant="h1" className="uppercase">
            OVERVIEW
          </Typography>
        </div>
        <Typography variant="body">
          Side-by-side comparison of four EOSC-funded catalogues — resources,
          vocabularies in use, coverage, and facets. Current data reflects a
          snapshot of the Research Object Model&apos;s progress.
        </Typography>
      </div>

      <div className="flex gap-4 flex-row flex-1 md:gap-16 md:justify-end md:max-w-fit">
        <div className="flex flex-col gap-1">
          {shouldUseSkelton ? (
            <span className="w-full h-12 bg-beige-600/60" aria-hidden="true" />
          ) : (
            <Typography variant="h2" className="text-[2rem]">
              {activeCatalogues} / {totalCatalogues}
            </Typography>
          )}
          <Typography variant="caption" className="uppercase">
            Catalogues Active
          </Typography>
        </div>

        <div className="flex flex-col gap-1">
          {shouldUseSkelton ? (
            <span className="w-full h-12 bg-beige-600/60" aria-hidden="true" />
          ) : (
            <Typography variant="h2" className="text-[2rem]">
              {formatCompactNumber(totalResources)}
            </Typography>
          )}
          <Typography variant="caption" className="uppercase">
            Resources (Sum)
          </Typography>
        </div>

        <div className="flex flex-col gap-1">
          {shouldUseSkelton ? (
            <span className="w-full h-12 bg-beige-600/60" aria-hidden="true" />
          ) : (
            <Typography variant="h2" className="text-[2rem]">
              {vocabulariesCount}
            </Typography>
          )}
          <Typography variant="caption" className="uppercase">
            Distinct Vocabularies
          </Typography>
        </div>
      </div>
    </div>
  );
}
