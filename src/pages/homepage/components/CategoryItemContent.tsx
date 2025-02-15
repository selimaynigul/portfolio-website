import React from "react";
import styled, { css } from "styled-components";
import { MdArrowOutward } from "react-icons/md";
import { categoryData } from "data/categoryData";
import Tag from "components/Tag";
import { fadeInBlur, fadeOutBlur } from "styles/animations";

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
      height: 100%; // Fill the box when active
    `}
`;

const WrapperInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
  align-items: top;
  box-sizing: border-box;
  padding-left: 18rem;
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

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
    `}
`;

const CategoryItemDescription = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Tags = styled.div`
  margin-left: 20px;
  display: flex;
  height: fit-content;
  gap: 10px;
`;

const BgLight = styled.div<{
  active: boolean;
  title: string;
}>`
  pointer-events: none;
  opacity: 0;
  position: absolute;
  left: var(--bg-x, 50px);
  top: var(--bg-y, 50px);
  height: 500px;
  width: 400px;
  border-radius: 50%;
  filter: blur(50px);
  transition: opacity 1s ease-in-out, filter 1s ease-in-out,
    transform 1s ease-in-out;

  background: ${({ title }) =>
    title === "Web"
      ? "radial-gradient(circle, rgba(0, 255, 174, 0.53) 0%, rgba(218, 116, 0, 0) 70%)"
      : title === "Game"
      ? "radial-gradient(circle, rgba(0, 65, 204, 0.73) 0%, rgba(218, 116, 0, 0) 70%)"
      : title === "Mobile"
      ? "radial-gradient(circle, rgba(136, 0, 255, 0.75) 0%, rgba(168, 0, 120, 0.17) 70%)"
      : "radial-gradient(circle, rgba(0, 255, 174, 0.4) 0%, rgba(218, 116, 0, 0) 70%)"};

  ${({ active }) =>
    active
      ? css`
          opacity: 0.8;
          animation: ${fadeInBlur} 0.8s ease forwards;
        `
      : css`
          opacity: 0;
          animation: ${fadeOutBlur} 0.8s ease forwards;
        `}
`;

const Arrow = styled.div<{ active: boolean }>`
  opacity: 0;
  transition: all 0.5s ease;
  margin-left: 24px;
  padding: 0;
  height: 16px;
  width: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

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
  return (
    <CategoryItemContentWrapper active={active}>
      <WrapperInner>
        <CategoryItemInfoContainer active={active}>
          <CategoryItemDescription>
            <span>{categoryData[title].text}</span>
          </CategoryItemDescription>
          <Tags>
            {categoryData[title].tags.map((tag: any) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
        </CategoryItemInfoContainer>

        <BgLight active={active} title={title} />

        <Arrow active={active}>
          <MdArrowOutward size={32} style={{ flexShrink: 0 }} />
        </Arrow>
      </WrapperInner>
    </CategoryItemContentWrapper>
  );
};

export default CategoryItemContent;
