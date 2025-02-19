import React, { useRef, useState } from "react";
import { Row, Col } from "antd";
import GhostGame from "./components/ghost-game";
import GameCard from "./components/game-card";
import styled, { css } from "styled-components";
import { fadeIn } from "styles/animations";
import useScrollFade from "hooks/useScrollFade";
import { gameProjects } from "data/gameProjectsData";
import { useNavigate } from "react-router-dom";
import { fadeOut } from "styles/animations";

const Container = styled.div<{ isClicked: boolean }>`
  ${({ isClicked }) =>
    isClicked &&
    css`
      animation: ${fadeOut} 0.3s ease forwards;
    `}
`;

const StyledRow = styled(Row)`
  animation: ${fadeIn} 0.5s ease-in-out;
  box-sizing: border-box;
  margin: 2rem 12rem 0 12rem !important;

  @media (max-width: 768px) {
    margin: 4rem 0 0 0 !important;
  }
`;

const CardWrapper = styled.div`
  opacity: 0;
`;

const GameProjectsPage: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const fadeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();
  useScrollFade(
    {
      leaveStart: "top 10%",
      leaveEnd: "bottom 10%",
      enterStart: "top 100%",
      enterEnd: "bottom 100%",
      staggerY: 0,
    },
    fadeRefs
  );

  return (
    <Container isClicked={isClicked}>
      <GhostGame />
      <StyledRow style={{ paddingBottom: "4rem" }}>
        {gameProjects.map((game, index) => {
          const gameSlug = game.title.toLowerCase().replace(/\s+/g, "-");

          return (
            <Col
              xs={24}
              sm={12}
              key={index}
              style={{
                paddingRight: index % 2 === 0 ? "8px" : "0",
                paddingLeft: index % 2 === 0 ? "0px" : "8px",
                marginBottom: 64,
              }}
            >
              <CardWrapper
                ref={(el) => {
                  if (el) fadeRefs.current[index] = el;
                }}
                key={index}
                className="ghost-font"
                onClick={() => {
                  setIsClicked(true);
                  navigate(`/game/${gameSlug}`);
                }}
              >
                <GameCard
                  tags={game.tags}
                  title={game.title}
                  company={game.company}
                  year={game.year}
                  description={game.description}
                  image={game.image}
                />
              </CardWrapper>
            </Col>
          );
        })}
      </StyledRow>
    </Container>
  );
};

export default GameProjectsPage;
