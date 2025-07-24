import React, { useRef, useEffect } from "react";
import { Button } from "./ui/button";
import {
  useGSAP,
  gsap,
  createSplitText,
  createTimeline,
  prefersReducedMotion,
} from "@/lib/gsap";
import { ChevronDown } from "lucide-react";

interface HeroTimelineProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  videoBackground?: string;
}

const HeroTimeline = ({
  title = "Prévoyance Services 3.0",
  subtitle = "Des solutions d'assurance adaptées à vos besoins avec un accompagnement personnalisé",
  ctaText = "Obtenir mon devis",
  onCtaClick = () => {},
  videoBackground = "https://assets.mixkit.co/videos/preview/mixkit-white-abstract-geometric-animation-on-blue-background-34786-large.mp4",
}: HeroTimelineProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Handle scroll to next section
  const scrollToNextSection = () => {
    if (typeof window !== "undefined" && window.ScrollToPlugin) {
      const nextSection = heroRef.current?.nextElementSibling;
      if (nextSection) {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: nextSection, offsetY: 80 },
          ease: "power3.inOut",
        });
      }
    } else {
      // Fallback for when ScrollToPlugin is not available
      const nextSection = heroRef.current?.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Use GSAP for animations
  useGSAP((gsap) => {
    // Create a timeline for sequenced animations
    const tl = createTimeline(gsap, { defaults: { ease: "power3.out" } });
    const reducedMotion = prefersReducedMotion();

    // Advanced 3D SplitText animation for the title
    if (titleRef.current) {
      // Try to use SplitText plugin if available
      let chars;
      const splitText = createSplitText(titleRef.current, {
        type: "chars,words",
      });

      if (splitText) {
        // Use SplitText plugin
        chars = splitText.chars;
      } else {
        // Fallback to manual splitting
        const words = titleRef.current.innerText.split(" ");
        titleRef.current.innerHTML = "";

        words.forEach((word) => {
          const wordSpan = document.createElement("span");
          wordSpan.className = "inline-block mr-[0.25em] split-word";

          const chars = word.split("");
          chars.forEach((char) => {
            const span = document.createElement("span");
            span.className = "inline-block split-char";
            span.textContent = char;
            wordSpan.appendChild(span);
          });

          titleRef.current?.appendChild(wordSpan);
        });

        chars = titleRef.current.querySelectorAll(".split-char");
      }

      // Set initial state
      gsap.set(chars, {
        opacity: 0,
        rotationX: reducedMotion ? 0 : 90,
        z: reducedMotion ? 0 : -100,
        transformOrigin: "0% 50% -50",
      });

      // Animate each character with 3D effect
      tl.to(chars, {
        opacity: 1,
        rotationX: 0,
        z: 0,
        stagger: 0.03,
        duration: 1.2,
        ease: "power4.out",
      });
    }

    // Animate subtitle
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.8",
      );
    }

    // Animate the video background with gradient overlay
    if (videoRef.current) {
      tl.fromTo(
        videoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 },
        "-=1.5",
      );
    }

    // Animate the gradient overlay
    if (overlayRef.current) {
      // Create a subtle animation for the gradient
      gsap.to(overlayRef.current, {
        backgroundPosition: "200% 0%",
        duration: 15,
        repeat: -1,
        ease: "sine.inOut",
      });
    }

    // Elastic animation for CTA button with ripple effect
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.7",
      );

      // Add hover animation for the button
      ctaRef.current.addEventListener("mouseenter", () => {
        gsap.to(ctaRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
          backgroundPosition: "100% 0%",
        });
      });

      ctaRef.current.addEventListener("mouseleave", () => {
        gsap.to(ctaRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
          backgroundPosition: "0% 0%",
        });
      });
    }

    // Animate scroll cue with yoyo effect
    if (scrollCueRef.current) {
      tl.fromTo(
        scrollCueRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5",
      );

      // Create yoyo animation for the scroll cue
      gsap.to(scrollCueRef.current.querySelector(".chevron-icon"), {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut",
      });
    }

    return () => {
      // Cleanup
      tl.kill();
      if (splitText) splitText.revert();
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden min-h-[90vh] flex items-center perspective-1000"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoBackground} type="video/mp4" />
        </video>
        {/* Animated gradient overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-r from-[#13B88A]/80 via-[#2563EB]/60 to-[#13B88A]/80 bg-[length:200%_100%]"
          style={{ backgroundPosition: "0% 0%" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl font-bold mb-6 font-sora will-change-transform"
              style={{ perspective: "1000px" }}
            >
              {title}
            </h1>
            <p ref={subtitleRef} className="text-xl text-white/90 mb-8">
              {subtitle}
            </p>
            <Button
              ref={ctaRef}
              onClick={onCtaClick}
              className="bg-gradient-to-r from-[#13B88A] to-[#2563EB] hover:from-[#13B88A] hover:to-[#13B88A] text-white px-8 py-6 rounded-md text-lg font-medium relative overflow-hidden group transition-all duration-300 bg-[length:200%_100%]"
            >
              {/* Animated stripes for hover effect */}
              <span className="absolute inset-0 w-full h-full">
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent,10px,rgba(255,255,255,0.2)_10px,rgba(255,255,255,0.2)_20px)] transition-opacity duration-300"></span>
              </span>

              {/* Button text */}
              <span className="relative z-10">{ctaText}</span>

              {/* Ripple effect will be added with Framer Motion */}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll down cue */}
      <div
        ref={scrollCueRef}
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer flex flex-col items-center"
      >
        <span className="text-sm mb-2 opacity-80">Découvrir</span>
        <div className="chevron-icon bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors duration-300">
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default HeroTimeline;
