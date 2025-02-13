import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

// Color mappings for different sections
const backgroundColors = {
  Web: {
    "--c-0": "hsla(97, 80%, 40%, 1)",
    "--c-1": "hsla(97, 60%, 25%, 1)",
    "--c-2": "hsla(97, 50%, 20%, 1)",
    "--c-3": "hsla(97, 90%, 60%, 1)",
    "--c-4": "hsla(97, 30%, 10%, 1)",
  },
  Game: {
    "--c-0": "hsla(248, 80%, 50%, 1)",
    "--c-1": "hsla(248, 60%, 35%, 1)",
    "--c-2": "hsla(248, 50%, 25%, 1)",
    "--c-3": "hsla(248, 90%, 65%, 1)",
    "--c-4": "hsla(248, 30%, 15%, 1)",
  },
  Mobile: {
    "--c-0": "hsla(349, 80%, 50%, 1)",
    "--c-1": "hsla(349, 60%, 35%, 1)",
    "--c-2": "hsla(349, 50%, 25%, 1)",
    "--c-3": "hsla(349, 90%, 65%, 1)",
    "--c-4": "hsla(349, 30%, 15%, 1)",
  },
  Default: {
    "--c-0": "hsla(97, 2%, 11%, 1)",
    "--c-1": "hsla(75, 0%, 0%, 1)",
    "--c-2": "hsla(248, 37%, 20%, 1)",
    "--c-3": "hsla(254, 100%, 52%, 1)",
    "--c-4": "hsla(349, 0%, 0%, 1)",
  },
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const fadeLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(0);
  }
  to {
    opacity: 1;
    transform: translateX(-20px);
  }
`;

const fadeInBlur = keyframes`
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

const fadeOutBlur = keyframes`
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

// Slide-in animation with a little rebound and lean effect
const slideIn = keyframes`
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

const slideOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0) rotate(0deg);
  }
  100% {
    opacity: 0;
    transform: translateX(-10px) rotate(-15deg);
  }
`;

const glow = keyframes`
 from{text-shadow:0px 0px 5px #fff,0px 0px 5px #614ad3;}
  to{text-shadow:0px 0px 20px #fff,0px 0px 20px #614ad3;}
`;

const DotCursor = styled.div<{ isVisible: boolean }>`
  position: fixed;
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: transform 0.3s ease;
  z-index: 9999;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;

const CircleCursor = styled.div<{ isHovered: boolean; isVisible: boolean }>`
  position: fixed;
  width: ${({ isHovered }) => (isHovered ? "40px" : "0px")};
  height: ${({ isHovered }) => (isHovered ? "40px" : "0px")};
  border: 2px solid white;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, transform 0.1s ease;
  z-index: 9998;
  mix-blend-mode: difference;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;

// Introductory text styling
const IntroText = styled.p`
  font-size: 1rem;
  margin: 0;
  color: #ccc;
  padding-left: 8rem;
  margin-bottom: 10px;

  span {
    color: white;
    font-weight: bold;
  }
`;

// Animated intro text using fade-in effect
const AnimatedIntroText = styled(IntroText)`
  animation: ${fadeIn} 1s ease-in-out;
  padding: 0 8rem;
  position: absolute;
  top: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  span {
    text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1),
      0px 0px 10px rgba(160, 153, 197, 0.51);
    color: #ccc;
  }
`;

// Container for titles
const TitleContainer = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
  margin-top: 1rem;
  width: 100%;
`;

// Background container for hover effect, growing from center
const InnerContainer = styled.div<{ active: boolean }>`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 0;
  transform: translateY(-50%);
  transition: height 0.5s ease, background-color 0.3s ease;
  z-index: 0;
  box-sizing: border-box;

  ${({ active }) =>
    active &&
    css`
      height: 100%; // Fill the box when active
    `}
`;
// Background container for hover effect, growing from center
const InnerContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
  align-items: top;
  box-sizing: border-box;
  padding-left: 18rem;
  padding-top: 1rem;
  padding-right: 20rem;
  position: relative;
`;
const InnerItem = styled.div<{ active: boolean }>`
  height: 100%;
  width: 100%;
  dislay: none;
  opacity: 0;
  transition: all 0.5s ease;
  font-size: 0.9rem;
  display: flex;

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
    `}
`;
const Arrow = styled.div<{ active: boolean }>`
  dislay: none;
  opacity: 0;
  transition: all 0.5s ease;

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
    `}
`;

// Main container
const Container = styled.div<{ isClicked: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  color: white;
  position: relative;
  overflow: hidden;
  cursor: none; // Hide default cursor
  transition: background 0.7s ease-in-out; // Smooth background transition

  /* Apply animation when clicked */
  ${({ isClicked }) =>
    isClicked &&
    css`
      animation: ${fadeOut} 0.5s ease forwards;
    `}
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  width: 100%;
  padding: 0.5rem 0;
  transition: color 0.3s, transform 0.3s ease-in-out;
  z-index: 1;
  display: flex;
`;

const TitleBox = styled.div`
  position: relative;
  cursor: none;
  width: 100%;
  transition: all 0.3s ease;
  height: 60px;
  padding-left: 8rem;
  color: #ccc;

  &:hover {
    height: 160px;
    color: white;

    ${Title} {
      /*       transform: translateX(10px);
 */
      text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1),
        0px 0px 10px rgba(160, 153, 197, 0.51);
    }
  }
`;

// Subtitle text styling
const Subtitle = styled.p`
  font-size: 1rem;
  color: #ccc;
  margin: 0;
  margin-top: 10px;
  padding-left: 8rem;
`;

const ItemText = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Tags = styled.div`
  margin-left: 20px;
  display: flex;
  height: fit-content;
  gap: 10px;
`;

