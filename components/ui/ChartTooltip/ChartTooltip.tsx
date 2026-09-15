import { Typography } from "@/components/ui/Typography/Typography";
import clsx from "clsx";
import { ReactNode } from "react";

interface ChartTooltipProps {
  bar: {
    id: string | number;
    value: number;
    formattedValue: string;
    index: number;
    indexValue: string | number;
    data: object;
  };
  color: string;
  label: string;
  source?: string;
  period?: string;
}

export function ChartTooltip(props: Readonly<ChartTooltipProps>): ReactNode {
  const {
    bar: { id, formattedValue },
    source,
    period,
  } = props;

  const description = [source, period].join(" · ");

  return (
    <div
      className={clsx(
        "bg-black-500 p-2.5 gap-1 rounded-md shadow-tooltip mt-1.5",
      )}
    >
      <Typography variant="caption" className="text-gray-300 font-bold">
        {formattedValue}
      </Typography>
      <Typography
        variant="h5"
        className="text-white-100 font-bold text-[0.75rem]"
      >
        {id}
      </Typography>
      {description && (
        <Typography variant="caption-meta" className="text-gray-300">
          {description}
        </Typography>
      )}
    </div>
  );
}
