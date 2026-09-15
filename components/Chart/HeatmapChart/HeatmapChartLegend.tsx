import {
  GAP_FILL_COLOR,
  GAP_LEGEND_LABEL,
} from "@/components/Chart/BarChart/BarChartConfig";
import { Typography } from "@/components/ui/Typography/Typography";
import { getThemeColor } from "@/utils/catalogue.utils";
import clsx from "clsx";
import { CSSProperties } from "react";

type HeatmapChartLegendProps = {
  catalogues: string[];
};

const STEPS_COUNT = 20;

const STEPS = Array.from(
  { length: STEPS_COUNT },
  (_, i) => (i + 1) * (100 / STEPS_COUNT),
);

const HeatmapChartLegend = ({ catalogues }: HeatmapChartLegendProps) => {
  return (
    <div className="flex gap-24 justify-between w-full px-3">
      <Typography
        className="font-bold text-[0.5625rem] min-w-fit text-gray-500"
        variant="caption"
      >
        COLOUR SCALE
      </Typography>
      <ul className="flex flex-wrap justify-between w-full pr-12 2xl:pr-20 3xl:pr-30 gap-2">
        {catalogues.map((catalogue) => {
          const themeColor = getThemeColor(catalogue);

          return (
            <li key={catalogue} className="flex flex-col gap-0.5">
              <Typography
                className={clsx(
                  "font-bold text-[0.5625rem] uppercase",
                  `text-${themeColor}`,
                )}
                variant="caption"
              >
                {catalogue}
              </Typography>
              <div className="flex item-start">
                {STEPS.map((step, index) => {
                  const isFirstElement = index === 0;
                  const isLastElement = index + 1 === STEPS.length;
                  return (
                    <div key={step} className="flex gap-0.5 flex-col">
                      <span
                        style={{ "--alpha": `${step}%` } as CSSProperties}
                        className={clsx(
                          "w-2.75 h-3.5 block",
                          `bg-${themeColor}/(--alpha)`,
                          isFirstElement ? "rounded-l-[3px]" : "-ml-px",
                          isLastElement && "rounded-r-[3px]",
                        )}
                      />
                      {(isFirstElement || isLastElement) && (
                        <Typography
                          className={clsx(
                            "font-bold text-[0.5625rem] min-w-fit text-gray-500",
                            isLastElement && "-ml-2.5",
                          )}
                          variant="caption"
                        >
                          {isFirstElement ? "0" : "Max"}
                        </Typography>
                      )}
                    </div>
                  );
                })}
              </div>
            </li>
          );
        })}
        <li className="flex basis-full items-center gap-2">
          <svg width={14} height={14} aria-hidden className="shrink-0">
            <rect width={14} height={14} fill={GAP_FILL_COLOR} />
          </svg>
          <span className="text-[0.625rem] text-gray-500 font-jetbrains-mono">
            {GAP_LEGEND_LABEL}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default HeatmapChartLegend;
