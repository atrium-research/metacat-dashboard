import { Typography } from "@/components/ui/Typography/Typography";
import { cn } from "@/utils/global.utils";
import clsx from "clsx";

type ChartSummaryBlockProps = {
  summary: string;
  className?: string;
  withMaxWidth?: boolean;
};

const ChartSummaryBlock = ({
  summary,
  className,
  withMaxWidth = true,
}: ChartSummaryBlockProps) => (
  <div className={cn("py-4", className)}>
    <Typography variant="caption" className="uppercase text-black-400">
      Chart Summary
    </Typography>
    <Typography
      variant="caption-meta"
      className={clsx(
        "text-xs leading-relaxed text-black-400",
        withMaxWidth && "max-w-5xl",
      )}
    >
      {summary}
    </Typography>
  </div>
);

export default ChartSummaryBlock;
