import React from "react";
import styled, { css } from "styled-components";
import { fadeIn, fadeOut } from "styles/animations";
import Tag from "components/Tag";
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

const AboutSection = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
  padding-left: 8rem;
  width: 35vw;
  text-align: left;
  color: white;

  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Summary = styled.p`
  color: #ccc;
  line-height: 1.6;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const AboutMePage: React.FC = () => {
  const skills = [
    "React",
    "Java",
    "C",
    "C++",
    "Next.js",
    "Kotlin",
    "Jetpack Compose",
    "JavaScript",
    "TypeScript",
    "Unity",
    "HTML",
    "CSS",
    "C#",
    "Git",
    "Bitbucket",
    "Blender",
  ];

  return (
    <Container isClicked={false}>
      <Header />
      <AboutSection>
        <Summary>
          I’m Selim Aynigül, a passionate developer with a strong background in
          software engineering. I specialize in web, mobile, and game
          development, always eager to explore new technologies. From building
          interactive front-end applications with React and Next.js to
          developing robust mobile apps with Kotlin and Jetpack Compose, I
          thrive on solving challenges and crafting seamless user experiences.
        </Summary>
        <TagContainer>
          {skills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </TagContainer>
      </AboutSection>
    </Container>
  );
};

export default AboutMePage;
