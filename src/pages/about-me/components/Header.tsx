import React, { useState } from "react";
import styled from "styled-components";
import { fadeIn, slideIn, slideOut } from "styles/animations";
import { useCursor } from "context/CursorContext";

const HeaderContainer = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
  padding: 0 8rem;
  position: absolute;
  top: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  span {
    text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1),
      0px 0px 10px rgba(160, 153, 197, 0.51);
    color: #ccc;
    z-index: 3;
  }
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 5px;
  font-size: 1.5rem;
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

const Header: React.FC = () => {
  const [isNameHovered, setIsNameHovered] = useState(false);
  const { setHovered } = useCursor();

  return (
    <HeaderContainer>
      <NameContainer>
        <span
          onMouseEnter={() => setIsNameHovered(true)}
          onMouseLeave={() => setIsNameHovered(false)}
          style={{ fontWeight: "bold", color: "white" }}
        >
          about me
        </span>
        <Emoji src="./emoji.png" alt="emoji" isVisible={isNameHovered} />
      </NameContainer>

      <p
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        contact
      </p>
    </HeaderContainer>
  );
};

export default Header;
