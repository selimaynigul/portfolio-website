import React from "react";
import { Row, Col } from "antd";
import styled, { css } from "styled-components";
import { fadeIn, fadeOut } from "styles/animations";
import WorkExperience from "./components/WorkExperience";
import About from "./components/About";
import { workExperiences } from "data/workExperiencesData";

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
  text-align: left;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 84px;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 768px) {
    box-sizing: border-box;
    width: 100%;
  }
`;

const AboutMePage: React.FC = () => {
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
            <About />
          </AboutSection>
        </Col>
        <Col style={{ paddingLeft: "8px" }} xs={24} md={12}>
          <WorkExperience experiences={workExperiences} />
        </Col>
      </Row>
    </Container>
  );
};

export default AboutMePage;
