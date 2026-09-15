import { cva } from "class-variance-authority";
import clsx from "clsx";

export const matrixCellVariants = cva(
  "rounded-sm border py-2.25 flex justify-center items-center h-fit w-full cursor-pointer fill-transparent lg:min-w-23.75",
  {
    variants: {
      variant: {
        coverage: clsx(
          "max-w-40 stroke-white text-white hover:bg-white-500",
          "hover:text-black-600 hover:stroke-black-600 hover:border-beige-600",
        ),
        heatmap: clsx(
          "py-3.25 max-w-68.75 stroke-white",
          "contrast-text",
          "hover:bg-beige-550 hover:text-black-600 hover:stroke-black-600 hover:border-beige-600",
        ),
      },
      source: {
        ariadne:
          "bg-ariadne/(--alpha) border-ariadne/(--alpha) [--threshold:55%]",
        "clarin-vlo":
          "bg-clarin/(--alpha) border-clarin/(--alpha) [--threshold:60%]",
        gotriple:
          "bg-gotriple/(--alpha) border-gotriple/(--alpha) [--threshold:50%]",
        sshomp: "bg-sshomp/(--alpha) border-sshomp/(--alpha) [--threshold:70%]",
      },
      hasValue: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "heatmap",
        hasValue: false,
        class:
          "border-dashed bg-beige-550! border-beige-700! text-gray-450! hover:text-black-600!",
      },
      {
        variant: "coverage",
        hasValue: false,
        class:
          "bg-white-500 border-beige-600! text-gray-500! hover:text-black-600!",
      },
    ],
    defaultVariants: {
      variant: "coverage",
      source: "ariadne",
    },
  },
);
