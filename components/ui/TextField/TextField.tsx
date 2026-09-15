"use client";

import { type ReactNode, type Ref } from "react";
import {
  FieldError,
  Input,
  Label,
  Text,
  TextArea as AriaTextArea,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from "react-aria-components/TextField";
import { composeRenderProps } from "react-aria-components";
import { cn } from "@/utils/global.utils";
import {
  descriptionVariants,
  fieldErrorVariants,
  inputVariants,
  labelVariants,
  textFieldVariants,
} from "@/components/ui/TextField/TextField.styles";

export type TextFieldProps<
  T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement,
> = Omit<AriaTextFieldProps, "children"> & {
  label?: string;
  description?: string;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  inputRef?: Ref<T>;
  inputClassName?: string;
};

type FieldChromeProps = {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: ReactNode;
};

const FieldChrome = (props: FieldChromeProps) => {
  const { label, description, errorMessage, children } = props;

  return (
    <>
      {label ? <Label className={labelVariants()}>{label}</Label> : null}
      {children}
      {description ? (
        <Text slot="description" className={descriptionVariants()}>
          {description}
        </Text>
      ) : null}
      <FieldError className={fieldErrorVariants()}>{errorMessage}</FieldError>
    </>
  );
};

const getInputClassName = (multiline: boolean, className?: string) => {
  return composeRenderProps(className, (className) => {
    return cn(inputVariants({ multiline }), className);
  });
};

export function TextField(props: Readonly<TextFieldProps>): ReactNode {
  const {
    label,
    description,
    errorMessage,
    placeholder,
    inputRef,
    inputClassName,
    className,
    ...rest
  } = props;

  return (
    <AriaTextField
      {...rest}
      className={composeRenderProps(className, (className, renderProps) => {
        return textFieldVariants({ ...renderProps, className });
      })}
    >
      <FieldChrome
        label={label}
        description={description}
        errorMessage={errorMessage}
      >
        <Input
          ref={inputRef}
          placeholder={placeholder}
          className={getInputClassName(false, inputClassName)}
        />
      </FieldChrome>
    </AriaTextField>
  );
}

export function TextArea(
  props: Readonly<TextFieldProps<HTMLTextAreaElement>>,
): ReactNode {
  const {
    label,
    description,
    errorMessage,
    placeholder,
    inputRef,
    inputClassName,
    className,
    ...rest
  } = props;

  return (
    <AriaTextField
      {...rest}
      className={composeRenderProps(className, (className, renderProps) => {
        return textFieldVariants({ ...renderProps, className });
      })}
    >
      <FieldChrome
        label={label}
        description={description}
        errorMessage={errorMessage}
      >
        <AriaTextArea
          ref={inputRef}
          placeholder={placeholder}
          className={getInputClassName(true, inputClassName)}
        />
      </FieldChrome>
    </AriaTextField>
  );
}
