import { cva } from "class-variance-authority";
import clsx from "clsx";

export const buttonVariants = cva(
  "px-4 py-2 border-1 cursor-pointer w-fit text-caption",
  {
    variants: {
      variant: {
        primary: clsx(
          "rounded-sm bg-transparent text-black-500 border-black-500",
          "hover:bg-white-500 hover:text-black-500 hover:border-black-500",
          "active:bg-transparent active:text-gray-500 active:border-primary active:outline-none",
          "focus:bg-transparent focus:text-black-500 focus:border-black-500 focus:outline-2 focus:outline-primary",
          "disabled:text-gray-500 disabled:bg-transparent disabled:border-gray-400 disabled:cursor-default",
        ),
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);
