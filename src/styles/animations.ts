import { keyframes } from "styled-components";

// Fade Animations
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

export const fadeLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(0);
  }
  to {
    opacity: 1;
    transform: translateX(-20px);
  }
`;

export const fadeInBlur = keyframes`
  0% {
    opacity: 0;
    filter: blur(30px);
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    filter: blur(200px);
    transform: scale(1);
  }
`;

export const fadeOutBlur = keyframes`
  0% {
    opacity: 1;
    filter: blur(200px);
    transform: scale(1);
  }
  100% {
    opacity: 0;
    filter: blur(30px);
    transform: scale(0.95);
  }
`;

// Slide Animations
export const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-15px) rotate(-30deg);
  }
  30% {
    opacity: 1;
    transform: translateX(8px) rotate(20deg);
  }
  50% {
    transform: translateX(-4px) rotate(-5deg);
  }
  65% {
    transform: translateX(2px) rotate(3deg);
  }
  80% {
    transform: translateX(0px) rotate(-1deg);
  }
  100% {
    transform: translateX(0) rotate(0deg);
  }
`;

export const slideOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0) rotate(0deg);
  }
  100% {
    opacity: 0;
    transform: translateX(-10px) rotate(-15deg);
  }
`;
