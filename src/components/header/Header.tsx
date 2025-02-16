import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { fadeIn, fadeOut } from "styles/animations";
import { useCursor } from "context/CursorContext";
import StyledTitle from "./StyledTitle";

const HeaderContainer = styled.div<{ isFading: boolean }>`
  /*   animation: ${({ isFading }) =>
    isFading ? fadeOut : fadeIn} 0.5s ease-in-out;
 */
  padding: 0 12rem;
  position: absolute;
  top: 6rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

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
  cursor: pointer;
  color: #ccc;
  z-index: 1;

  &:hover {
    transform: translateX(10px);
  }
`;

const Header: React.FC = () => {
  const { setHovered } = useCursor();
  const location = useLocation();
  const navigate = useNavigate();
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    setIsFirstLoad(false);
  }, []);

  const handleClick = () => {
    console.log("clicked");
    setIsFading(true);
    setTimeout(() => {
      navigate(location.pathname === "/" ? "/about" : "/contact");
      setIsFading(false);
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 500);
    }, 500); // Match fade-out duration
  };

  return (
    <HeaderContainer isFading={!isVisible || isFading}>
      <StyledTitle isFirstLoad={isFirstLoad} />
      <LinkText
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        {location.pathname === "/about" ? "contact" : "about me"}
      </LinkText>
    </HeaderContainer>
  );
};

export default Header;
