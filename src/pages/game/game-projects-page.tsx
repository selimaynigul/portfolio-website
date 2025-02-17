import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Card from "components/Card";
import { FaPlay, FaPause } from "react-icons/fa";
import { useCursor } from "context/CursorContext";

const GameContainer = styled.div`
  position: relative;
  margin: 0 24rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const GameImage = styled.img`
  position: absolute;
`;

const Overlay = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ visible }) => (visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const PlayButton = styled(FaPlay)`
  color: white;
  font-size: 2rem;
`;

const PauseButton = styled(FaPause)`
  color: white;
  font-size: 2rem;
`;

const Title = styled.div`
  position: absolute;
  font-size: 1.5rem;
  color: white;
  z-index: 1;
  font-weight: 500;
`;

const InstructionGif = styled.img<{ visible: boolean }>`
  position: absolute;
  bottom: -140px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  pointer-events: none;
`;

const StyledCard = styled(Card).attrs((props) => ({
  ...props,
}))<{ hovered: boolean; gameMode: boolean }>`
  transition: height 0.3s ease-in-out, border-color 0.3s ease-in-out;
  height: ${({ hovered }) => (hovered ? "7rem" : "6rem")};
  border-color: ${({ hovered, gameMode }) =>
    hovered || gameMode ? "gray" : "transparent"};
`;

const GameProjectsPage = () => {
  const [gameMode, setGameMode] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [ghostSrc, setGhostSrc] = useState("ghost_gif/ghost_idle.gif");
  const { isHovered, setHovered } = useCursor();
  const position = useRef(0);
  const ghostRef = useRef<HTMLImageElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const movement = useRef({ left: false, right: false });
  const containerWidth = useRef(0);

  useEffect(() => {
    if (ghostRef.current) {
      containerWidth.current = ghostRef.current.parentElement?.offsetWidth || 0;
    }
  }, []);

  useEffect(() => {
    if (gameMode) {
      setShowInstructions(true);
      setTimeout(() => setShowInstructions(false), 5000);
    }
  }, [gameMode]);

  const moveCharacter = () => {
    let newPosition = position.current;

    if (movement.current.right) {
      newPosition += 3;
      setGhostSrc("ghost_gif/ghost_move_right.gif");
    }
    if (movement.current.left) {
      newPosition -= 3;
      setGhostSrc("ghost_gif/ghost_move_left.gif");
    }

    if (newPosition > containerWidth.current) {
      newPosition = -48;
    } else if (newPosition < -48) {
      newPosition = containerWidth.current;
    }

    if (ghostRef.current) {
      ghostRef.current.style.transform = `translateX(${newPosition}px)`;
    }
    position.current = newPosition;

    if (movement.current.left || movement.current.right) {
      animationRef.current = requestAnimationFrame(moveCharacter);
    } else {
      setGhostSrc("ghost_gif/ghost_idle.gif");
      cancelAnimationFrame(animationRef.current!);
      animationRef.current = null;
    }
  };

  useEffect(() => {
    if (!gameMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") movement.current.right = true;
      if (e.key === "ArrowLeft") movement.current.left = true;

      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(moveCharacter);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") movement.current.right = false;
      if (e.key === "ArrowLeft") movement.current.left = false;

      if (!movement.current.left && !movement.current.right) {
        cancelAnimationFrame(animationRef.current!);
        animationRef.current = null;
        setGhostSrc("ghost_gif/ghost_idle.gif");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameMode]);

  return (
    <GameContainer
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!gameMode && <Title>Game Projects</Title>}
      <StyledCard
        hovered={isHovered}
        gameMode={gameMode}
        style={{
          background: "url(/ghost_bg.png) bottom/cover no-repeat",
          position: "relative",
          width: "100%",
          height: "100%",
          borderColor: isHovered ? "gray" : "null",
        }}
      >
        <GameImage
          ref={ghostRef}
          height={64}
          width={48}
          src={ghostSrc}
          alt="Ghost"
        />
        <Overlay visible={isHovered} onClick={() => setGameMode(!gameMode)}>
          {gameMode ? <PauseButton /> : <PlayButton />}
        </Overlay>
      </StyledCard>
      <InstructionGif
        src="keyboard_arrows.gif"
        alt="Keyboard Arrows"
        visible={showInstructions}
      />
    </GameContainer>
  );
};

export default GameProjectsPage;
