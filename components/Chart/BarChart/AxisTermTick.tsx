"use client";

import { useMemo, useRef, useState } from "react";
import { Popover } from "@/components/ui/Popover/Popover";
import { Typography } from "@/components/ui/Typography/Typography";
import { getThemeColor } from "@/utils/catalogue.utils";
import useMediaQuery from "@/hooks/useMediaQuery";

export const ROW_HEIGHT_SINGLE = 20;
export const ROW_HEIGHT_WITH_AUTHORITY = 32;
const LABEL_GAP = 12;

type AxisTermTickProps = {
  value: string;
  x: number;
  y: number;
  authority?: string;
  rowHeight: number;
  labelWidth: number;
  compact?: boolean;
  variant?: "heatmapX" | "heatmapY" | "default";
};

const AxisTermTick = ({
  value,
  x,
  y,
  authority,
  rowHeight,
  labelWidth,
  compact = false,
  variant = "default",
}: AxisTermTickProps) => {
  const labelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { isSize: is3xl } = useMediaQuery("3xl");

  const alignment =
    compact || ["heatmapX", "heatmapY"].includes(variant)
      ? { box: "items-start", text: "text-start" }
      : { box: "items-end", text: "text-end" };

  const foreignObjectPosition = useMemo(() => {
    return variant == "heatmapX"
      ? {
          x: -(LABEL_GAP + (is3xl ? labelWidth : labelWidth / 2)),
          y: -(rowHeight * 1.5),
        }
      : {
          x: -(labelWidth + LABEL_GAP),
          y: -rowHeight / 2,
        };
  }, [is3xl, variant, labelWidth, rowHeight]);

  const color = ["ariadne", "clarin-vlo", "gotriple", "sshomp"].includes(
    value.toLowerCase(),
  )
    ? getThemeColor(value.toLowerCase())
    : undefined;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <foreignObject
        x={foreignObjectPosition.x}
        y={foreignObjectPosition.y}
        width={labelWidth}
        height={rowHeight}
      >
        <div
          ref={labelRef}
          tabIndex={0}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          aria-label={authority ? `${value}, ${authority}` : value}
          className={`flex h-full w-full select-text flex-col ${alignment.box} justify-center gap-0.5 overflow-hidden rounded-xs outline-none focus-visible:ring-1 focus-visible:ring-black-500`}
        >
          <Typography
            variant="caption"
            className={`block max-w-full truncate ${alignment.text} capitalize ${compact ? "text-[0.5rem]! font-inter!" : ""} ${color !== undefined ? `text-${color}` : "text-black-500"} ${variant == "heatmapX" && "uppercase"}`}
          >
            {value}
          </Typography>
          {authority && (
            <Typography
              variant="caption"
              className={`block max-w-full truncate ${alignment.text} text-[0.5rem] text-gray-500 uppercase`}
            >
              {authority}
            </Typography>
          )}
        </div>
      </foreignObject>

      {isOpen && (
        <Popover
          triggerRef={labelRef}
          isOpen
          onOpenChange={setIsOpen}
          isNonModal
          placement="right"
          className="pointer-events-none max-w-72 px-2.5 py-1.5"
        >
          <Typography variant="caption" className="text-black-500">
            {value}
          </Typography>
          {authority && (
            <Typography
              variant="caption"
              className="mt-0.5 text-[0.625rem] uppercase text-gray-500"
            >
              {authority}
            </Typography>
          )}
        </Popover>
      )}
    </g>
  );
};

export default AxisTermTick;
