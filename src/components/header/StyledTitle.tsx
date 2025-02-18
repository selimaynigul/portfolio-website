import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { slideIn, slideOut } from "styles/animations";

const NameContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 5px;
  font-size: 1.5rem;
  color: rgb(120, 120, 120);

  span {
    cursor: none;
  }
`;

const Emoji = styled.img<{ isVisible: boolean }>`
  width: 32px;
  height: 32px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  position: absolute;
  left: 100%;
  margin-left: 8px;
  animation: ${({ isVisible }) => (isVisible ? slideIn : slideOut)}
    ${({ isVisible }) => (isVisible ? "0.8s" : "0.2s")} ease-in-out;
`;

const StyledTitle: React.FC = () => {
  const [isNameHovered, setIsNameHovered] = useState(false);
  const location = useLocation();

  return (
    <NameContainerWrapper>
      {location.pathname === "/about" ? (
        <span style={{ fontWeight: "bold", color: "white" }}>about me</span>
      ) : (
        <>
          <p>i'm </p>
          <span
            onMouseEnter={() => setIsNameHovered(true)}
            onMouseLeave={() => setIsNameHovered(false)}
            style={{ fontWeight: "bold", color: "white" }}
          >
            selim
          </span>
          <Emoji src="./emoji.png" alt="emoji" isVisible={isNameHovered} />
        </>
      )}
    </NameContainerWrapper>
  );
};

export default StyledTitle;
