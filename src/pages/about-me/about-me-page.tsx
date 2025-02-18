import React from "react";
import styled, { css } from "styled-components";
import { Row, Col } from "antd";
import { disappear, fadeIn, fadeOut } from "styles/animations";
import Tag from "components/Tag";
import Card from "components/Card";
import { FaLocationDot } from "react-icons/fa6";
import { appear } from "styles/animations";

const Container = styled.div<{ isClicked: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  position: relative;
  overflow: hidden;
  cursor: none;
  transition: background 0.7s ease-in-out;
  padding: 0 12rem;

  display: contents;

  @media (max-width: 768px) {
    padding: 0 10px;
  }

  ${({ isClicked }) =>
    isClicked &&
    css`
      animation: ${fadeOut} 0.3s ease forwards;
    `}
`;

const AboutSection = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out;
  text-align: left;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  position: sticky;
  top: 84px;

  @media (max-width: 768px) {
    box-sizing: border-box;
    width: 100%;
  }
`;

const WorkExperienceSection = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 2rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
`;

const CardWrapper = styled.div`
  animation: ${appear} 5s linear, ${disappear} 5s linear;
  animation-timeline: view();
  animation-range: entry 0% cover 20%, exit 0% cover 30%;
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
  {
    company: "GameStudio",
    role: "Game Developer",
    startDate: "Jun 2019",
    endDate: "Feb 2021",
    description:
      "Developed interactive and engaging game mechanics using Unity and C#. Worked on gameplay programming and optimization.",
    tags: ["Unity", "C#", "Game Development"],
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
      <Row style={{ padding: "0 12rem", margin: 0 }}>
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            flexDirection: "column",
            paddingRight: "8px",
          }}
        >
          <AboutSection>
            {/*   Summary */}
            <div style={{ display: "flex", gap: "1rem", height: "4rem" }}>
              <Card
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  flexShrink: 0,
                }}
              >
                <FaLocationDot color="rgb(97, 97, 97)" />
                Based in Istanbul, Turkey
              </Card>
              <Card
                style={{
                  background:
                    "url(/landscapes/landscape_2.gif) center/cover no-repeat",
                  width: "100%;",
                }}
              >
                <></>
              </Card>
            </div>
            <div style={{ margin: "/* 2rem */ 0" }}>
              <Card>
                <p>
                  I’m Selim Aynigül, a passionate developer with a strong
                  background in software engineering. I specialize in web,
                  mobile, and game development, always eager to explore new
                  technologies. From building interactive front-end applications
                  with React and Next.js to developing robust mobile apps with
                  Kotlin and Jetpack Compose, I thrive on solving challenges and
                  crafting seamless user experiences.
                </p>
              </Card>
            </div>
            <TagContainer>
              {skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </TagContainer>
          </AboutSection>
        </Col>
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "8px",
          }}
        >
          <WorkExperienceSection>
            {/*   <div
              style={{
                background: "#0E0E0E",
                position: "sticky",
                top: 84,
                zIndex: 5,
              }}
            >
              Experience
            </div> */}
            {workExperiences.map((work, index) => (
              <CardWrapper>
                <Card key={index}>
                  <div>
                    <strong>{work.role}</strong> •{" "}
                    <span style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                      {work.company}
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
              </CardWrapper>
            ))}
          </WorkExperienceSection>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutMePage;
