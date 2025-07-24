import React, { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap";

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  stagger?: number;
  fadeUp?: boolean;
  className?: string;
}

/**
 * A reusable component that animates its children when they enter the viewport
 * using GSAP animations with optional stagger and fade-up effects.
 */
const AnimatedSection = ({
  children,
  delay = 0,
  stagger = 0.1,
  fadeUp = true,
  className = "",
}: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (gsap) => {
      // Set initial state
      if (fadeUp) {
        gsap.set(childrenRef.current?.children || [], {
          y: 30,
          opacity: 0,
        });
      }

      // Create ScrollTrigger animation if available
      if (typeof window !== "undefined" && window.ScrollTrigger) {
        const { ScrollTrigger } = gsap;

        // Create animation that triggers when scrolled into view
        gsap.to(childrenRef.current?.children || [], {
          y: 0,
          opacity: 1,
          stagger: stagger,
          duration: 0.8,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        });

        return () => {
          // Clean up ScrollTrigger instances
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      } else {
        // Fallback animation if ScrollTrigger is not available
        gsap.to(childrenRef.current?.children || [], {
          y: 0,
          opacity: 1,
          stagger: stagger,
          duration: 0.8,
          delay: delay,
          ease: "power3.out",
        });
      }

      return () => {};
    },
    [delay, stagger, fadeUp],
  );

  return (
    <div ref={sectionRef} className={className}>
      <div ref={childrenRef}>{children}</div>
    </div>
  );
};

export default AnimatedSection;
