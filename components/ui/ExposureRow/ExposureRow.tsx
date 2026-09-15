import { Typography } from "@/components/ui/Typography/Typography";
import clsx from "clsx";
import { ReactNode } from "react";

interface ExposureRowProps {
  label: string;
  value?: number;
  className?: string;
}

export function ExposureRow(props: Readonly<ExposureRowProps>): ReactNode {
  const { label, value, className } = props;
  return (
    <td
      className={clsx(
        "group py-3 px-4 border-b border-beige-600 bg-white-100 flex justify-between w-60 max-w-full cursor-pointer",
        "hover:bg-white-500",
        className,
      )}
      tabIndex={0}
    >
      <Typography
        variant="h5"
        className="text-[0.8125rem] leading-[100%] text-black-500"
      >
        {label}
      </Typography>
      {value && (
        <Typography
          variant="caption"
          className="text-gray-500 group-hover:text-black-500"
        >
          {value.toLocaleString("pl-PL")}
        </Typography>
      )}
    </td>
  );
}
