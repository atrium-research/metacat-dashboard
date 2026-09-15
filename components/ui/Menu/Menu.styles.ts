import { cva } from "class-variance-authority";
import clsx from "clsx";

export const menuVariants = cva(
  clsx(
    "max-h-[inherit] overflow-auto p-2 outline-none",
    "flex flex-col gap-1.5",
  ),
);

export const menuSectionVariants = cva("flex flex-col gap-1.5");

export const menuSectionHeaderVariants = cva(
  clsx(
    "rounded-sm bg-white-500 px-2.5 py-1.5",
    "font-jetbrains-mono text-[9px] leading-3 font-bold uppercase text-gray-700",
  ),
);

export const menuItemVariants = cva(
  clsx(
    "group relative flex items-center gap-2 rounded-sm px-2.5 py-2",
    "font-outfit text-xs leading-[15px] font-semibold text-black-500",
    "cursor-pointer select-none outline-none",
    "[-webkit-tap-highlight-color:transparent]",
    "transition-colors duration-150",
    "data-hovered:bg-beige-400",
    "data-focused:bg-beige-400",
    "data-disabled:cursor-default data-disabled:text-gray-400",
    "data-disabled:data-hovered:bg-transparent",
  ),
);

export const menuItemLabelVariants = cva("flex-1 truncate");

export const menuItemIndicatorVariants = cva(
  "flex w-3 shrink-0 items-center justify-center text-primary",
);

export const menuSeparatorVariants = cva("mx-2 my-1 border-b border-beige-600");

export const menuEmptyStateVariants = cva(
  clsx(
    "px-2.5 py-2 text-center",
    "font-outfit text-xs leading-[15px] text-gray-400",
  ),
);
