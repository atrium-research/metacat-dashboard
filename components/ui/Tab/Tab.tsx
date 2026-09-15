"use client";

import clsx from "clsx";
import NextLink from "next/link";
import React, { DetailedHTMLProps, type ReactNode } from "react";
import {
  composeRenderProps,
  Tab as RACTab,
  type TabProps,
} from "react-aria-components";

export function Tab(props: Readonly<TabProps>): ReactNode {
  const { className } = props;

  return (
    <RACTab
      {...props}
      className={composeRenderProps(className, (className, renderProps) => {
        return clsx(
          "py-1 px-px my-1 font-bold text-gray-500 border-2 border-transparent bg-transparent cursor-pointer text-caption rounded-sm",
          "hover:text-black-500",
          "data-selected:border-b-primary data-selected:text-black-500",
          "focus-visible:border-primary focus-visible:text-gray-500 focus-visible:outline-none",
          className,
          {
            ...renderProps,
          },
        );
      })}
      render={(domProps, renderProps) => {
        if ("href" in domProps && domProps.href && !renderProps.isDisabled) {
          return <NextLink {...domProps} />;
        }

        return (
          <div
            {...(domProps as DetailedHTMLProps<
              React.HTMLAttributes<HTMLDivElement>,
              HTMLDivElement
            >)}
          />
        );
      }}
    />
  );
}
