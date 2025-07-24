import React, { useRef } from "react";
import { Button } from "./ui/button";
import { useGSAP, gsap } from "@/lib/gsap";

interface ParallaxSectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  backgroundImage?: string;
}

const ParallaxSection = ({
  title = "Devenez partenaire",
  description = "Rejoignez notre réseau de partenaires et bénéficiez d'avantages exclusifs pour développer votre activité.",
  ctaText = "Nous rejoindre",
  onCtaClick = () => {},
  backgroundImage = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap) => {
    if (typeof window !== "undefined" && window.ScrollTrigger) {
      const { ScrollTrigger } = gsap;

      // Create parallax effect
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Image moves slower (parallax effect)
      tl.to(
        imageRef.current,
        {
          y: "-20%",
          ease: "none",
        },
        0,
      );

      // Content moves faster
      tl.to(
        contentRef.current,
        {
          y: "25%",
          ease: "none",
        },
        0,
      );

      return () => {
        // Clean up ScrollTrigger instances
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }

    return () => {};
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32 bg-gray-50"
    >
      {/* Background image with parallax effect */}
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div
          ref={contentRef}
          className="max-w-lg mx-auto text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <p className="text-lg mb-8">{description}</p>
          <Button
            onClick={onCtaClick}
            className="bg-white text-gray900 hover:bg-gray-100 px-8 py-3 rounded-md text-lg"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParallaxSection;
