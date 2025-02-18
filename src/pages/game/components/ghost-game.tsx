import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Card from "components/Card";
import { FaPlay, FaPause } from "react-icons/fa";
import { useCursor } from "context/CursorContext";
import { fadeIn } from "styles/animations";

const GameContainer = styled.div`
  position: relative;
  margin: 0 12rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 768px) {
    margin: 0 10px;
  }
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
  top: -140px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
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
const GhostGame = () => {
  const [gameMode, setGameMode] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [ghostSrc, setGhostSrc] = useState("ghost_gif/ghost_idle.gif");
  const [instructionGifKey, setInstructionGifKey] = useState(0);
  const [firstStart, setFirstStart] = useState(true); // Track first game start
  const { isHovered, setHovered } = useCursor();
  const [startPosition] = useState(100); // Set the desired starting position
  const position = useRef(startPosition);

  const ghostRef = useRef<HTMLImageElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const movement = useRef({ left: false, right: false });
  const containerWidth = useRef(0);

  useEffect(() => {
    if (ghostRef.current) {
      containerWidth.current = ghostRef.current.parentElement?.offsetWidth || 0;
      ghostRef.current.style.transform = `translateX(${position.current}px)`;
    }
  }, []);

  const toggleGameMode = () => {
    if (!gameMode) {
      setGameMode(true);

      if (firstStart) {
        setShowInstructions(true);
        setInstructionGifKey((prevKey) => prevKey + 1);
        setTimeout(() => setShowInstructions(false), 3500);
        setFirstStart(false); // Prevent further instruction displays
      }
    } else {
      setGameMode(false);
    }
  };

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
          borderColor: isHovered ? "rgb(102, 102, 102)" : "null",
        }}
      >
        <GameImage
          ref={ghostRef}
          height={64}
          width={48}
          src={ghostSrc}
          alt="Ghost"
        />
        <Overlay visible={isHovered} onClick={toggleGameMode}>
          {gameMode ? <PauseButton /> : <PlayButton />}
        </Overlay>
      </StyledCard>
      {showInstructions && (
        <InstructionGif
          key={instructionGifKey}
          src="keyboard_arrows.gif"
          alt="Keyboard Arrows"
          visible={showInstructions}
        />
      )}
    </GameContainer>
  );
};

export default GhostGame;
