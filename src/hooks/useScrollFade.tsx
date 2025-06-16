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
  staggerY?: number;
}

const useScrollFade = (
  {
    enterStart = "top 100%",
    enterEnd = "top 60%",
    leaveStart = "top 0%",
    leaveEnd = "top -40%",
    duration = 1,
    scrub = true,
    staggerY = 20,
  }: UseScrollFadeProps,
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>
) => {
  useEffect(() => {
    if (!refs.current.length) return;

    refs.current.forEach((ref, index) => {
      if (!ref) return;

      gsap.fromTo(
        ref,
        { opacity: 0, scale: 0.9, y: Math.floor((index / 2) % 3) * staggerY },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration,
          immediateRender: false,
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
        { opacity: 1, scale: 1, y: 0 },
        {
          opacity: 0,
          scale: 0.9,
          y: Math.floor((index / 2) % 3) * staggerY,
          duration,
          immediateRender: false,
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
  }, [enterStart, enterEnd, duration, scrub, staggerY, refs]);
};

export default useScrollFade;
