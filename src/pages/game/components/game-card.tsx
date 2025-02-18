import React from "react";
import styled from "styled-components";
import Card from "components/Card";
import Tag from "components/Tag"; // Assuming Tag component exists
import { FiArrowRight } from "react-icons/fi"; // Importing the right arrow icon

const StyledCard = styled(Card)`
  overflow: hidden;
  padding-bottom: 0px;
  position: relative;
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  position: relative;
`;

const GameTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const Arrow = styled(FiArrowRight)`
  font-size: 1.5rem;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  position: absolute;
  top: 10px;
  right: 0px;

  &:hover {
    opacity: 1;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 240px;
  overflow: hidden;
  border-radius: 15px 15px 0 0;
  margin-top: 0.5rem;
  box-shadow: rgb(14, 14, 14) 0px 50px 100px -20px,
    rgb(0, 0, 0) 0px 30px 60px -30px;
  border: 1px solid #333;
`;

const GameImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface GameCardProps {
  title: string;
  company: string;
  year: string;
  description: string;
  image: string;
  tags: string[];
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  company,
  year,
  description,
  image,
  tags,
}) => {
  return (
    <StyledCard style={{ padding: "15px 30px 0 30px" }}>
      <GameHeader>
        <div>
          <GameTitle>{title}</GameTitle>
          <TagsContainer>
            {tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsContainer>
        </div>
        <Arrow />
      </GameHeader>
      <ImageContainer>
        <GameImage src={image} alt={title} />
      </ImageContainer>
    </StyledCard>
  );
};

export default GameCard;
