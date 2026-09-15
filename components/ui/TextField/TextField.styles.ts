import { cva } from "class-variance-authority";
import clsx from "clsx";

export const textFieldVariants = cva("flex flex-col gap-1");

export const labelVariants = cva("text-h5 text-black-500");

export const descriptionVariants = cva("text-caption text-gray-500");

export const fieldErrorVariants = cva("text-caption text-status-error");

export const inputVariants = cva(
  clsx(
    "w-full h-8 px-3 box-border rounded-md border border-beige-600",
    "bg-white-100 text-black-500 font-inter font-normal text-[13px] leading-4",
    "outline-none placeholder:text-gray-500",
    "data-hovered:border-gray-400",
    "data-focus-visible:border-[1.5px] data-focus-visible:border-primary",
    "data-focus-visible:shadow-[0px_2px_4px_rgba(160,70,60,0.15)]",
    "data-focus-visible:placeholder:text-black-500",
    "data-disabled:bg-white-500 data-disabled:border-beige-600",
    "data-disabled:text-gray-400 data-disabled:placeholder:text-gray-400",
    "data-disabled:cursor-default data-disabled:data-hovered:border-beige-600",
    "data-disabled:data-focus-visible:border data-disabled:data-focus-visible:border-beige-600",
    "data-disabled:data-focus-visible:shadow-none",
    "data-invalid:border-status-error",
    "data-invalid:data-focus-visible:border-status-error",
  ),
  {
    variants: {
      multiline: {
        true: "h-auto min-h-16 py-2 resize-y",
        false: "py-0",
      },
    },
    defaultVariants: {
      multiline: false,
    },
  },
);
