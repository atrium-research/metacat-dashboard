"use client";

import { Children, type ReactElement, type ReactNode } from "react";
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  MenuTrigger as AriaMenuTrigger,
  Collection,
  Header,
  type MenuItemProps as AriaMenuItemProps,
  type MenuProps as AriaMenuProps,
  type MenuSectionProps as AriaMenuSectionProps,
  type MenuTriggerProps as AriaMenuTriggerProps,
  Separator,
  type SeparatorProps,
} from "react-aria-components/Menu";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { cn } from "@/utils/global.utils";
import { Popover, type PopoverProps } from "@/components/ui/Popover/Popover";
import {
  menuItemIndicatorVariants,
  menuItemLabelVariants,
  menuItemVariants,
  menuSectionHeaderVariants,
  menuSectionVariants,
  menuSeparatorVariants,
  menuVariants,
} from "@/components/ui/Menu/Menu.styles";

export type MenuTriggerProps = Omit<AriaMenuTriggerProps, "children"> & {
  children: [ReactElement, ReactElement];
  placement?: PopoverProps["placement"];
  popoverClassName?: string;
};

export function MenuTrigger(props: Readonly<MenuTriggerProps>): ReactNode {
  const { children, placement, popoverClassName, ...rest } = props;
  const [trigger, menu] = Children.toArray(children) as [
    ReactElement,
    ReactElement,
  ];

  return (
    <AriaMenuTrigger {...rest}>
      {trigger}
      <Popover
        placement={placement}
        className={cn("p-0", popoverClassName)}
      >
        {menu}
      </Popover>
    </AriaMenuTrigger>
  );
}

type MenuProps<T extends object> = AriaMenuProps<T>;

export function Menu<T extends object = object>(
  props: Readonly<MenuProps<T>>,
): ReactNode {
  const { className, ...rest } = props;

  return (
    <AriaMenu
      {...rest}
      className={composeRenderProps(className, (className) => {
        return cn(menuVariants(), className);
      })}
    />
  );
}

export type MenuItemProps = AriaMenuItemProps;

export function MenuItem(props: Readonly<MenuItemProps>): ReactNode {
  const { className, children, textValue, ...rest } = props;
  const resolvedTextValue =
    textValue ?? (typeof children === "string" ? children : undefined);

  return (
    <AriaMenuItem
      {...rest}
      textValue={resolvedTextValue}
      className={composeRenderProps(className, (className) => {
        return cn(menuItemVariants(), className);
      })}
    >
      {composeRenderProps(children, (children, { selectionMode, isSelected }) => (
        <>
          {selectionMode === "none" ? null : (
            <span aria-hidden="true" className={menuItemIndicatorVariants()}>
              {isSelected ? (
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-3"
                >
                  <path d="M2.5 6.5 L5 9 L9.5 3.5" />
                </svg>
              ) : null}
            </span>
          )}
          <span className={menuItemLabelVariants()}>{children}</span>
        </>
      ))}
    </AriaMenuItem>
  );
}

export type MenuSectionProps<T extends object = object> =
  AriaMenuSectionProps<T> & {
    title?: string;
  };

export function MenuSection<T extends object = object>(
  props: Readonly<MenuSectionProps<T>>,
): ReactNode {
  const { title, items, children, className, ...rest } = props;

  return (
    <AriaMenuSection
      {...rest}
      className={cn(menuSectionVariants(), className as string)}
    >
      {title ? (
        <Header className={menuSectionHeaderVariants()}>{title}</Header>
      ) : null}
      <Collection items={items}>{children}</Collection>
    </AriaMenuSection>
  );
}

export function MenuSeparator(props: Readonly<SeparatorProps>): ReactNode {
  const { className, ...rest } = props;

  return (
    <Separator {...rest} className={cn(menuSeparatorVariants(), className)} />
  );
}
