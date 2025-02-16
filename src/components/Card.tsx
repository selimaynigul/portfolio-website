import React, { useState } from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  padding: 15px;
  background: rgb(19, 19, 19);
  border-radius: 10px;
  border: 1px solid #333;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  color: #ccc;
  font-size: 0.9rem;
`;

const CursorEffect = styled.div<{ x: number; y: number; visible: boolean }>`
  position: absolute;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.3);
  filter: blur(80px);
  border-radius: 50%;
  pointer-events: none;
  transition: transform 0.1s ease-out, opacity 0.3s ease-out;
  transform: translate(${({ x }) => x}px, ${({ y }) => y}px);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [cursorVisible, setCursorVisible] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setCursorPos({ x: offsetX - 60, y: offsetY - 60 });
  };

  const handleMouseEnter = () => {
    setCursorVisible(true);
  };

  const handleMouseLeave = () => {
    setCursorVisible(false);
  };

  return (
    <CardWrapper
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CursorEffect x={cursorPos.x} y={cursorPos.y} visible={cursorVisible} />
      {children}
    </CardWrapper>
  );
};

export default Card;
