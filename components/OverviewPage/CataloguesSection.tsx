"use client";

import SkeltonSourceCard from "@/components/ui/SourceCard/SkeltonSourceCard";
import { SourceCard } from "@/components/ui/SourceCard/SourceCard";
import { catalogueQueryOptions, useCatalogueList } from "@/hooks/useCatalogues";
import { components } from "@/types/api";
import { useSuspenseQueries } from "@tanstack/react-query";
import { ReactNode } from "react";
interface CataloguesSectionProps {
  shouldUseSkelton?: boolean;
}

export function CataloguesSection({
  shouldUseSkelton,
}: CataloguesSectionProps): ReactNode {
  const { data: catalogues = [] } = useCatalogueList();

  const catalogueVersions = useSuspenseQueries({
    queries: catalogues.map((cat) =>
      catalogueQueryOptions.versionsLast(
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
            const catalogueVersion =
              catalogueVersions.find(
                (result) => result.data?.catalogue_id === catalogue.id,
              )?.data || ({} as components["schemas"]["CatalogueVersion"]);
            return (
              <SourceCard
                key={catalogue.id}
                catalogue={{ ...catalogue, ...catalogueVersion }}
              />
            );
          })}
    </div>
  );
}
