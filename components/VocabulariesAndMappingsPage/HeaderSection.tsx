"use client";

import { Typography } from "@/components/ui/Typography/Typography";
import { useVocabularyList } from "@/hooks/useVocabularies";
import { getAuthorities } from "@/utils/vocabulary.utils";
import { ReactNode } from "react";

interface HeaderSectionProps {
  shouldUseSkelton: boolean;
}

export function HeaderSection({
  shouldUseSkelton,
}: HeaderSectionProps): ReactNode {
  const { data: vocabularies = [] } = useVocabularyList();

  const authorities = getAuthorities(vocabularies);

  return (
    <div className="flex flex-col gap-8 w-full items-end justify-end xl:flex-row xl:justify-between">
      <div className="flex flex-col gap-4 flex-1 max-w-full xl:max-w-200">
        <div className="flex flex-col gap-1">
          <Typography variant="caption" className="text-[0.6825rem] uppercase">
            WP3 · Catalogue of Catalogues
          </Typography>
          <Typography variant="h1" className="uppercase">
            VOCABULARIES & MAPPINGS
          </Typography>
        </div>
        <Typography variant="body">
          Controlled vocabularies referenced across the four catalogues and
          which catalogue uses each.
        </Typography>
      </div>

      <div className="flex gap-4 flex-row flex-1 md:gap-16 md:justify-end md:max-w-fit">
        <div className="flex flex-col gap-1">
          {shouldUseSkelton ? (
            <span className="w-full h-12 bg-beige-600/60" aria-hidden="true" />
          ) : (
            <Typography variant="h2" className="text-[2rem]">
              {vocabularies.length}
            </Typography>
          )}
          <Typography variant="caption" className="uppercase">
            Distinct Vocabularies
          </Typography>
        </div>

        <div className="flex flex-col gap-1">
          {shouldUseSkelton ? (
            <span className="w-full h-12 bg-beige-600/60" aria-hidden="true" />
          ) : (
            <Typography variant="h2" className="text-[2rem]">
              {authorities.length}
            </Typography>
          )}
          <Typography variant="caption" className="uppercase">
            Authorities
          </Typography>
        </div>
      </div>
    </div>
  );
}
