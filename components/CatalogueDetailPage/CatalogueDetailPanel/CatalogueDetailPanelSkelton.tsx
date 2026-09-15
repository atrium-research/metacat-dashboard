"use client";

import { Typography } from "@/components/ui/Typography/Typography";

const CatalogueDetailPanelSkelton = () => {
  const skeltonDetailsArray = Array.from(
    { length: 6 },
    (_, i) => `skelton-detail_${i}`,
  );

  const skeltonVocabsArray = Array.from(
    { length: 6 },
    (_, i) => `skelton-vocab_${i}`,
  );

  const skeltonProvenancesArray = Array.from(
    { length: 5 },
    (_, i) => `skelton-provenance_${i}`,
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      <span className="sr-only">Loading catalogue list for details</span>
      <div
        aria-hidden="true"
        className="rounded-sm outline outline-beige-600 bg-white-500 flex flex-wrap gap-10 py-6 px-7 w-full min-h-55"
      >
        <div className="flex flex-col gap-3 flex-1 h-fit" aria-hidden="true">
          <span className="w-80 h-3 bg-beige-600/40" aria-hidden="true" />
          <span className="w-80 h-12 bg-beige-600" aria-hidden="true" />
          <span className="w-80 h-3 bg-beige-600/40" aria-hidden="true" />
          <span className="w-80 h-15 bg-beige-600/40" aria-hidden="true" />
        </div>
        <div
          className="flex flex-col gap-3.5 w-120 max-w-full max-sm:gap-6"
          aria-hidden="true"
        >
          {skeltonDetailsArray.map((skeltonDetail) => (
            <div
              key={skeltonDetail}
              className="flex gap-3 sm:items-center h-fit max-sm:flex-col max-sm:gap-2"
              aria-hidden="true"
            >
              <span className="w-20 h-3 bg-beige-600/40" aria-hidden="true" />
              <span className="w-20 h-3 bg-beige-600/40" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-6 w-full flex-wrap max-lg:justify-center">
        <div className="flex flex-col flex-1 rounded-lg border border-beige-600 bg-white-500 gap-4 py-5 px-6 h-125">
          <Typography
            className="text-[0.625rem] text-gray-700 uppercase"
            variant="caption"
          >
            FACET EXPOSURE
          </Typography>
          <span className="w-full h-100 bg-beige-600" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-6 h-fit max-lg:w-full lg:min-w-90">
          <div className="flex flex-col rounded-lg border border-beige-600 bg-white-500 gap-3 py-5 px-6">
            <Typography className="text-gray-700 uppercase" variant="caption">
              Vocabularies in use
              <span className="w-20 h-3 bg-beige-600/40" aria-hidden="true" />
            </Typography>
            {skeltonVocabsArray?.map((skeltonVocab) => {
              return (
                <div key={skeltonVocab} className="flex justify-between">
                  <span
                    className="w-20 h-3 bg-beige-600/40"
                    aria-hidden="true"
                  />
                  <span
                    className="w-20 h-3 bg-beige-600/40"
                    aria-hidden="true"
                  />
                </div>
              );
            })}
          </div>
          <div className="flex flex-col rounded-lg border border-beige-600 bg-white-500 gap-3 py-5 px-6">
            <Typography className="text-gray-700 uppercase" variant="caption">
              known gaps
            </Typography>
            <span className="w-20 h-3 bg-beige-600/40" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="bg-white-500 border border-beige-600 flex gap-5 flex-col pt-5 pb-6 px-7">
        <Typography
          className="text-[0.625rem] text-gray-500 leading-3.25"
          variant="caption"
        >
          PROVENANCE / LINEAGE — FROM SOURCE TO GRAPH
        </Typography>
        <div className="flex w-full gap-2 lg:justify-between max-lg:flex-col max-lg:items-center">
          {skeltonProvenancesArray.map((skeltonProvenance) => (
            <span
              key={skeltonProvenance}
              className="max-w-full w-70 h-20 bg-beige-600"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogueDetailPanelSkelton;
