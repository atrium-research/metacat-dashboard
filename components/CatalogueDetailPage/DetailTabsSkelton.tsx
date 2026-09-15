import CatalogueDetailPanelSkelton from "@/components/CatalogueDetailPage/CatalogueDetailPanel/CatalogueDetailPanelSkelton";

const DetailTabsSkelton = () => {
  const skeltonArray = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="flex flex-col gap-6 px-8 py-6"
    >
      <div
        className="flex gap-2 pb-6 max-sm:flex-col max-sm:max-w-fit"
        aria-hidden="true"
      >
        {skeltonArray.map((skelton) => (
          <span
            key={`${skelton}`}
            aria-hidden="true"
            className="w-18 h-8 bg-beige-600"
          />
        ))}
      </div>

      <CatalogueDetailPanelSkelton />
      <span className="sr-only">Loading catalogue list for details</span>
    </div>
  );
};

export default DetailTabsSkelton;
