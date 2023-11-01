import React, {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from "react";
import styled from "styled-components";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/* eslint-disable no-use-before-define*/
const CustomInputComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = ({ type = "text", label, ...props }, ref) => (
  <StyledLabel>
    {label && <span>{label}</span>}
    <StyledInput {...props} type={type} ref={ref} />
  </StyledLabel>
);

const Input = forwardRef(CustomInputComponent);

const StyledInput = styled.input`
  padding: 8px 12px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
  text-decoration: none;

  &:focus {
    border-color: #333;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  span {
    font-size: 0.7em;
    text-decoration: underline;
    font-style: italic;
  }
`;

export default Input;
