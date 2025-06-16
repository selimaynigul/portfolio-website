import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCursor } from "context/CursorContext";
import { fadeIn, fadeOut } from "styles/animations";
import { categoryData } from "data/categoryData";
import CategoryItemContent from "./components/CategoryItemContent";
import { motion } from "framer-motion";

const Container = styled.div<{ isClicked: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;
  position: relative;
  overflow: hidden;
  cursor: none;
  transition: background 0.7s ease-in-out;

  ${({ isClicked }) =>
    isClicked &&
    css`
      animation: ${fadeOut} 0.3s ease forwards;
    `}
`;

const CategoryContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out;
  margin-top: 1rem;
  width: 100%;
`;

const CategoryTitle = styled.div`
  font-size: 1.8rem;
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
  padding-left: 12rem;
  color: #ccc;

  &:hover {
    height: 160px;
    color: white;

    ${CategoryTitle} {
      text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1),
        0px 0px 10px rgba(160, 153, 197, 0.51);
    }
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    width: 100%;
  }
`;

const Text = styled.p`
  color: rgb(120, 120, 120);
  margin: 0;
  margin: 10px 0;
  padding-left: 12rem;

  @media (max-width: 768px) {
    padding: 0 20px;
    width: 100%;
  }
`;

const MotionCategoryItem = motion(CategoryItem); // Create motion-enabled CategoryItem

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Adjust delay between animations here
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

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
    navigate(`/${key.toLowerCase()}`);
  };
  return (
    <Container isClicked={isClicked}>
      <CategoryContainer>
        <Text>i'm a</Text>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Object.keys(categoryData).map((title) => (
            <MotionCategoryItem
              key={title}
              variants={itemVariants}
              onMouseMove={handleMouseMove}
              onMouseEnter={(e) => handleMouseEnter(title, e)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(title)}
            >
              <CategoryTitle>{title}</CategoryTitle>
              <CategoryItemContent
                title={title}
                active={hoveredTab === title}
              />
            </MotionCategoryItem>
          ))}
        </motion.div>
        <Text>developer</Text>
      </CategoryContainer>
    </Container>
  );
};

export default HomePage;
