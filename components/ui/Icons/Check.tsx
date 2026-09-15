import type { ReactNode } from "react";
import { SvgProps } from "@/components/ui/Icons/types";

export function CheckIcon(props: Readonly<SvgProps>): ReactNode {
  const { fill, stroke } = props;

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.6664 3.5L5.25036 9.9162L2.33398 6.99975"
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
