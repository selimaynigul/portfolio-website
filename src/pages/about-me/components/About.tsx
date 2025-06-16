import Card from "components/Card";
import Tag from "components/Tag";
import { FaLocationDot } from "react-icons/fa6";
import styled from "styled-components";
import { motion } from "framer-motion";

const AboutSection = styled(motion.div)`
  text-align: left;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 84px;

  @media (max-width: 768px) {
    box-sizing: border-box;
    width: 100%;
  }
`;

const MotionDiv = styled(motion.div)`
  width: 100%;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

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
    <AboutSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MotionDiv variants={itemVariants}>
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
              width: "100%",
            }}
          >
            <></>
          </Card>
        </div>
      </MotionDiv>

      <MotionDiv variants={itemVariants}>
        <Card>
          <p>
            I’m Selim Aynigül, a passionate developer with a strong background
            in software engineering. I specialize in web, mobile, and game
            development, always eager to explore new technologies. I thrive on
            solving challenges and crafting seamless user experiences.
          </p>
        </Card>
      </MotionDiv>

      <MotionDiv variants={itemVariants}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {skills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
      </MotionDiv>
    </AboutSection>
  );
};

export default Summary;
