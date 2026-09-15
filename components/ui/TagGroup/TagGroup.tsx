"use client";

import {
  type ReactNode,
} from "react";
import {
  Label,
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  type TagGroupProps as AriaTagGroupProps,
  TagList,
  type TagListProps,
  type TagProps as AriaTagProps,
  Text,
} from "react-aria-components/TagGroup";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { cn } from "@/utils/global.utils";
import {
  descriptionVariants,
  fieldErrorVariants,
  labelVariants,
} from "@/components/ui/TextField/TextField.styles";
import {
  tagDotVariants,
  tagGroupVariants,
  tagListVariants,
  tagVariants,
} from "@/components/ui/TagGroup/TagGroup.styles";

export type TagGroupProps<T extends object> = Omit<
  AriaTagGroupProps,
  "children"
> &
  Pick<TagListProps<T>, "items" | "children" | "renderEmptyState"> & {
    label?: string;
    description?: string;
    errorMessage?: string;
    color?: string;
  };

export type TagProps = AriaTagProps & {
  color?: string;
};

export function TagGroup<T extends object>(
  props: Readonly<TagGroupProps<T>>,
): ReactNode {
  const {
    label,
    description,
    errorMessage,
    items,
    children,
    renderEmptyState,
    className,
    ...rest
  } = props;

  return (
    <AriaTagGroup {...rest} className={cn(tagGroupVariants(), className)}>
      {label ? <Label className={labelVariants()}>{label}</Label> : null}
        <TagList
          items={items}
          renderEmptyState={renderEmptyState}
          className={tagListVariants()}
        >
          {children}
        </TagList>
      {description ? (
        <Text slot="description" className={descriptionVariants()}>
          {description}
        </Text>
      ) : null}
      {errorMessage ? (
        <Text slot="errorMessage" className={fieldErrorVariants()}>
          {errorMessage}
        </Text>
      ) : null}
    </AriaTagGroup>
  );
}

export function Tag(props: Readonly<TagProps>): ReactNode {
  const { children, className, textValue, color, style, ...rest } = props;

  return (
    <AriaTag
      textValue={textValue}
      {...rest}
      style={composeRenderProps(style, (style) => {
        if (!color) {
          return style;
        }

        return {
          ...style,
          "--tag-color": color,
        };
      })}
      className={composeRenderProps(className, (className, renderProps) => {
        return tagVariants({
          hasColor: Boolean(color),
          isFocusVisible: renderProps.isFocusVisible,
          className,
        });
      })}
    >
      {composeRenderProps(children, (children) => {
        return (
          <>
            <span
              data-slot="dot"
              className={tagDotVariants()}
              aria-hidden="true"
              style={
                color ? { backgroundColor: color } : undefined
              }
            />
            {children}
          </>
        );
      })}
    </AriaTag>
  );
}
