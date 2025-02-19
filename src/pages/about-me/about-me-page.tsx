import React from "react";
import { Row, Col } from "antd";
import styled, { css } from "styled-components";
import { fadeOut } from "styles/animations";
import WorkExperience from "./components/WorkExperience";
import { workExperiences } from "data/workExperiencesData";
import Summary from "./components/About";

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

const AboutMePage: React.FC = () => {
  return (
    <Container isClicked={false}>
      <Row style={{ padding: "0 12rem", margin: 0 }}>
        <Col style={{ paddingRight: "8px" }} xs={24} md={12}>
          <Summary />
        </Col>
        <Col style={{ paddingLeft: "8px" }} xs={24} md={12}>
          <WorkExperience experiences={workExperiences} />
        </Col>
      </Row>
    </Container>
  );
};

export default AboutMePage;
