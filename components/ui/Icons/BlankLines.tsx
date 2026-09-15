import type { ReactNode } from "react";
import { SvgProps } from "@/components/ui/Icons/types";

export function BlankLinesIcon(props: Readonly<SvgProps>): ReactNode {
  const { fill = "#F7F2E8", stroke = "#E3D9C5" } = props;

  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_4_211)">
        <g clipPath="url(#clip1_4_211)">
          <rect width="12" height="12" fill={fill} />
          <line
            opacity="0.6"
            x1="-19.8232"
            y1="-20.1768"
            x2="192.309"
            y2="191.955"
            stroke={stroke}
            strokeWidth="0.5"
          />
          <line
            opacity="0.6"
            x1="-22.6516"
            y1="-17.3483"
            x2="189.48"
            y2="194.784"
            stroke={stroke}
            strokeWidth="0.5"
          />
          <line
            opacity="0.6"
            x1="-25.4801"
            y1="-14.5199"
            x2="186.652"
            y2="197.612"
            stroke={stroke}
            strokeWidth="0.5"
          />
          <line
            opacity="0.6"
            x1="-28.3085"
            y1="-11.6915"
            x2="183.824"
            y2="200.441"
            stroke={stroke}
            strokeWidth="0.5"
          />
          <line
            opacity="0.6"
            x1="-31.1369"
            y1="-8.86306"
            x2="180.995"
            y2="203.269"
            stroke={stroke}
            strokeWidth="0.5"
          />
          <line
            opacity="0.6"
            x1="-33.9653"
            y1="-6.03463"
            x2="178.167"
            y2="206.097"
            stroke={stroke}
            strokeWidth="0.5"
          />
          <line
            opacity="0.6"
            x1="-36.7938"
            y1="-3.20623"
            x2="175.338"
            y2="208.926"
            stroke={stroke}
            strokeWidth="0.5"
          />
          <line
            opacity="0.6"
            x1="-39.6222"
            y1="-0.377796"
            x2="172.51"
            y2="211.754"
            stroke={stroke}
            strokeWidth="0.5"
          />
          <line
            opacity="0.6"
            x1="-42.4507"
            y1="2.45063"
            x2="169.681"
            y2="214.583"
            stroke={stroke}
            strokeWidth="0.5"
          />
          <line
            opacity="0.6"
            x1="-45.279"
            y1="5.27906"
            x2="166.853"
            y2="217.411"
            stroke={stroke}
            strokeWidth="0.5"
          />
          <line
            opacity="0.6"
            x1="-48.1075"
            y1="8.10749"
            x2="164.025"
            y2="220.24"
            stroke={stroke}
            strokeWidth="0.5"
          />
          <line
            opacity="0.6"
            x1="-50.9359"
            y1="10.9359"
            x2="161.196"
            y2="223.068"
            stroke={stroke}
            strokeWidth="0.5"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_4_211">
          <rect width="12" height="12" rx="2" fill={fill} />
        </clipPath>
        <clipPath id="clip1_4_211">
          <rect width="12" height="12" fill={fill} />
        </clipPath>
      </defs>
    </svg>
  );
}
