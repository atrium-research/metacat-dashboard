import PanelHeaderDetails from "@/components/CatalogueDetailPage/CatalogueDetailPanel/parts/PanelHeaderDetails";
import { ExternalLinkIcon } from "@/components/ui/Icons/ExternalLink";
import { Typography } from "@/components/ui/Typography/Typography";
import { components } from "@/types/api";
import { CatalogueVersion } from "@/types/catalogue-version";
import { getThemeColor } from "@/utils/catalogue.utils";
import { formatDateToFullString, formatRelativeDate } from "@/utils/date.utils";
import { formatCompactNumber } from "@/utils/global.utils";
import clsx from "clsx";
import { Link } from "react-aria-components";

interface PanelHeaderProps {
  catalogue: Omit<components["schemas"]["Catalogue"], "harvest_status"> & CatalogueVersion;
  totalVocabularyCount: number;
}

const PanelHeader = ({ catalogue, totalVocabularyCount }: PanelHeaderProps) => {
  const {
    id,
    harvest_status,
    name,
    url,
    domain,
    total_resources,
    vocabularies,
    harvest_at,
    licence,
    languages_summary
  } = catalogue;

  const themeColor = getThemeColor(id);

  return (
    <div
      className={clsx(
        "rounded-sm outline border-t-3 outline-beige-600 bg-white-500 flex flex-wrap gap-10 py-6 px-7",
        `border-${themeColor}`,
      )}
    >
      <div className="flex flex-col gap-3 flex-1 h-fit">
        <Typography className="uppercase" variant="caption-meta">
          {domain}
        </Typography>
        <Typography as="h1" variant="h4">
          {name}
        </Typography>
        <Link
          href={url}
          aria-label={`${url} - external link`}
          className="text-caption flex items-center gap-1 text-gray-500 font-jetbrains-mono hover:underline"
        >
          {url}
          <ExternalLinkIcon className="stroke-gray-500" />
        </Link>
        <Typography
          as="h2"
          className="font-regular text-[0.8125rem]"
          variant="h5"
        >
          {languages_summary}
        </Typography>
      </div>
      <div className="flex flex-col gap-3.5 w-120 max-w-full max-sm:gap-6">
        <PanelHeaderDetails
          label="TOTAL RESOURCES"
          value={(total_resources ?? 0).toLocaleString("pl-PL")}
          formattedValue={formatCompactNumber(total_resources ?? 0)}
        />
        <PanelHeaderDetails
          label="VOCABULARIES"
          value={`${vocabularies?.length ?? 0} mapped`}
          formattedValue={totalVocabularyCount}
        />
        <PanelHeaderDetails
          label="LANGUAGES"
          value="EN"
          formattedValue="No info in API yet"
        />
        <PanelHeaderDetails label="LICENSE" formattedValue={licence} />
        <PanelHeaderDetails
          label="LAST UPDATE"
          value={formatDateToFullString(new Date(harvest_at), false)}
          formattedValue={formatRelativeDate(new Date(harvest_at))}
        />
        <PanelHeaderDetails
          label="STATUS"
          value={
            harvest_status === "success"
              ? "OAI-PMH responding"
              : "OAI-PMH not responding"
          }
          formattedValue={harvest_status}
        />
      </div>
    </div>
  );
};

export default PanelHeader;
