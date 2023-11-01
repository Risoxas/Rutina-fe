import React from "react";
import styled from "styled-components";

interface Props {
  label: string;
  onClick: (_event: any) => void;
  style?: React.CSSProperties;
}

/* eslint-disable no-use-before-define*/
const Button: React.FC<Props> = ({ label, onClick, style }) => (
  <StyledButton style={style} onClick={onClick}>
    {label}
  </StyledButton>
);

const StyledButton = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default Button;
