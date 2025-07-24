import React, { useRef, useEffect } from "react";
import {
  useGSAP,
  gsap,
  createSplitText,
  prefersReducedMotion,
} from "@/lib/gsap";

interface SplitTextExampleProps {
  text?: string;
  type?: "chars" | "words" | "lines" | "3d";
  staggerValue?: number;
  className?: string;
  color?: string;
  is3D?: boolean;
}

const SplitTextExample = ({
  text = "Prévoyance Services 3.0",
  type = "chars",
  staggerValue = 0.03,
  className = "",
  color = "text-gray-900",
  is3D = false,
}: SplitTextExampleProps) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Enhanced SplitText implementation with 3D support
  useGSAP(
    (gsap) => {
      if (!textRef.current) return;
      const reducedMotion = prefersReducedMotion();

      // Try to use SplitText plugin if available
      let splitText;
      let elements;

      // Create a SplitText instance if available
      splitText = createSplitText(textRef.current, {
        type: "chars,words,lines",
        linesClass: "split-line",
        charsClass: "split-char",
        wordsClass: "split-word",
      });

      if (splitText) {
        // Use SplitText plugin
        elements =
          type === "chars"
            ? splitText.chars
            : type === "words"
              ? splitText.words
              : splitText.lines;
      } else {
        // Fallback to manual splitting
        if (type === "chars") {
          const chars = textRef.current.innerText.split("");
          textRef.current.innerHTML = "";
          chars.forEach((char) => {
            const span = document.createElement("span");
            span.className = "inline-block split-char";
            span.textContent = char === " " ? "\u00A0" : char;
            textRef.current?.appendChild(span);
          });
          elements = textRef.current.children;
        } else if (type === "words") {
          const words = textRef.current.innerText.split(" ");
          textRef.current.innerHTML = "";
          words.forEach((word) => {
            const span = document.createElement("span");
            span.className = "inline-block mr-[0.25em] split-word";
            span.textContent = word;
            textRef.current?.appendChild(span);
          });
          elements = textRef.current.children;
        } else {
          // For lines, we'll just animate the whole text
          elements = [textRef.current];
        }
      }

      // Create a timeline for the animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Different animation based on type
      if (is3D && !reducedMotion) {
        // 3D animation
        gsap.set(elements, {
          opacity: 0,
          rotationX: 90,
          z: -100,
          transformPerspective: 400,
          transformOrigin: "0% 50% -50",
        });

        tl.to(elements, {
          opacity: 1,
          rotationX: 0,
          z: 0,
          stagger: staggerValue,
          duration: 1.2,
          ease: "power4.out",
        });

        // Add some subtle rotation to the container for depth
        if (containerRef.current) {
          tl.fromTo(
            containerRef.current,
            { rotationY: -5 },
            {
              rotationY: 5,
              duration: 6,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            },
            0,
          );
        }
      } else {
        // Standard animation
        const direction = type === "lines" ? 40 : 60;

        gsap.set(elements, {
          y: reducedMotion ? 0 : direction,
          opacity: reducedMotion ? 0.5 : 0,
        });

        tl.to(elements, {
          y: 0,
          opacity: 1,
          stagger: staggerValue,
          duration: reducedMotion ? 0.5 : 0.8,
        });
      }

      return () => {
        tl.kill();
        if (splitText) splitText.revert();
      };
    },
    [text, type, staggerValue, is3D],
  );

  return (
    <div
      ref={containerRef}
      className={`perspective-1000 ${is3D ? "will-change-transform" : ""}`}
    >
      <h1
        ref={textRef}
        className={`text-4xl md:text-5xl font-bold ${color} mb-6 ${className}`}
        style={is3D ? { perspective: "1000px" } : undefined}
      >
        {text}
      </h1>
    </div>
  );
};

export default SplitTextExample;
