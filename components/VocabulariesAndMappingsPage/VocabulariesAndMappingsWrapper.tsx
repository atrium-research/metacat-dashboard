"use client";

import ErrorScreen from "@/components/Layout/ErrorScreen/ErrorScreen";
import { Typography } from "@/components/ui/Typography/Typography";
import { HeaderSection } from "@/components/VocabulariesAndMappingsPage/HeaderSection";
import { UsageMatrix } from "@/components/VocabulariesAndMappingsPage/UsageMatrix/UsageMatrix";
import { useVocabularyList } from "@/hooks/useVocabularies";

const VocabulariesAndMappingsWrapper = () => {
  const { error, isLoading, isError, isRefetching, refetch } =
    useVocabularyList();

  const shouldUseSkelton = isLoading || isRefetching;

  if (isError)
    return <ErrorScreen refetch={refetch} errorState={error.message} />;

  return (
    <div className="bg-beige-400 w-full">
      <main
        className="flex flex-col p-8 gap-8"
        aria-busy={shouldUseSkelton ? "true" : undefined}
        aria-live={shouldUseSkelton ? "polite" : undefined}
      >
        {shouldUseSkelton && (
          <span className="sr-only">
            Loading vocabularies and mappings list
          </span>
        )}
        <HeaderSection shouldUseSkelton={shouldUseSkelton} />
        <UsageMatrix shouldUseSkelton={shouldUseSkelton} />
        <Typography variant="body" className="text-[0.8125rem]">
          Fields of Science & Technology, IANA Media Types and DataCite Resource
          Types are used by all four catalogues. Getty AAT is used by ARIADNE
          and GoTriple only. ARIADNE Resource Types and PeriodO are used
          exclusively by ARIADNE; CLARIN Concept Registry exclusively by CLARIN.
          No catalogue uses every vocabulary listed.
        </Typography>
      </main>
    </div>
  );
};

export default VocabulariesAndMappingsWrapper;
