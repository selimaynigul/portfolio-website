import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdArrowOutward } from "react-icons/md";
import { categoryData } from "data/categoryData";
import Tag from "components/Tag";
import { fadeInBlur, fadeOutBlur } from "styles/animations";
import Card from "components/Card";

const CategoryItemContentWrapper = styled.div<{ active: boolean }>`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 0;
  transform: translateY(-50%);
  transition: height 0.5s ease, background-color 0.3s ease;
  z-index: 0;
  box-sizing: border-box;

  ${({ active }) =>
    active &&
    css`
      height: 100%;
    `}
`;

const WrapperInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 0px;
  align-items: top;
  box-sizing: border-box;
  padding-left: 22rem;
  padding-top: 1rem;
  padding-right: 20rem;
  position: relative;
`;

const CategoryItemInfoContainer = styled.div<{ active: boolean }>`
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: all 0.5s ease;
  font-size: 0.9rem;
  display: flex;
  width: fit-content;
  padding: 15px;
  background: rgb(19, 19, 19);
  border-radius: 10px;
  border: 1px solid #333;
  position: relative;
  overflow: hidden;
  border-top-right-radius: 0;

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
    `};
`;

const CursorEffect = styled.div<{ x: number; y: number; visible: boolean }>`
  position: absolute;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.2);
  filter: blur(80px);
  border-radius: 50%;
  pointer-events: none;
  transition: transform 0.1s ease-out, opacity 0.3s ease-out;
  transform: translate(${({ x }) => x}px, ${({ y }) => y}px);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

const CategoryItemDescription = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.9rem;
`;

const Tags = styled.div`
  display: flex;
  gap: 10px;
  position: relative;
  z-index: 2;
`;

const Arrow = styled(Card)<{ active: boolean }>`
  opacity: 0;
  transition: all 0.5s ease;
  padding: 0;
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(19, 19, 19);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #333;
  border-top-left-radius: 0;
  border-top-left: 0;
  border-bottom-left-radius: 0;
  color: rgba(255, 255, 255, 0.5);

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
    `}
`;

interface CategoryItemContentProps {
  title: string;
  active: boolean;
}

const CategoryItemContent: React.FC<CategoryItemContentProps> = ({
  title,
  active,
}) => {
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [cursorVisible, setCursorVisible] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setCursorPos({ x: offsetX - 60, y: offsetY - 60 });
  };

  const handleMouseEnter = () => {
    setCursorVisible(true);
  };

  const handleMouseLeave = () => {
    setCursorVisible(false);
  };

  return (
    <CategoryItemContentWrapper active={active}>
      <WrapperInner>
        <CategoryItemInfoContainer
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          active={active}
        >
          <CursorEffect
            x={cursorPos.x}
            y={cursorPos.y}
            visible={cursorVisible}
          />
          <CategoryItemDescription
            className={title === "Game" ? "ghost-font" : ""}
          >
            <span>{categoryData[title].text}</span>
            <Tags>
              {categoryData[title].tags.map((tag: any) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Tags>
          </CategoryItemDescription>
        </CategoryItemInfoContainer>

        <Arrow active={active}>
          <MdArrowOutward size={24} style={{ flexShrink: 0 }} />
        </Arrow>
      </WrapperInner>
    </CategoryItemContentWrapper>
  );
};

export default CategoryItemContent;
