"use client";

import SkeltonSourceCard from "@/components/ui/SourceCard/SkeltonSourceCard";
import { SourceCard } from "@/components/ui/SourceCard/SourceCard";
import { catalogueQueryOptions, useCatalogueList } from "@/hooks/useCatalogues";
import { useQueries } from "@tanstack/react-query";
import { ReactNode } from "react";
interface CataloguesSectionProps {
  shouldUseSkelton?: boolean;
}

export function CataloguesSection({
  shouldUseSkelton,
}: CataloguesSectionProps): ReactNode {
  const { data: catalogues = [] } = useCatalogueList();

  const facetCoverageResults = useQueries({
    queries: catalogues.map((cat) =>
      catalogueQueryOptions.facetCoverage(
        cat.id as "ariadne" | "clarin-vlo" | "gotriple" | "sshomp",
      ),
    ),
  });

  const skeltonArray = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className="flex gap-6 flex-col xl:flex-row 3xl:justify-center">
      {shouldUseSkelton
        ? skeltonArray.map((skelton) => <SkeltonSourceCard key={skelton} />)
        : catalogues.map((catalogue) => {
            const coverage =
              facetCoverageResults.find(
                (result) => result.data?.catalogueId === catalogue.id,
              )?.data?.coverage || {};
            const sourceCardProps = {
              ...catalogue,
              coverage,
            };
            return <SourceCard key={catalogue.id} {...sourceCardProps} />;
          })}
    </div>
  );
}
