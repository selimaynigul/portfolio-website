import React, { useRef } from "react";
import styled from "styled-components";
import { fadeIn } from "styles/animations";
import WorkCard from "./WorkCard";
import useScrollFade from "hooks/useScrollFade";

const WorkExperienceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 2rem;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const CardWrapper = styled.div`
  opacity: 0;
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

const WorkExperience: React.FC<WorkExperienceProps> = ({ experiences }) => {
  const fadeRefs = useRef<(HTMLDivElement | null)[]>([]);
  useScrollFade({}, fadeRefs);

  return (
    <WorkExperienceSection>
      {experiences.map((work, index) => (
        <CardWrapper
          ref={(el) => {
            if (el) fadeRefs.current[index] = el;
          }}
          key={index}
        >
          <WorkCard work={work} />
        </CardWrapper>
      ))}
    </WorkExperienceSection>
  );
};

export default WorkExperience;
