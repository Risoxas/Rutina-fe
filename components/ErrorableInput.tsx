import React, { forwardRef, ForwardRefRenderFunction } from "react";
import styled from "styled-components";
import Input from "./Input";

interface Props {
  placeholder?: string;
  onKeyDown?: (_event: React.KeyboardEvent<HTMLInputElement>) => void;
  name?: string;
  defaultValue?: string | number;
  required?: boolean;
  type?: string;
  step?: string;
  errorMessage: string;
  missingField: boolean;
}

/* eslint-disable no-use-before-define*/
const CustomInputComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (
  {
    placeholder,
    onKeyDown,
    name,
    defaultValue,
    required = false,
    step,
    type = "text",
    errorMessage,
    missingField,
  },
  ref,
) => (
  <InputWrapper>
    {missingField && <ErrorLabel>{errorMessage}</ErrorLabel>}
    <Input
      type={type}
      placeholder={placeholder}
      ref={ref}
      onKeyDown={onKeyDown}
      name={name}
      defaultValue={defaultValue}
      required={required}
      step={step}
    />
  </InputWrapper>
);

const ErrorableInput = forwardRef(CustomInputComponent);

const InputWrapper = styled.div`
  position: relative;
`;

const ErrorLabel = styled.label`
  color: red;
  font-size: 0.8em;
  position: absolute;
  top: -20px;
`;

export default ErrorableInput;
