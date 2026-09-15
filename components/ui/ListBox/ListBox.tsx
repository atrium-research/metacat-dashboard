"use client";

import { type ReactNode } from "react";
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxSection as AriaListBoxSection,
  Collection,
  Header,
  type ListBoxItemProps as AriaListBoxItemProps,
  type ListBoxProps as AriaListBoxProps,
  type ListBoxSectionProps as AriaListBoxSectionProps,
} from "react-aria-components/ListBox";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { cn } from "@/utils/global.utils";
import {
  listBoxItemLabelVariants,
  listBoxItemVariants,
  listBoxSectionHeaderVariants,
  listBoxSectionVariants,
  listBoxVariants,
} from "@/components/ui/ListBox/ListBox.styles";

export type ListBoxProps<T extends object> = AriaListBoxProps<T>;

export function ListBox<T extends object = object>(
  props: Readonly<ListBoxProps<T>>,
): ReactNode {
  const { className, ...rest } = props;

  return (
    <AriaListBox
      {...rest}
      className={composeRenderProps(className, (className) => {
        return cn(listBoxVariants(), className);
      })}
    />
  );
}

export type ListBoxItemProps = AriaListBoxItemProps;

export function ListBoxItem(props: Readonly<ListBoxItemProps>): ReactNode {
  const { className, children, textValue, ...rest } = props;
  const resolvedTextValue =
    textValue ?? (typeof children === "string" ? children : undefined);

  return (
    <AriaListBoxItem
      {...rest}
      textValue={resolvedTextValue}
      className={composeRenderProps(className, (className) => {
        return cn(listBoxItemVariants(), className);
      })}
    >
      {composeRenderProps(children, (children) => (
        <span className={listBoxItemLabelVariants()}>{children}</span>
      ))}
    </AriaListBoxItem>
  );
}

export type ListBoxSectionProps<T extends object = object> =
  AriaListBoxSectionProps<T> & {
    title?: string;
  };

export function ListBoxSection<T extends object = object>(
  props: Readonly<ListBoxSectionProps<T>>,
): ReactNode {
  const { title, items, children, className, ...rest } = props;

  return (
    <AriaListBoxSection
      {...rest}
      className={cn(listBoxSectionVariants(), className)}
    >
      {title ? (
        <Header className={listBoxSectionHeaderVariants()}>{title}</Header>
      ) : null}
      <Collection items={items}>{children}</Collection>
    </AriaListBoxSection>
  );
}
