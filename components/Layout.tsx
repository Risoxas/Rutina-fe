import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const StyledLayout = styled.div`
  width: 100%;
  padding: 0 2.5rem;
  font-family: "Roboto", sans-serif;
  font-size: 1.2em;
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <StyledLayout>{children}</StyledLayout>
    </div>
  );
};
