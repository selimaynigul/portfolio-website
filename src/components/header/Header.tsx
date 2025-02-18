import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fadeIn, fadeOut } from "styles/animations";
import { useCursor } from "context/CursorContext";
import StyledTitle from "./StyledTitle";
import Card from "components/Card";
import { BsGithub } from "react-icons/bs";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";

const HeaderContainer = styled.div<{ isFading: boolean }>`
  animation: ${({ isFading }) => isFading && fadeIn} 0.5s ease-in-out;
  padding: 16px 12rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  background: rgba(14, 14, 14, 0.9);
  backdrop-filter: blur(10px);
  z-index: 4;
  margin: 4rem 0;
  margin-top: 0;

  span {
    text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1),
      0px 0px 10px rgba(160, 153, 197, 0.51);
    color: #ccc;
    z-index: 2;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    width: 100%;
  }
`;

const LinkText = styled.p`
  transition: all 0.3s ease;
  color: #ccc;
  z-index: 1;
`;

const Header: React.FC = () => {
  const { setHovered } = useCursor();
  const location = useLocation();
  const navigate = useNavigate();
  const [isFading, setIsFading] = useState(false);

  // Trigger fade animation when location changes
  useEffect(() => {
    setIsFading(true);
    const timeout = setTimeout(() => setIsFading(false), 500); // Wait for animation to finish
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <HeaderContainer isFading={isFading}>
      <StyledTitle />
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {location.pathname === "/about" ? (
          <>
            <Card>
              <FaLinkedinIn size={20} color="rgb(97, 97, 97)" />
            </Card>
            <Card>
              <BsGithub size={20} color="rgb(97, 97, 97)" />
            </Card>
            <Card>
              <FaEnvelope size={20} color="rgb(97, 97, 97)" />
            </Card>
          </>
        ) : (
          <LinkText
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => navigate("/about")}
          >
            about me
          </LinkText>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
