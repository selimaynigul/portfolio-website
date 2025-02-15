import React, { useEffect, useState } from "react";
import { useCursor } from "../context/CursorContext";
import styled from "styled-components";

const CircleCursor = styled.div<{ isHovered: boolean; isVisible: boolean }>`
  position: fixed;
  width: ${({ isHovered }) => (isHovered ? "40px" : "0px")};
  height: ${({ isHovered }) => (isHovered ? "40px" : "0px")};
  border: 2px solid white;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease;
  z-index: 9998;
  mix-blend-mode: difference;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;

const DotCursor: React.FC = () => {
  const { x, y, isVisible, isHovered } = useCursor();
  const [circleX, setCircleX] = useState(x);
  const [circleY, setCircleY] = useState(y);

  useEffect(() => {
    let animationFrame: number;

    const updatePosition = () => {
      setCircleX((prevX) => prevX + (x - prevX) * 0.2); // Smooth easing effect
      setCircleY((prevY) => prevY + (y - prevY) * 0.2);
      animationFrame = requestAnimationFrame(updatePosition);
    };

    animationFrame = requestAnimationFrame(updatePosition);

    return () => cancelAnimationFrame(animationFrame);
  }, [x, y]);

  return (
    <>
      {/* Main Dot Cursor */}
      <div
        style={{
          position: "fixed",
          width: "8px",
          height: "8px",
          backgroundColor: "white",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s, height 0.2s",
          zIndex: 9999,
          left: `${x}px`,
          top: `${y}px`,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Smooth Following Circle Cursor */}
      <CircleCursor
        isHovered={isHovered}
        isVisible={isVisible}
        style={{ left: `${circleX}px`, top: `${circleY}px` }}
      />
    </>
  );
};

export default DotCursor;
