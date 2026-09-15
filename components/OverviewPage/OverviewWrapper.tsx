"use client";

import ErrorScreen from "@/components/Layout/ErrorScreen/ErrorScreen";
import { CataloguesSection } from "@/components/OverviewPage/CataloguesSection";
import { FactetSection } from "@/components/OverviewPage/FacetsSection/FacetsSection";
import { HeaderSection } from "@/components/OverviewPage/HeaderSection";
import { useCatalogueList } from "@/hooks/useCatalogues";

const OverviewWrapper = () => {
  const { error, isLoading, isError, isRefetching, isPending, refetch } =
    useCatalogueList();

  const shouldUseSkelton = isLoading || isRefetching || isPending;

  if (isError)
    return <ErrorScreen refetch={refetch} errorState={error.message} />;

  return (
    <div className="bg-beige-400 w-full">
      <main className="flex flex-col p-8 gap-10">
        <HeaderSection shouldUseSkelton={shouldUseSkelton} />
        <CataloguesSection shouldUseSkelton={shouldUseSkelton} />
        <FactetSection shouldUseSkelton={shouldUseSkelton} />
      </main>
    </div>
  );
};

export default OverviewWrapper;
