import type { ReactNode } from "react";
import { SvgProps } from "@/components/ui/Icons/types";

export function ExternalLinkIcon(props: Readonly<SvgProps>): ReactNode {
  const { fill, stroke } = props;

  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip_external_link)">
        <path
          d="M8.75 3.75V1.25H6.25M8.75 1.25L4.16667 5.83333M7.5 5.41667V7.91667C7.5 8.13768 7.4122 8.34964 7.25592 8.50592C7.09964 8.6622 6.88768 8.75 6.66667 8.75H2.08333C1.86232 8.75 1.65036 8.6622 1.49408 8.50592C1.3378 8.34964 1.25 8.13768 1.25 7.91667V3.33333C1.25 3.11232 1.3378 2.90036 1.49408 2.74408C1.65036 2.5878 1.86232 2.5 2.08333 2.5H4.58333"
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip_external_link">
          <rect width="10" height="10" fill={fill} stroke={stroke} />
        </clipPath>
      </defs>
    </svg>
  );
}
