import { Typography } from "@/components/ui/Typography/Typography";
import { getThemeColor } from "@/utils/catalogue.utils";
import clsx from "clsx";
import { Fragment } from "react";

interface ProvenanceSectionProps {
  id: "ariadne" | "clarin-vlo" | "gotriple" | "sshomp";
}

const PROVENANCE_STEPS = [
  {
    label: "Source providers",
    description: "24 institutional endpoints",
  },
  {
    label: "Harvest",
    description: "OAI-PMH selective harvest",
  },
  {
    label: "Crosswalk",
    description: "Native → AO-CAT mapping",
  },
  {
    label: "Enrichment",
    description: "Vocabulary & NER tagging",
  },
  {
    label: "Publication",
    description: "SPARQL + REST endpoints",
  },
];

const ProvenanceSection = ({ id }: ProvenanceSectionProps) => {
  const themeColor = getThemeColor(id);

  return (
    <div className="bg-white-500 border border-beige-600 flex gap-5 flex-col pt-5 pb-6 px-7">
      <Typography
        className="text-[0.625rem] text-gray-500 leading-3.25"
        variant="caption"
      >
        PROVENANCE / LINEAGE — FROM SOURCE TO GRAPH
      </Typography>
      <div className="flex w-full max-lg:flex-col max-lg:items-center">
        {PROVENANCE_STEPS.map((step, index) => (
          <Fragment key={step.label}>
            <div className="flex flex-col gap-2 flex-1 items-center">
              <div
                className={clsx(
                  `flex items-center justify-center rounded-2xl size-8 bg-${themeColor}`,
                  "text-white-100 text-[0.8125rem] font-outfit font-bold leading-4",
                )}
              >
                {index + 1}
              </div>
              <Typography
                as="p"
                className="text-[0.75rem] leading-3.75 text-black-500"
                variant="h5"
              >
                {step.label}
              </Typography>
              <Typography className="text-gray-500" variant="caption-meta">
                {step.description}
              </Typography>
            </div>
            {index + 1 !== PROVENANCE_STEPS.length && (
              <span className="w-px h-7.5 lg:w-7.5 lg:h-px bg-beige-600 my-4" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProvenanceSection;
