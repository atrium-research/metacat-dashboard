"use client";

import { Typography } from "@/components/ui/Typography/Typography";
import { ReactNode } from "react";
import { components } from "@/types/api";
import clsx from "clsx";
import {
  getCoverageCount,
  getHeadingDescription,
  getThemeColor,
  getUrlDisplayName,
} from "@/utils/catalogue.utils";
import { Link } from "react-aria-components";
import { ExternalLinkIcon } from "@/components/ui/Icons/ExternalLink";
import { formatCompactNumber } from "@/utils/global.utils";
import { formatRelativeDate } from "@/utils/date.utils";
import { BlankLinesIcon } from "@/components/ui/Icons/BlankLines";

type SourceCardProps = components["schemas"]["Catalogue"] & {
  coverage: {
    [key: string]: components["schemas"]["FacetExposureStatus"];
  };
};

export function SourceCard(props: Readonly<SourceCardProps>): ReactNode {
  const {
    id,
    name,
    url,
    total_resources,
    vocabularies_count,
    last_harvest_at,
    coverage,
    licence,
  } = props;

  const themeColor = getThemeColor(id);
  const headingDescription = getHeadingDescription(id);
  const urlDisplayName = getUrlDisplayName(url);
  const coverageCount = getCoverageCount(coverage);

  return (
    <div
      className={clsx(
        "rounded-sm border-t-[3px] outline outline-beige-600 bg-white-500 w-96.5 max-w-full cursor-default",
        "p-5 gap-6 flex flex-col",
        `border-${themeColor}`,
      )}
    >
      <div className="flex flex-col gap-1 w-full">
        <Typography variant="caption" className="uppercase text-gray-700">
          {headingDescription}
        </Typography>
        <Typography variant="h3">{name}</Typography>
        <Link
          href={url}
          aria-label={`${url} - external link`}
          className="text-caption uppercase flex items-center gap-1 text-gray-500 font-jetbrains-mono hover:underline"
        >
          {urlDisplayName}
          <ExternalLinkIcon className="stroke-gray-500" />
        </Link>
      </div>

      <div className="flex gap-10">
        <div className="flex flex-col gap-0.5">
          <Typography variant="h4">
            {formatCompactNumber(total_resources)}
          </Typography>
          <Typography
            variant="caption"
            className="uppercase text-[0.5625rem] text-gray-500"
          >
            resources
          </Typography>
        </div>
        <div className="flex flex-col gap-0.5">
          <Typography variant="h4">{vocabularies_count}</Typography>
          <Typography
            variant="caption"
            className="uppercase text-[0.5625rem] text-gray-500"
          >
            Vocabularies
          </Typography>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Typography variant="caption" className="uppercase text-gray-700">
            Facet Coverage
          </Typography>

          <Typography variant="caption" className="uppercase">
            {`${coverageCount}/${Object.values(coverage).length}`}
          </Typography>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: coverageCount }).map((_, index) => {
            return (
              <div
                key={index}
                className={clsx(`size-3 rounded-xs bg-${themeColor}`)}
              ></div>
            );
          })}
          {Array.from({ length: 6 - coverageCount }).map((_, index) => (
            <div key={index} className="size-3">
              <BlankLinesIcon className="" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-3">
        <Typography
          variant="caption-meta"
          className="uppercase text-[0.5625rem]"
        >
          {licence}
        </Typography>
        <Typography
          variant="caption-meta"
          className="uppercase text-[0.5625rem]"
        >
          Updated {formatRelativeDate(new Date(last_harvest_at), true)}
        </Typography>
      </div>
    </div>
  );
}
