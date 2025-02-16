import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { fadeIn, fadeOut } from "styles/animations";
import { useCursor } from "context/CursorContext";
import StyledTitle from "./StyledTitle";
import Card from "components/Card";
import { BsEnvelopeFill, BsGithub, BsLinkedin } from "react-icons/bs";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const HeaderContainer = styled.div<{ isFading: boolean }>`
  /* animation: ${({ isFading }) =>
    isFading ? fadeOut : fadeIn} 0.5s ease-in-out; */
  padding: 0 12rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: relative;

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
  /* 
  &:hover {
    transform: translateX(10px);
  } */
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
    setHovered(false);
    setIsFading(true);
    navigate(location.pathname === "/" ? "/about" : "/contact");
    setIsFading(false);
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 500);
  };

  return (
    <HeaderContainer isFading={!isVisible || isFading}>
      <StyledTitle isFirstLoad={isFirstLoad} />
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
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
            onClick={handleClick}
          >
            about me
          </LinkText>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
