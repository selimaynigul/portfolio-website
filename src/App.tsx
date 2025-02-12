import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

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

// Small dot cursor
const DotCursor = styled.div`
  position: fixed;
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: transform 0.3s ease;
  z-index: 9999;
`;

// Large hover circle cursor
const CircleCursor = styled.div<{ isHovered: boolean }>`
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
  width: 80%;
  display: flex;
  justify-content: space-between;
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
  /*   background: ${({ active }) =>
    active ? "#12121" : "#121212"}; // Change color when active */

  /*   background: #121212; */

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
  padding-left: 16rem;
  padding-top: 1rem;
  padding-right: 20rem;
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
  align-items: center;
`;

const TitleBox = styled.div`
  position: relative;
  cursor: none;
  overflow: hidden;
  width: 100%;
  transition: all 0.3s ease;
  height: 60px;
  padding-left: 8rem;
  color: #ccc;

  &:hover {
    height: 160px;
    color: white;

    ${Title} {
      /*       transform: scale(1.03); // Slightly enlarge the active title
 */
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

  const navigate = useNavigate();
  // Track instant dot cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setDotCursorPosition({ x: e.clientX, y: e.clientY });

      // Delayed movement for the larger circle cursor
      setTimeout(() => {
        setCircleCursorPosition({ x: e.clientX, y: e.clientY });
      }, 50); // Delay effect
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    console.log("Active Tab:", activeTab);

    // Remove previous background class
    document.body.classList.remove("bg-web", "bg-game", "bg-mobile");

    if (activeTab) {
      document.body.classList.add(`bg-${activeTab.toLowerCase()}`);
    } else {
      document.body.classList.remove("bg-web", "bg-game", "bg-mobile");
    }
  }, [activeTab]);

  // Data for each title
  const titleData: any = {
    Web: {
      text: "I build responsive and dynamic websites using modern technologies like React, TypeScript, and Next.js.",
      tags: ["React", "TypeScript", "Next.js"],
    },
    Game: {
      text: "Passionate about creating immersive game experiences using Unity, C#, and Augmented Reality.",
      tags: ["Unity", "C#", "AR"],
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
      {/* Small White Dot Cursor */}
      <DotCursor
        style={{
          left: `${dotCursorPosition.x}px`,
          top: `${dotCursorPosition.y}px`,
        }}
      />

      {/* Large Circle Cursor (Only Visible on Hover) */}
      <CircleCursor
        isHovered={activeTab !== null}
        style={{
          left: `${circleCursorPosition.x}px`,
          top: `${circleCursorPosition.y}px`,
        }}
      />
      <Container isClicked={isClicked}>
        <AnimatedIntroText>
          <div>
            i am <span>selim</span>.
          </div>
          <HeaderLinks>
            <HeaderLink>about me</HeaderLink>
          </HeaderLinks>
        </AnimatedIntroText>
        <TitleContainer>
          <IntroText>i am a</IntroText>
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
                    <Arrow active={activeTab === title}>
                      <BsArrowRight size={32} />
                    </Arrow>
                  </InnerContent>
                </InnerContainer>
                <Title>{title}</Title>
              </TitleBox>
            ))}
          </div>
          <Subtitle>developer.</Subtitle>
        </TitleContainer>
      </Container>
    </>
  );
};

export default App;