// Subtitle text styling
const Tag = styled.span`
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 50px;
`;
const HeaderLinks = styled.div`
  display: flex;
  gap: 10px;
`;

// Subtitle text styling
const HeaderLink = styled.p`
  margin: 0;
`;

const TitleBg = styled.div<{
  active: boolean;
  title: string;
  x: number;
  y: number;
}>`
  pointer-events: none;
  opacity: 0;
  position: absolute;
  left: ${({ x }) => x - 200}px;
  top: ${({ y }) => y - 450}px;
  height: 500px;
  width: 400px;
  border-radius: 50%;
  filter: blur(50px);
  transition: opacity 1s ease-in-out, filter 1s ease-in-out,
    transform 1s ease-in-out;

  background: ${({ title }) =>
    title === "Web"
      ? "radial-gradient(circle, rgba(0, 255, 174, 0.53) 0%, rgba(218, 116, 0, 0) 70%)"
      : title === "Game"
      ? "radial-gradient(circle, rgba(0, 65, 204, 0.73) 0%, rgba(218, 116, 0, 0) 70%)"
      : title === "Mobile"
      ? "radial-gradient(circle, rgba(136, 0, 255, 0.75) 0%, rgba(168, 0, 120, 0.17) 70%)"
      : "radial-gradient(circle, rgba(0, 255, 174, 0.4) 0%, rgba(218, 116, 0, 0) 70%)"};

  ${({ active }) =>
    active
      ? css`
          opacity: 1;
          animation: ${fadeInBlur} 1s ease forwards;
        `
      : css`
          opacity: 0;
          animation: ${fadeOutBlur} 1s ease forwards;
        `}
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 5px;
  font-size: 1.5rem;
`;

const Emoji = styled.img<{ isVisible: boolean }>`
  width: 32px;
  height: 32px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  position: absolute;
  left: 100%;
  margin-left: 8px;
  animation: ${({ isVisible }) =>
    isVisible
      ? css`
          ${slideIn} 0.8s ease-in-out;
        `
      : css`
          ${slideOut} 0.2s ease-in-out;
        `};
`;

// Main App Component
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null); // Tracks active title
  const [dotCursorPosition, setDotCursorPosition] = useState({ x: 0, y: 0 });
  const [circleCursorPosition, setCircleCursorPosition] = useState({
    x: 0,
    y: 0,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      setIsCursorVisible(true);

      setDotCursorPosition({ x: e.clientX, y: e.clientY });

      animationFrame = requestAnimationFrame(() => {
        setTimeout(() => {
          setCircleCursorPosition({ x: e.clientX, y: e.clientY });
        }, 50); // Increased delay for smoother effect
      });
    };

    const handleMouseEnter = () => {
      setIsCursorVisible(true);
    };

    const handleMouseLeave = () => {
      setIsCursorVisible(false);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  // Data for each title
  const titleData: any = {
    Web: {
      text: "I build responsive and dynamic websites using modern technologies like React, TypeScript, and Next.js.",
      tags: ["React", "TypeScript", "Next.js"],
    },
    Game: {
      text: "Passionate about creating immersive game experiences using Unity, C#, and Augmented Reality.",
      tags: ["Unity", "C#", "Blender", "Aesprite"],
    },
    Mobile: {
      text: "Developing fast and interactive mobile apps with React Native and Kotlin for a seamless user experience.",
      tags: ["Kotlin", "Jetpack Compose", "Android"],
    },
  };

  const handleClick = (key: any) => {
    setIsClicked(true);

    setTimeout(() => {
      navigate(`/${key.toLowerCase()}`);
    }, 500);
  };

  return (
    <>
      <DotCursor
        isVisible={isCursorVisible}
        style={{
          left: `${dotCursorPosition.x}px`,
          top: `${dotCursorPosition.y}px`,
        }}
      />

      <CircleCursor
        isHovered={activeTab !== null}
        isVisible={isCursorVisible}
        style={{
          left: `${circleCursorPosition.x}px`,
          top: `${circleCursorPosition.y}px`,
        }}
      />
      <div className="bg">
        <Container isClicked={isClicked}>
          <AnimatedIntroText>
            <NameContainer>
              i'm{" "}
              <span
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ fontWeight: "bold", color: "white" }}
              >
                selim
              </span>
              <Emoji src="./emoji.png" alt="emoji" isVisible={isHovered} />
            </NameContainer>
            <HeaderLinks>
              <HeaderLink>about me</HeaderLink>
            </HeaderLinks>
          </AnimatedIntroText>
          <TitleContainer>
            <IntroText>i'm a</IntroText>
            <div>
              {Object.keys(titleData).map((title) => (
                <TitleBox
                  key={title}
                  onMouseEnter={() => setActiveTab(title)}
                  onMouseLeave={() => setActiveTab(null)}
                  onClick={() => handleClick(title)}
                >
                  <InnerContainer active={activeTab === title}>
                    <InnerContent>
                      <InnerItem active={activeTab === title}>
                        <ItemText>
                          <span>{titleData[title].text}</span>
                        </ItemText>
                        <Tags>
                          {titleData[title].tags.map((tag: any) => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </Tags>
                      </InnerItem>

                      <TitleBg
                        active={activeTab === title}
                        title={title}
                        x={dotCursorPosition.x}
                        y={dotCursorPosition.y}
                      />
                      <Arrow active={activeTab === title}>
                        <BsArrowRight size={32} />
                      </Arrow>
                    </InnerContent>
                  </InnerContainer>
                  <Title>{title}</Title>
                </TitleBox>
              ))}
            </div>
            <Subtitle>developer</Subtitle>
          </TitleContainer>
        </Container>
      </div>
    </>
  );
};

export default App;
