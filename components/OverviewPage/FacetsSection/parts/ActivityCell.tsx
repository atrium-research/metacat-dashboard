import { Typography } from "@/components/ui/Typography/Typography";
import { getThemeColor } from "@/utils/catalogue.utils";
import { formatDateToFullString, formatRelativeDate } from "@/utils/date.utils";
import clsx from "clsx";
import { ReactNode } from "react";

interface ActivityCellProps {
  id?: string;
  name?: string;
  lastHarvestDate?: Date;
  shouldUseSkelton?: boolean;
}

export function ActivityCell(props: Readonly<ActivityCellProps>): ReactNode {
  const { id, name, lastHarvestDate, shouldUseSkelton } = props;

  const themeColor = id ? getThemeColor(id) : "beige-600";

  return (
    <div className="flex justify-between gap-4 py-3 border-b border-beige-600 w-full cursor-default">
      <div className={clsx("flex gap-3")}>
        <span
          className={clsx("w-0.75 h-full rounded-xs", `bg-${themeColor}`)}
        />
        <div className="flex flex-col gap-0.5">
          <Typography variant="h5">{name}</Typography>
          {shouldUseSkelton || !lastHarvestDate ? (
            <span className="bg-beige-600 h-3 w-20" />
          ) : (
            <Typography
              variant="caption"
              className="text-[0.5625rem] uppercase"
            >
              {formatDateToFullString(lastHarvestDate)}
            </Typography>
          )}
        </div>
      </div>

      {shouldUseSkelton || !lastHarvestDate ? (
        <span className="bg-beige-600 h-3 w-20" />
      ) : (
        <Typography
          variant="caption"
          className="flex items-center text-[0.5625rem] uppercase"
        >
          {formatRelativeDate(lastHarvestDate, true)}
        </Typography>
      )}
    </div>
  );
}
