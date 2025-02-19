import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { gameProjects } from "data/gameProjectsData"; // Mock data import
import Card from "components/Card";
import { fadeIn } from "styles/animations";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #0e0e0e;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const GameCard = styled(Card)`
  width: 1000px;
  height: 600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.3);
`;

const GameImage = styled.img`
  width: 90%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const GameTitle = styled.h1`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 10px;
`;

const NotFoundMessage = styled.div`
  font-size: 1.5rem;
  color: #fff;
`;

const GameProjectDetailPage: React.FC = () => {
  const location = useLocation(); // ✅ Get full URL path
  const pathParts = location.pathname.split("/"); // ✅ Split URL into parts
  const gameSlug = pathParts[pathParts.length - 1]; // ✅ Get the last part

  // ✅ Find the game by matching the slug
  const game = gameProjects.find(
    (game) => game.title.toLowerCase().replace(/\s+/g, "-") === gameSlug
  );

  return (
    <PageContainer>
      {game ? (
        <GameCard>
          <GameImage src={game.image} alt={game.title} />
          <GameTitle>{game.title}</GameTitle>
        </GameCard>
      ) : (
        <NotFoundMessage>Game Not Found</NotFoundMessage>
      )}
    </PageContainer>
  );
};

export default GameProjectDetailPage;
