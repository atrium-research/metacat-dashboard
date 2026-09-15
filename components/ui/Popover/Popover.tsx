"use client";

import { type ReactNode, type Ref } from "react";
import {
  OverlayArrow,
  Popover as AriaPopover,
  type PopoverProps as AriaPopoverProps,
} from "react-aria-components/Popover";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { cn } from "@/utils/global.utils";
import {
  popoverArrowIconVariants,
  popoverArrowVariants,
  popoverVariants,
} from "@/components/ui/Popover/Popover.styles";

export type PopoverProps = Omit<AriaPopoverProps, "children"> & {
  children: ReactNode;
  showArrow?: boolean;
  ref?: Ref<HTMLElement>;
};

const OFFSET_WITH_ARROW = 12;
const OFFSET_WITHOUT_ARROW = 8;

export function Popover(props: Readonly<PopoverProps>): ReactNode {
  const { children, showArrow = false, className, ref, ...rest } = props;

  return (
    <AriaPopover
      ref={ref}
      offset={showArrow ? OFFSET_WITH_ARROW : OFFSET_WITHOUT_ARROW}
      {...rest}
      className={composeRenderProps(className, (className) => {
        return cn(popoverVariants(), className);
      })}
    >
      {showArrow ? (
        <OverlayArrow className={popoverArrowVariants()}>
          <svg
            aria-hidden="true"
            width={12}
            height={12}
            viewBox="0 0 12 12"
            strokeWidth={2}
            paintOrder="stroke"
            className={popoverArrowIconVariants()}
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      ) : null}
      {children}
    </AriaPopover>
  );
}

export { DialogTrigger as PopoverTrigger } from "react-aria-components/Popover";
