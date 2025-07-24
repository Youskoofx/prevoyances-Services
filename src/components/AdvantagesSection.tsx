import React, { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { useGSAP, gsap } from "@/lib/gsap";
import { Shield, Clock, Users, Award, HeartHandshake } from "lucide-react";

interface Advantage {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface AdvantagesSectionProps {
  advantages?: Advantage[];
}

const AdvantagesSection = ({
  advantages = defaultAdvantages,
}: AdvantagesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap) => {
    if (
      sectionRef.current &&
      typeof window !== "undefined" &&
      window.ScrollTrigger
    ) {
      const { ScrollTrigger } = gsap;

      // Timeline horizontale avec pin + scrub
      if (timelineRef.current && cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".advantage-card");

        gsap.to(cards, {
          xPercent: -100 * (cards.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (cards.length - 1),
            end: () => "+=" + (cardsRef.current?.offsetWidth || 0),
          },
        });
      }

      // Fade-up animation pour les cartes
      gsap.fromTo(
        ".advantage-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Animation des icônes SVG (DrawSVG effect simulé)
      advantages.forEach((_, index) => {
        const iconElement = document.querySelector(`.advantage-icon-${index}`);
        if (iconElement) {
          gsap.fromTo(
            iconElement,
            { scale: 0, rotation: -180 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: iconElement,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        }
      });

      return () => {
        // Clean up ScrollTrigger instances
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }

    // Fallback animation if ScrollTrigger is not available
    return () => {};
  }, []);

  return (
    <section
      ref={sectionRef}
      id="advantages"
      className="py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-sora">
            Pourquoi choisir{" "}
            <span className="text-emerald">prevoyancesservices</span> ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les avantages qui font de nous le leader de l'assurance
            digitale
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          <div ref={cardsRef} className="flex gap-8 w-max">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="advantage-card flex-shrink-0 w-80 h-96 backdrop-blur-lg bg-white/70 border border-gray-100 shadow-xl/10 hover:shadow-xl/20 transition-shadow duration-300 rounded-2xl p-8"
              >
                <div className="text-center h-full flex flex-col justify-center">
                  <div
                    className={`advantage-icon-${index} w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${advantage.color} flex items-center justify-center shadow-lg`}
                  >
                    {advantage.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-sora">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const defaultAdvantages: Advantage[] = [
  {
    icon: <Shield className="w-10 h-10 text-white" />,
    title: "Protection Complète",
    description:
      "Couverture étendue pour tous vos besoins d'assurance avec des garanties adaptées à votre profil.",
    color: "from-emerald to-sapphire",
  },
  {
    icon: <Clock className="w-10 h-10 text-white" />,
    title: "Service 24/7",
    description:
      "Assistance disponible à tout moment, jour et nuit, pour vous accompagner en cas de besoin.",
    color: "from-sapphire to-neon",
  },
  {
    icon: <Users className="w-10 h-10 text-white" />,
    title: "Conseillers Experts",
    description:
      "Équipe de professionnels dédiés à votre réussite avec un accompagnement personnalisé.",
    color: "from-neon to-emerald",
  },
  {
    icon: <Award className="w-10 h-10 text-white" />,
    title: "Tarifs Compétitifs",
    description:
      "Les meilleures offres du marché garanties avec un rapport qualité-prix exceptionnel.",
    color: "from-emerald to-gold",
  },
  {
    icon: <HeartHandshake className="w-10 h-10 text-white" />,
    title: "Accompagnement Personnalisé",
    description:
      "Solutions sur-mesure adaptées à votre profil et à vos besoins spécifiques.",
    color: "from-gold to-sapphire",
  },
];

export default AdvantagesSection;
