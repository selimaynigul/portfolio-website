import Card from "components/Card";
import Tag from "components/Tag";
import { FaLocationDot } from "react-icons/fa6";
import styled from "styled-components";
import { fadeIn } from "styles/animations";

const AboutSection = styled.div`
  text-align: left;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 84px;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 768px) {
    box-sizing: border-box;
    width: 100%;
  }
`;

const Summary = () => {
  const skills = [
    "React",
    "Java",
    "C",
    "C++",
    "Next.js",
    "Kotlin",
    "Jetpack Compose",
    "JavaScript",
    "TypeScript",
    "Unity",
    "HTML",
    "CSS",
    "C#",
    "Git",
    "Bitbucket",
    "Blender",
    "Figma",
    "Aseprite",
  ];
  return (
    <AboutSection>
      <div style={{ display: "flex", gap: "1rem", height: "4rem" }}>
        <Card
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <FaLocationDot color="rgb(97, 97, 97)" />
          Based in Istanbul, Turkey
        </Card>
        <Card
          style={{
            background:
              "url(/landscapes/landscape_2.gif) center/cover no-repeat",
            width: "100%;",
          }}
        >
          <></>
        </Card>
      </div>
      <div style={{ margin: "0" }}>
        <Card>
          <p>
            I’m Selim Aynigül, a passionate developer with a strong background
            in software engineering. I specialize in web, mobile, and game
            development, always eager to explore new technologies. I thrive on
            solving challenges and crafting seamless user experiences.
          </p>
        </Card>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {skills.map((skill) => (
          <Tag key={skill}>{skill}</Tag>
        ))}
      </div>
    </AboutSection>
  );
};

export default Summary;
