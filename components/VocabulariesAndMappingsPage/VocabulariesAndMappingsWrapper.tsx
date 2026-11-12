"use client";

import ErrorScreen from "@/components/Layout/ErrorScreen/ErrorScreen";
import { Typography } from "@/components/ui/Typography/Typography";
import { HeaderSection } from "@/components/VocabulariesAndMappingsPage/HeaderSection";
import { UsageMatrix } from "@/components/VocabulariesAndMappingsPage/UsageMatrix/UsageMatrix";
import { catalogueQueryOptions, useCatalogueList } from "@/hooks/useCatalogues";
import { useVocabularyList } from "@/hooks/useVocabularies";
import { useSuspenseQueries } from "@tanstack/react-query";

const VocabulariesAndMappingsWrapper = () => {
  const { error, isLoading, isError, isRefetching, refetch } =
    useVocabularyList();

  const shouldUseSkelton = isLoading || isRefetching;

  const { data: catalogues = [] } = useCatalogueList();

  const catalogueVersions = useSuspenseQueries({
    queries: catalogues.map((cat) =>
      catalogueQueryOptions.versionsLast(cat.id),
    ),
  }).filter(
    (catalogueVersion) =>
      typeof catalogueVersion.data.harvest_error === "string",
  );

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

        {catalogueVersions.length > 0 && (
          <div className="flex flex-col gap-1 -mt-4">
            {catalogueVersions.map(({ data }) => (
              <Typography
                key={data.catalogue_id}
                variant="caption-meta"
                className="uppercase text-[0.5625rem] text-red-600"
              >
                Warining for catalogue {data.catalogue_id}: {data.harvest_error}
              </Typography>
            ))}
          </div>
        )}

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
