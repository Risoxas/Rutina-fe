import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSvg = styled.svg`
  animation: ${spin} 1s linear infinite;
`;

const Loading: React.FC = () => {
  return (
    <StyledSvg
      width="40"
      height="40"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
        stroke="#000"
        strokeLinecap="round"
        strokeDasharray="31.41592653589793 94.24777960769379"
      />
    </StyledSvg>
  );
};

export default Loading;
