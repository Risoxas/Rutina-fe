// components/UnderConstruction.tsx

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const ConstructionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
`;

const ConstructionIcon = styled.div`
  font-size: 4em;
`;

const ConstructionTitle = styled.h1`
  margin-top: 20px;
`;

const ConstructionText = styled.p`
  margin-top: 10px;
  color: gray;
`;
const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const UnderConstruction: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <ConstructionContainer>
      <ConstructionIcon>🚧</ConstructionIcon>
      <ConstructionTitle>Under Construction</ConstructionTitle>
      <ConstructionText>
        We are working hard to bring this page to you soon!
      </ConstructionText>
      <BackButton onClick={handleBack}>Go Back</BackButton>
    </ConstructionContainer>
  );
};

export default UnderConstruction;
