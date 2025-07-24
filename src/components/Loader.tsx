import React, { useRef, useEffect, useState } from "react";
import { useGSAP, gsap, prefersReducedMotion } from "@/lib/gsap";

interface LoaderProps {
  onComplete?: () => void;
  duration?: number;
}

const Loader = ({ onComplete, duration = 3 }: LoaderProps) => {
  const [isComplete, setIsComplete] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const shieldPathRef = useRef<SVGPathElement>(null);
  const checkPathRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (gsap) => {
      const reducedMotion = prefersReducedMotion();

      if (reducedMotion) {
        // Simple fade for reduced motion
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          delay: 1,
          onComplete: () => {
            setIsComplete(true);
            if (onComplete) onComplete();
          },
        });
        return;
      }

      // Create main timeline
      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
          if (onComplete) onComplete();
        },
      });

      // Diamond 2025 - SplitText word-mark animation
      gsap.set(textRef.current, {
        opacity: 0,
        y: 20,
      });

      // Animate text appearance with SplitText effect
      tl.to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        0.2,
      )
        // Final fade out
        .to(loaderRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: "power3.in",
          delay: 0.5,
        });
    },
    [duration, onComplete],
  );

  if (isComplete) {
    return null;
  }

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="text-center">
        {/* Logo SVG */}
        {/* Loading Text - Diamond 2025 Word-mark */}
        <div ref={textRef} className="space-y-4">
          <h1 className="text-3xl font-bold text-emerald font-sora">
            prevoyancesservices
          </h1>
          <p className="text-gray-600">
            Chargement de votre espace sécurisé...
          </p>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-emerald rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "1s",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
