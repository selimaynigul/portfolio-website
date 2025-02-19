import React, { useRef } from "react";
import { Row, Col } from "antd";
import GhostGame from "./components/ghost-game";
import GameCard from "./components/game-card";
import styled from "styled-components";
import { appear, disappear, fadeIn } from "styles/animations";
import useScrollFade from "hooks/useScrollFade";
import { gameProjects } from "data/gameProjectsData";

const StyledRow = styled(Row)`
  animation: ${fadeIn} 0.5s ease-in-out;
  padding-bottom: 2rem;
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
  const fadeRefs = useRef<(HTMLDivElement | null)[]>([]);
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
    <>
      <GhostGame />
      <StyledRow style={{ padding: "0", margin: 0 }}>
        {gameProjects.map((game, index) => (
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
        ))}
      </StyledRow>
    </>
  );
};

export default GameProjectsPage;
