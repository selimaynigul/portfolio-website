import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fadeIn, fadeOut } from "styles/animations";
import { useCursor } from "context/CursorContext";
import StyledTitle from "./StyledTitle";
import Card from "components/Card";
import { BsGithub } from "react-icons/bs";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import AboutHeader from "components/AboutHeader";
import HomeHeader from "./HomeHeader";

const LinkText = styled.p`
  transition: all 0.3s ease;
  color: #ccc;
  z-index: 1;
`;

const Header: React.FC = () => {
  const { setHovered } = useCursor();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>{location.pathname === "/about" ? <AboutHeader /> : <HomeHeader />}</>
  );
};

export default Header;
