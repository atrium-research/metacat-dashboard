import { cva } from "class-variance-authority";
import clsx from "clsx";

export const sliderVariants = cva("gap-2", {
  variants: {
    orientation: {
      horizontal: "grid w-64 max-w-full grid-cols-[1fr_auto] items-center",
      vertical: "flex w-fit flex-col items-center",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const sliderTrackVariants = cva("relative flex items-center", {
  variants: {
    orientation: {
      horizontal: "col-span-2 h-5",
      vertical: "my-3 h-40 w-5",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const sliderRailVariants = cva("relative rounded-full", {
  variants: {
    orientation: {
      horizontal: "h-1 w-full",
      vertical: "ml-[50%] h-full w-1 -translate-x-1/2",
    },
    isDisabled: {
      true: "bg-beige-400",
      false: "bg-beige-600",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    isDisabled: false,
  },
});

export const sliderFillVariants = cva("rounded-full transition-opacity", {
  variants: {
    isDisabled: {
      true: "bg-gray-400",
      false: "bg-primary",
    },
    isDragging: {
      true: "opacity-100",
      false: "opacity-0",
    },
  },
  defaultVariants: {
    isDisabled: false,
    isDragging: false,
  },
});

export const sliderThumbVariants = cva(
  clsx(
    "size-3 rounded-full bg-black-500",
    "cursor-grab",
    "[-webkit-tap-highlight-color:transparent]",
    "transition-colors duration-150",
    "data-dragging:cursor-grabbing data-dragging:bg-primary",
    "data-focus-visible:outline-2 data-focus-visible:outline-primary",
    "data-disabled:cursor-default data-disabled:bg-gray-400",
  ),
  {
    variants: {
      orientation: {
        horizontal: "top-1/2",
        vertical: "left-1/2",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);
