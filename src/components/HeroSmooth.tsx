import React, { useRef, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "./ui/button";

interface HeroSmoothProps {
  title?: string[];
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroSmooth = ({
  title = ["Prévoyances", "Services", "adaptées"],
  ctaText = "Obtenir un devis",
  onCtaClick = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  },
}: HeroSmoothProps) => {
  const scope = useRef<HTMLDivElement>(null);
  const desktopImageRef = useRef<HTMLImageElement>(null);
  const mobileImageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP((gsap) => {
    if (!scope.current) return;

    // Ken Burns effect - scale 1 → 1.12 and y -2% → +2%
    const kbElements = scope.current.querySelectorAll(".kb");
    if (kbElements.length > 0) {
      gsap.fromTo(
        kbElements,
        { scale: 1, yPercent: -2 },
        {
          scale: 1.12,
          yPercent: 2,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.2,
          },
        },
      );
    }

    // Hero word animation
    const heroWords = scope.current.querySelectorAll(".hero-word");
    if (heroWords.length > 0) {
      gsap.from(heroWords, {
        yPercent: 120,
        opacity: 0,
        stagger: 0.06,
        ease: "power3.out",
        duration: 1,
      });
    }

    // Fade-in for images and video
    const mediaElements = [
      desktopImageRef.current,
      mobileImageRef.current,
      videoRef.current,
    ].filter(Boolean);
    if (mediaElements.length > 0) {
      gsap.from(mediaElements, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <section
      ref={scope}
      className="relative isolate h-[90vh] overflow-hidden bg-white"
    >
      {/* Desktop image */}
      <img
        ref={desktopImageRef}
        src="/cdn/hero-desk.webp"
        alt="Bright modern office handshake with emerald tint"
        className="kb absolute inset-0 h-full w-full object-cover hidden md:block"
      />

      {/* Mobile image */}
      <img
        ref={mobileImageRef}
        src="/cdn/hero-mob.webp"
        alt="Friendly business team handshake with emerald glow"
        className="kb absolute inset-0 h-full w-full object-cover md:hidden"
      />

      {/* Optional subtle video overlay desktop */}
      <video
        ref={videoRef}
        src="/cdn/hero-overlay.mp4"
        className="absolute inset-0 hidden h-full w-full object-cover mix-blend-overlay opacity-70 md:block"
        muted
        loop
        autoPlay
        playsInline
      />

      {/* Emerald → Sapphire overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/50 to-sapphire-600/40 mix-blend-multiply" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center gap-6 px-6 text-white">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight">
          {title.map((word, index) => (
            <span key={index} className="hero-word block">
              {word}
            </span>
          ))}
        </h1>

        <Button
          onClick={onCtaClick}
          className="mt-4 inline-flex items-center rounded-full bg-emerald-500 px-8 py-3 text-lg font-medium shadow-md transition active:scale-95 hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 w-fit"
        >
          {ctaText}
        </Button>
      </div>
    </section>
  );
};

export default HeroSmooth;
