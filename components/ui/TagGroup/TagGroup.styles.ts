import { cva } from "class-variance-authority";
import clsx from "clsx";

export const tagGroupVariants = cva("flex flex-col gap-1");

export const tagListVariants = cva("flex flex-wrap gap-1.5");

export const tagEmptyStateVariants = cva("text-caption text-gray-500");

export const tagDotVariants = cva("size-2 shrink-0 rounded-full bg-gray-400");

export const tagVariants = cva(
  clsx(
    "box-border flex items-center gap-2 px-3 py-1.5 h-[25px] max-w-fit cursor-pointer",
    "rounded-full border border-beige-600 bg-white-100",
    "font-jetbrains-mono font-medium text-[10px] leading-[13px] uppercase",
    "text-gray-500 whitespace-nowrap outline-none",
    "transition-colors duration-150",
    "[-webkit-tap-highlight-color:transparent]",
    "data-hovered:bg-white-500 data-hovered:text-black-500",
    "data-hovered:border-beige-600",
    "data-selected:bg-white-100 data-selected:text-black-500",
    "data-selected:border-[1.5px] data-selected:border-black-500",
    "data-selected:font-bold",
    "data-selected:[&_[data-slot=dot]]:bg-primary",
    "data-selected:data-hovered:bg-white-100 data-selected:data-hovered:text-black-500",
    "data-disabled:bg-white-500 data-disabled:text-gray-400",
    "data-disabled:cursor-default data-disabled:data-hovered:bg-white-500",
    "data-href:cursor-pointer",
  ),
  {
    variants: {
      allowsRemoving: {
        true: "pr-1.5",
        false: "",
      },
      hasColor: {
        true: clsx(
          "[&_[data-slot=dot]]:bg-[var(--tag-color)]",
          "data-selected:[&_[data-slot=dot]]:bg-[var(--tag-color)]",
        ),
        false: "",
      },
      isFocusVisible: {
        true: "shadow-[0_0_0_2px_var(--color-primary)]",
        false: "",
      },
    },
    defaultVariants: {
      allowsRemoving: false,
      hasColor: false,
      isFocusVisible: false,
    },
  },
);
