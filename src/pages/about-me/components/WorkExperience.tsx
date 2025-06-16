import React, { useRef } from "react";
import styled from "styled-components";
import WorkCard from "./WorkCard";
import { motion } from "framer-motion";
import useScrollFade from "hooks/useScrollFade";

const WorkExperienceSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 2rem;
`;

const MotionCardWrapper = styled(motion.div)`
  width: 100%;
`;

const GSAPWrapper = styled.div`
  width: 100%;
`;

interface WorkExperienceProps {
  experiences: {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
    tags: string[];
  }[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const WorkExperience: React.FC<WorkExperienceProps> = ({ experiences }) => {
  const fadeRefs = useRef<(HTMLDivElement | null)[]>([]);
  useScrollFade({}, fadeRefs);

  return (
    <WorkExperienceSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {experiences.map((work, index) => (
        <MotionCardWrapper key={index} variants={cardVariants}>
          <GSAPWrapper
            ref={(el) => {
              if (el) fadeRefs.current[index] = el;
            }}
          >
            <WorkCard work={work} />
          </GSAPWrapper>
        </MotionCardWrapper>
      ))}
    </WorkExperienceSection>
  );
};

export default WorkExperience;
