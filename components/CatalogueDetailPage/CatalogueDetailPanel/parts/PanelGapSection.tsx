import { Typography } from "@/components/ui/Typography/Typography";
import { useCatalogueFacetCoverage } from "@/hooks/useCatalogues";
import clsx from "clsx";

interface PanelGapSectionProps {
  id: "ariadne" | "clarin-vlo" | "gotriple" | "sshomp";
  facetCount: number | undefined;
}

const PanelGapSection = ({ id, facetCount }: PanelGapSectionProps) => {
  const { data: coverage } = useCatalogueFacetCoverage(id);

  const gaps = coverage
    ? Object.entries(coverage.coverage).filter(([_, item]) => item === "gap")
    : [];

  const gapCount = coverage ? gaps.length : -1;

  return (
    <div className="flex flex-col rounded-lg border border-beige-600 bg-white-500 gap-3 py-5 px-6">
      <Typography
        className="text-[0.625rem] text-gray-700 uppercase"
        variant="caption"
      >
        Known gaps
      </Typography>
      <div>
        {gapCount === 0 && (
          <Typography
            as="p"
            className="text-[0.75rem] text-gray-700 font-regular font-outfit leading-3.75"
            variant="h5"
          >
            There are no gaps in pivot facets
          </Typography>
        )}
        {(gapCount > 0 || gapCount === -1) && (
          <>
            <Typography
              as="p"
              className="text-[0.75rem] text-gray-700 font-regular font-outfit leading-3.75"
              variant="h5"
            >
              {gapCount === -1 ? facetCount : gapCount} of {facetCount} pivot
              facets not exposed
            </Typography>
            <ul className="flex flex-col" aria-label="Known gaps list">
              {gaps.map(([gap]) => (
                <li
                  key={gap}
                  className={clsx(
                    "before:content-['•'] before:mr-1 font-outfit",
                    "leading-3.75 text-h5 text-[0.75rem] text-gray-700 font-regular",
                  )}
                >
                  <span className="">{gap}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default PanelGapSection;
