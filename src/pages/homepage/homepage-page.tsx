import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCursor } from "context/CursorContext";
import { fadeIn, fadeOut } from "styles/animations";
import { categoryData } from "data/categoryData";
import CategoryItemContent from "./components/CategoryItemContent";
import Header from "./components/Header";

const Container = styled.div<{ isClicked: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  color: white;
  position: relative;
  overflow: hidden;
  cursor: none;
  transition: background 0.7s ease-in-out;

  ${({ isClicked }) =>
    isClicked &&
    css`
      animation: ${fadeOut} 0.5s ease forwards;
    `}
`;

const CategoryContainer = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
  margin-top: 1rem;
  width: 100%;
`;

const CategoryTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  width: 100%;
  padding: 0.5rem 0;
  transition: color 0.3s, transform 0.3s ease-in-out;
  z-index: 1;
  display: flex;
`;

const CategoryItem = styled.div`
  position: relative;
  width: 100%;
  transition: all 0.3s ease;
  height: 60px;
  padding-left: 8rem;
  color: #ccc;

  &:hover {
    height: 160px;
    color: white;

    ${CategoryTitle} {
      text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1),
        0px 0px 10px rgba(160, 153, 197, 0.51);
    }
  }
`;

const Text = styled.p`
  font-size: 1rem;
  color: #ccc;
  margin: 0;
  margin: 10px 0;
  padding-left: 8rem;
`;

const HomePage = () => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const { setHovered } = useCursor();

  const handleMouseMove = (e: React.MouseEvent) => {
    const root = document.documentElement;
    root.style.setProperty("--bg-x", `${e.clientX - 200}px`);
    root.style.setProperty("--bg-y", `${e.clientY - 450}px`);
  };

  const handleMouseEnter = (title: string, e: React.MouseEvent) => {
    setHovered(true);
    setHoveredTab(title);

    const root = document.documentElement;
    root.style.setProperty("--bg-x", `${e.clientX - 200}px`);
    root.style.setProperty("--bg-y", `${e.clientY - 450}px`);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setHoveredTab(null);
  };

  const handleClick = (key: string) => {
    setIsClicked(true);
    setHoveredTab(null);
    setHovered(false);
    setTimeout(() => navigate(`/${key.toLowerCase()}`), 300);
  };

  return (
    <Container isClicked={isClicked}>
      <Header onAboutClick={() => handleClick("about")} />{" "}
      <CategoryContainer>
        <Text>i'm a</Text>
        {Object.keys(categoryData).map((title) => (
          <CategoryItem
            key={title}
            onMouseMove={handleMouseMove}
            onMouseEnter={(e) => handleMouseEnter(title, e)}
            onMouseLeave={() => handleMouseLeave()}
            onClick={() => handleClick(title)}
          >
            <CategoryTitle>{title}</CategoryTitle>
            <CategoryItemContent title={title} active={hoveredTab === title} />
          </CategoryItem>
        ))}
        <Text>developer</Text>
      </CategoryContainer>
    </Container>
  );
};

export default HomePage;
