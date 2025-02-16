import React from "react";
import styled, { css } from "styled-components";
import { Row, Col } from "antd";
import { fadeIn, fadeOut } from "styles/animations";
import Tag from "components/Tag";
import Card from "components/Card";
import { FaLocationDot } from "react-icons/fa6";

const Container = styled.div<{ isClicked: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const AboutSection = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out;
  padding-left: 12rem;
  text-align: left;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
  }
`;

const WorkExperienceSection = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-right: 12rem;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
`;

const workExperiences = [
  {
    company: "TechCorp",
    role: "Frontend Developer",
    startDate: "Jan 2023",
    endDate: "Present",
    description:
      "Developed modern, scalable web applications using React and Next.js. Collaborated closely with UI/UX teams to ensure seamless user experience.",
    tags: ["React", "Next.js", "JavaScript", "TypeScript"],
  },
  {
    company: "CodeSolutions",
    role: "Software Engineer",
    startDate: "Mar 2021",
    endDate: "Dec 2022",
    description:
      "Worked on enterprise software solutions, improving code efficiency and implementing best development practices.",
    tags: ["Java", "Spring Boot", "Microservices"],
  },
  {
    company: "GameStudio",
    role: "Game Developer",
    startDate: "Jun 2019",
    endDate: "Feb 2021",
    description:
      "Developed interactive and engaging game mechanics using Unity and C#. Worked on gameplay programming and optimization.",
    tags: ["Unity", "C#", "Game Development"],
  },
];

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
    "Figma",
    "Aseprite",
  ];

  return (
    <Container isClicked={false}>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12}>
          <AboutSection>
            <div style={{ width: "fit-content" }}>
              <Card>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <FaLocationDot color="rgb(97, 97, 97)" />
                  Based in Istanbul, Turkey
                </div>
              </Card>
            </div>
            <Card>
              <p>
                I’m Selim Aynigül, a passionate developer with a strong
                background in software engineering. I specialize in web, mobile,
                and game development, always eager to explore new technologies.
                From building interactive front-end applications with React and
                Next.js to developing robust mobile apps with Kotlin and Jetpack
                Compose, I thrive on solving challenges and crafting seamless
                user experiences.
              </p>
            </Card>
            <TagContainer>
              {skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </TagContainer>
          </AboutSection>
        </Col>
        <Col md={24} lg={12}>
          <WorkExperienceSection>
            {workExperiences.map((work, index) => (
              <Card key={index}>
                <div>
                  <strong>{work.company}</strong> -{" "}
                  <span style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                    {work.role}
                  </span>
                  <span
                    style={{
                      float: "right",
                      color: "rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    {work.startDate} - {work.endDate}
                  </span>
                </div>
                <p>{work.description}</p>
                <TagContainer>
                  {work.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagContainer>
              </Card>
            ))}
          </WorkExperienceSection>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutMePage;
