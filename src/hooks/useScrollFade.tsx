import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollFadeProps {
  enterStart?: string;
  enterEnd?: string;
  leaveStart?: string;
  leaveEnd?: string;
  duration?: number;
  scrub?: boolean;
}

const useScrollFade = (
  {
    enterStart = "top 110%",
    enterEnd = "top 70%",
    leaveStart = "top 15%",
    leaveEnd = "top -25%",
    duration = 1,
    scrub = true,
  }: UseScrollFadeProps,
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>
) => {
  useEffect(() => {
    if (!refs.current.length) return;

    refs.current.forEach((ref) => {
      if (!ref) return;

      gsap.fromTo(
        ref,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration,
          immediateRender: true,
          scrollTrigger: {
            trigger: ref,
            start: enterStart,
            end: enterEnd,
            scrub,
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ref,
        { opacity: 1, scale: 1 },
        {
          opacity: 0,
          scale: 0.8,
          duration,
          immediateRender: true,
          scrollTrigger: {
            trigger: ref,
            start: leaveStart,
            end: leaveEnd,
            scrub,
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [enterStart, enterEnd, duration, scrub, refs]);
};

export default useScrollFade;
