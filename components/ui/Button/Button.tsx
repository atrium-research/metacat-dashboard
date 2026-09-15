"use client";

import React, { type ReactNode } from "react";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  composeRenderProps,
} from "react-aria-components";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/Button/Button.styles";

type ButtonStyleProps = VariantProps<typeof buttonVariants>;

interface ButtonProps extends AriaButtonProps, ButtonStyleProps {}

export function Button(props: Readonly<ButtonProps>): ReactNode {
  const { className, variant, children, ...rest } = props;

  return (
    <AriaButton
      {...rest}
      className={composeRenderProps(className, (className, renderProps) => {
        return buttonVariants({ ...renderProps, className, variant });
      })}
    >
      {children}
    </AriaButton>
  );
}
