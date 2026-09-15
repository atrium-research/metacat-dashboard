import { cva } from "class-variance-authority";
import clsx from "clsx";

export const popoverVariants = cva(
  clsx(
    "box-border max-w-[calc(100vw-1.5rem)] overflow-auto p-3",
    "rounded-lg border border-beige-600 bg-white-100",
    "font-inter text-[13px] leading-4 text-black-500",
    "shadow-[0px_6px_16px_rgba(0,0,0,0.078)] outline-none",
    "transition-[transform,opacity] duration-200 ease-out",
    "motion-reduce:transition-none",
    "data-entering:opacity-0 data-exiting:opacity-0",
    "data-[placement=top]:data-entering:translate-y-2",
    "data-[placement=top]:data-exiting:translate-y-2",
    "data-[placement=bottom]:data-entering:-translate-y-2",
    "data-[placement=bottom]:data-exiting:-translate-y-2",
    "data-[placement=left]:data-entering:translate-x-2",
    "data-[placement=left]:data-exiting:translate-x-2",
    "data-[placement=right]:data-entering:-translate-x-2",
    "data-[placement=right]:data-exiting:-translate-x-2",
  ),
);

export const popoverArrowVariants = cva("group");

export const popoverArrowIconVariants = cva(
  clsx(
    "block fill-white-100 stroke-beige-600",
    "group-data-[placement=bottom]:rotate-180",
    "group-data-[placement=left]:-rotate-90",
    "group-data-[placement=right]:rotate-90",
  ),
);
