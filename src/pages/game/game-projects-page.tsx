import React from "react";
import { Row, Col } from "antd";
import GhostGame from "./components/ghost-game";
import GameCard from "./components/game-card";
import styled from "styled-components";
import { appear, disappear, fadeIn } from "styles/animations";

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
  animation: ${appear} 5s linear, ${disappear} 5s linear;
  animation-timeline: view();
  animation-range: entry 0% cover 30%, exit 0% cover 30%;
`;

const mockGames = [
  {
    title: "Stadia Bluetooth",
    company: "Google",
    year: "'23",
    description: "Giving a second life to over a million controllers.",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/c4b80d143006427.Y3JvcCw4NjksNjgwLDI1LDA.png",
    tags: ["Wireless", "Tech", "Gaming"],
  },
  {
    title: "Cyber Battle",
    company: "Cyber Corp",
    year: "'22",
    description: "Fight against AI-controlled enemies in a cyberpunk world.",
    image:
      "https://images-rsg.storage.googleapis.com/wp-content/uploads/2023/11/Pixel-Art-Portfolio-Cover-Space-Adventure.jpg",
    tags: ["Action", "Multiplayer", "Cyberpunk"],
  },
  {
    title: "Pixel Quest",
    company: "Indie Devs",
    year: "'21",
    description:
      "Explore dungeons and defeat pixel monsters in this retro game.",
    image:
      "https://mondia.com/wp-content/uploads/2024/09/IndieGames-Mondia.png",
    tags: ["Adventure", "Pixel", "Indie"],
  },
  {
    title: "Space Explorers",
    company: "NASA Games",
    year: "'20",
    description: "Travel through space and colonize planets.",
    image: "https://i.imgur.com/tdTByDa.jpeg",
    tags: ["Sci-Fi", "Exploration", "Strategy"],
  },

  {
    title: "Cyber Battle",
    company: "Cyber Corp",
    year: "'22",
    description: "Fight against AI-controlled enemies in a cyberpunk world.",
    image:
      "https://images-rsg.storage.googleapis.com/wp-content/uploads/2023/11/Pixel-Art-Portfolio-Cover-Space-Adventure.jpg",
    tags: ["Action", "Multiplayer", "Cyberpunk"],
  },
  {
    title: "Stadia Bluetooth",
    company: "Google",
    year: "'23",
    description: "Giving a second life to over a million controllers.",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/c4b80d143006427.Y3JvcCw4NjksNjgwLDI1LDA.png",
    tags: ["Wireless", "Tech", "Gaming"],
  },
];

const GameProjectsPage: React.FC = () => {
  return (
    <>
      <GhostGame />
      <StyledRow style={{ padding: "0", margin: 0 }}>
        {mockGames.map((game, index) => (
          <Col
            xs={24}
            sm={12}
            key={index}
            style={{
              paddingRight: index % 2 === 0 ? "8px" : "0",
              paddingLeft: index % 2 === 0 ? "0px" : "8px",
              marginBottom: 16,
            }}
          >
            <CardWrapper className="ghost-font">
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
