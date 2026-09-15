"use client";

import CatalogueDetailPanel from "@/components/CatalogueDetailPage/CatalogueDetailPanel/CatalogueDetailPanel";
import DetailTabsSkelton from "@/components/CatalogueDetailPage/DetailTabsSkelton";
import ErrorScreen from "@/components/Layout/ErrorScreen/ErrorScreen";
import { Tab } from "@/components/ui/Tab/Tab";
import { useCatalogueList } from "@/hooks/useCatalogues";
import { getShortName } from "@/utils/catalogue.utils";
import { TabList, TabPanel, TabPanels, Tabs } from "react-aria-components";

const CatalogueDetailTabs = () => {
  const {
    data: catalogues = [],
    error,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useCatalogueList();

  const shouldUseSkelton = isLoading || isRefetching;

  if (shouldUseSkelton) return <DetailTabsSkelton />;

  if (isError)
    return <ErrorScreen refetch={refetch} errorState={error.message} />;

  return (
    <Tabs keyboardActivation="manual">
      <TabList
        aria-label="Catalogue detail tabs"
        className="flex pb-6 max-sm:flex-col max-sm:max-w-fit"
      >
        {catalogues.map((catalogue) => {
          const shortName = getShortName(catalogue.id);

          return (
            <Tab key={catalogue.id} id={shortName} className="mx-4! my-2!">
              {shortName}
            </Tab>
          );
        })}
      </TabList>
      <TabPanels>
        {catalogues.map((catalogue) => {
          const shortName = getShortName(catalogue.id);

          return (
            <TabPanel key={catalogue.id} id={shortName}>
              <CatalogueDetailPanel catalogue={catalogue} />
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};

export default CatalogueDetailTabs;
