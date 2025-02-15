import React from "react";
import { useCursor } from "../context/CursorContext";

const DotCursor: React.FC = () => {
  const { x, y, isVisible, isHovered } = useCursor();

  return (
    <div
      style={{
        position: "fixed",
        width: isHovered ? "16px" : "8px",
        height: isHovered ? "16px" : "8px",
        backgroundColor: "white",
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        transition: "width 0.2s, height 0.2s, transform 0.1s ease",
        zIndex: 9999,
        left: `${x}px`,
        top: `${y}px`,
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
};

export default DotCursor;
