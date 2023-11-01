import styled from "styled-components";

const Hamburger = styled.div<{ open: boolean }>`
  width: 30px;
  height: 22.5px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  cursor: pointer;

  & > div {
    height: 3.5px;
    width: 100%;
    background-color: #333;
    transition: all 0.3s ease;
  }
`;

export default Hamburger;
