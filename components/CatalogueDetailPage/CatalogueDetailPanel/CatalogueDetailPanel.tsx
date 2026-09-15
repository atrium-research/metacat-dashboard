"use client";

import CatalogueDetailPanelSkelton from "@/components/CatalogueDetailPage/CatalogueDetailPanel/CatalogueDetailPanelSkelton";
import ExposureTable from "@/components/CatalogueDetailPage/CatalogueDetailPanel/parts/ExposureTable";
import PanelGapSection from "@/components/CatalogueDetailPage/CatalogueDetailPanel/parts/PanelGapSection";
import PanelHeader from "@/components/CatalogueDetailPage/CatalogueDetailPanel/parts/PanelHeader";
import ProvenanceSection from "@/components/CatalogueDetailPage/CatalogueDetailPanel/parts/ProvenenceSection";
import ErrorScreen from "@/components/Layout/ErrorScreen/ErrorScreen";
import { Typography } from "@/components/ui/Typography/Typography";
import { useCatalogueVersionsLast } from "@/hooks/useCatalogues";
import { useVocabularyList } from "@/hooks/useVocabularies";
import { components } from "@/types/api";
import { getThemeColor } from "@/utils/catalogue.utils";
import clsx from "clsx";
import { Link } from "react-aria-components";

interface CatalogueDetailPanelProps {
  catalogue: components["schemas"]["Catalogue"];
}

const CatalogueDetailPanel = ({ catalogue }: CatalogueDetailPanelProps) => {
  const { id } = catalogue;

  const parsedId = id as "ariadne" | "clarin-vlo" | "gotriple" | "sshomp";

  const {
    data: catalogueVersionData,
    error,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useCatalogueVersionsLast(parsedId);

  const { data: vocabularyData } = useVocabularyList();

  const shouldUseSkelton = isLoading || isRefetching;

  const facetCount = catalogueVersionData.facet_exposures?.length;
  const totalVocabularyCount = vocabularyData.length;

  const themeColor = getThemeColor(parsedId);

  if (shouldUseSkelton) return <CatalogueDetailPanelSkelton />;

  if (isError)
    return <ErrorScreen refetch={refetch} errorState={error.message} />;

  return (
    <div className="flex flex-col gap-6 w-full ">
      <PanelHeader
        catalogue={{ ...catalogue, ...catalogueVersionData }}
        totalVocabularyCount={totalVocabularyCount}
      />
      <div className="flex gap-6 w-full flex-wrap max-lg:justify-center">
        <ExposureTable id={parsedId} />
        <div className="flex flex-col gap-6 h-fit max-lg:w-full lg:min-w-90">
          <div className="flex flex-col rounded-lg border border-beige-600 bg-white-500 gap-3 py-5 px-6">
            <Typography className="text-gray-700 uppercase" variant="caption">
              Vocabularies in use
              <span className="text-gray-700/50 font-regular lowercase ml-2">
                {catalogueVersionData.vocabularies?.length} of{" "}
                {totalVocabularyCount}
              </span>
            </Typography>
            {catalogueVersionData.vocabularies?.map((vocabulary) => {
              return (
                <div key={vocabulary} className="flex justify-between">
                  <Typography className="text-[0.8125rem] font-outfit text-black-500 leading-4">
                    {vocabulary}
                  </Typography>
                </div>
              );
            })}
            <Link
              className={clsx(
                `text-[0.6875rem] border border-transparent rounded-sm font-outfit leading-3.5 text-${themeColor} underline w-fit`,
                "hover:decoration-2",
                `focus-visible:outline-none focus-visible:border-${themeColor} focus-visible:text-black-500 focus-visible:no-underline`,
              )}
              href="/vocabularies-and-mappings"
            >
              Show all {totalVocabularyCount}
            </Link>
          </div>
          <PanelGapSection id={parsedId} facetCount={facetCount} />
        </div>
      </div>
      <ProvenanceSection id={parsedId} />
    </div>
  );
};

export default CatalogueDetailPanel;
