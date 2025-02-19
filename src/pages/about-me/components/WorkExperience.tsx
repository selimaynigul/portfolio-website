import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeIn } from "styles/animations";
import WorkCard from "./WorkCard";

gsap.registerPlugin(ScrollTrigger);

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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!cardRefs.current.length) return;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: "top 100%",
            end: "top 70%",
            scrub: true,
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        card,
        { opacity: 1, scale: 1 },
        {
          opacity: 0,
          scale: 0.8,
          duration: 1,
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: "top 15%",
            end: "top -15%",
            scrub: true,
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <WorkExperienceSection>
      {experiences.map((work, index) => (
        <CardWrapper
          ref={(el) => {
            if (el) cardRefs.current[index] = el;
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
