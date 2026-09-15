"use client";

import clsx from "clsx";
import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";

const typographyConfig = {
  title: { element: "p", className: "text-title" },
  h1: {
    element: "h1",
    className: "text-h1",
  },
  h2: {
    element: "h2",
    className: "text-h2",
  },
  h3: {
    element: "h3",
    className: "text-h3",
  },
  h4: {
    element: "h4",
    className: "text-h4",
  },
  h5: {
    element: "h5",
    className: "text-h5",
  },
  body: {
    element: "p",
    className: "text-body font-jetbrains-mono",
  },
  "body-control": {
    element: "p",
    className: "text-body-control font-jetbrains-mono",
  },
  caption: {
    element: "p",
    className: "text-caption font-jetbrains-mono",
  },
  "caption-meta": {
    element: "p",
    className: "text-caption-meta font-jetbrains-mono",
  },
  "caption-link": {
    element: "p",
    className: "text-caption-link font-outfit",
  },
} satisfies Record<
  string,
  {
    element: ElementType;
    className: string;
  }
>;

type TypographyProps = HTMLAttributes<
  HTMLHeadingElement | HTMLParagraphElement
> & {
  variant?: keyof typeof typographyConfig;
  children?: ReactNode;
  as?: ElementType;
  className?: string;
  ref?: Ref<HTMLHeadingElement | HTMLParagraphElement>;
};

export function Typography(props: Readonly<TypographyProps>): ReactNode {
  const { variant = "body", as, children, className, ...rest } = props;
  const { element, className: variantClass } = typographyConfig[variant];

  const Component = as ?? element;

  return (
    <Component
      className={clsx(variantClass, className, "focus:outline-none")}
      {...rest}
    >
      {children}
    </Component>
  );
}
