import React, { useState } from "react";
import styled from "styled-components";
import { Segmented } from "antd";
import { fadeIn, slideIn, slideOut } from "styles/animations";
import { useCursor } from "context/CursorContext";

const HeaderContainer = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
  padding: 0 12rem;
  position: absolute;
  top: 6rem;
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

const FilterContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSegmented = styled(Segmented)`
  &.ant-segmented {
    background: transparent;
  }

  .ant-segmented-item-selected {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    border-radius: 8px;
  }
`;

const Header: React.FC = () => {
  const [isNameHovered, setIsNameHovered] = useState(false);
  const { setHovered } = useCursor();
  const [filter, setFilter] = useState("All");

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

      {/*  <FilterContainer>
        <StyledSegmented
          options={["All", "Mobile", "Web", "Game"]}
          value={filter}
          onChange={(value) => setFilter(value as string)}
        />
      </FilterContainer> */}

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
