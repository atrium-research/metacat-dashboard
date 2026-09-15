"use client";

import React from "react";
import {
  ToggleButton as AriaToggleButton,
  type ToggleButtonProps as AriaToggleButtonProps,
} from "react-aria-components/ToggleButton";
import clsx from "clsx";

export function ToggleButton(props: AriaToggleButtonProps) {
  const { className } = props;

  return (
    <AriaToggleButton
      {...props}
      className={clsx(
        "px-4 py-2 border cursor-pointer w-fit text-body text-[0.75rem] font-semi-bold",
        "rounded-md bg-beige-600 text-black-500 border-beige-600",
        "[&:hover,&[data-selected]:hover]:bg-white-500 [&:hover,&[data-selected]:hover]:text-black-500 [&:hover,&[data-selected]:hover]:border-black-900",
        "data-selected:bg-primary data-selected:text-white-100 data-selected:border-primary data-selected:focus-visible:border-white data-selected:focus-visible:outline-2! data-selected:focus-visible:outline-primary!",
        "focus-visible:bg-transparent focus-visible:text-gray-500 focus-visible:border-primary focus-visible:outline-1 focus-visible:outline-primary",
        "disabled:text-gray-400 disabled:bg-transparent disabled:border-transparent disabled:cursor-default",
        className,
      )}
    />
  );
}
