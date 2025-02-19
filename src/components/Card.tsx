import React, { useState, forwardRef } from "react";
import styled from "styled-components";

const CardWrapper = styled.div<{ styleProps: React.CSSProperties }>`
  box-shadow: rgb(14, 14, 14) 0px 50px 100px -20px,
    rgb(0, 0, 0) 0px 30px 60px -30px;
  ${({ styleProps }) => ({
    padding: styleProps.padding || "15px",
    background: styleProps.background || "rgb(19, 19, 19)",
    borderRadius: styleProps.borderRadius || "10px",
    border: styleProps.border || "1px solid #333",
    position: "relative",
    transition: "all 0.3s ease-in-out",
    color: styleProps.color || "#ccc",
    fontSize: styleProps.fontSize || "0.9rem",
    width: styleProps.width || "auto",
    display: "flex",
    flexDirection: "column",
    gap: styleProps.gap || "20px",
    justifyContent: "center",
    ...styleProps,
  })}
`;

/* New Container to Restrict Cursor Effect */
const CursorContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; /* Restricts CursorEffect */
  pointer-events: none;
`;

const CursorEffect = styled.div<{ x: number; y: number; visible: boolean }>`
  position: absolute;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.2);
  filter: blur(100px);
  border-radius: 50%;
  pointer-events: none;
  transition: transform 0.1s ease-out, opacity 0.3s ease-out;
  transform: translate(${({ x }) => x}px, ${({ y }) => y}px);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const CardComponent = forwardRef<HTMLDivElement, CardProps>(
  ({ children, style = {}, ...props }, ref) => {
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
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        styleProps={style}
        {...props} // ✅ Forward all other props
      >
        <CursorContainer>
          <CursorEffect
            x={cursorPos.x}
            y={cursorPos.y}
            visible={cursorVisible}
          />
        </CursorContainer>
        {children}
      </CardWrapper>
    );
  }
);

export default CardComponent; // ✅ Use a named function when using forwardRef
