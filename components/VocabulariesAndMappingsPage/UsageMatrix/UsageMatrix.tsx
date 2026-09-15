"use client";

import { BlankLinesIcon } from "@/components/ui/Icons/BlankLines";
import { Typography } from "@/components/ui/Typography/Typography";
import { UsageTable } from "@/components/VocabulariesAndMappingsPage/UsageMatrix/parts/UsageTable";
import { useCatalogueList } from "@/hooks/useCatalogues";
import { useVocabularyList } from "@/hooks/useVocabularies";
import clsx from "clsx";
import { ReactNode } from "react";

interface UsageMatrixProps {
  shouldUseSkelton: boolean;
}

export function UsageMatrix({ shouldUseSkelton }: UsageMatrixProps): ReactNode {
  const { data: catalogues = [] } = useCatalogueList();
  const { data: vocabularies = [] } = useVocabularyList();

  return (
    <div className="w-full rounded-lg bg-white-100 border border-beige-550 max-2xl:overflow-auto">
      <div
        className={clsx(
          "flex w-full p-6 pb-4 gap-6",
          !shouldUseSkelton && "sticky top-0 left-0",
        )}
      >
        <div className="flex flex-col flex-1 gap-1.5">
          {shouldUseSkelton ? (
            <div className="flex gap-1.5" aria-hidden="true">
              <div className="w-20 h-3 bg-beige-600" />
              <Typography variant="caption">·</Typography>
              <div className="w-20 h-3 bg-beige-600" />
            </div>
          ) : (
            <Typography variant="caption">
              {vocabularies.length} VOCABULARIES · {catalogues.length}{" "}
              CATALOGUES
            </Typography>
          )}
          <Typography variant="h2" className="text-[1.375rem] leading-7">
            Vocabulary Inventory & Usage Matrix
          </Typography>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <span className="size-2.5 bg-black-500 rounded-[1px]" />
            <Typography
              variant="caption"
              className="text-[0.5625rem] uppercase"
            >
              Uses
            </Typography>
          </div>
          <div className="flex gap-1.5">
            <BlankLinesIcon className="size-2.5 bg-beige-400 rounded-[1px]" />
            <Typography
              variant="caption"
              className="text-[0.5625rem] uppercase"
            >
              N/A
            </Typography>
          </div>
        </div>
      </div>
      {shouldUseSkelton ? (
        <div
          className="block max-lg:min-w-200 w-full h-70 max-h-full border border-beige-600"
          aria-hidden="true"
        >
          <div className="w-full h-10 bg-white-500" />
          <div className="w-full h-10 bg-beige-600" />
          <div className="w-full h-10 bg-white-100 border-y border-beige-600" />
          <div className="w-full h-10 bg-white-100 border-y border-beige-600" />
          <div className="w-full h-10 bg-beige-600" />
          <div className="w-full h-10 bg-white-100 border-y border-beige-600" />
          <div className="w-full h-10 bg-white-100 border-y border-beige-600" />
        </div>
      ) : (
        <UsageTable />
      )}
    </div>
  );
}
