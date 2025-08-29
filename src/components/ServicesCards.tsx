import React, { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { useGSAP, gsap } from "@/lib/gsap";
import { Shield, Car, Heart, Briefcase, PawPrint } from "lucide-react";
import { Button } from "./ui/button";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  href: string;
  buttonText: string;
}

interface ServicesCardsProps {
  services?: Service[];
}

const ServicesCards = ({ services = defaultServices }: ServicesCardsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (gsap) => {
      if (sectionRef.current && cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".service-card");

        // GSAP fade animation for cards with ScrollTrigger
        if (typeof window !== "undefined" && window.ScrollTrigger) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          );
        }

        // Subtle hover effects
        cards.forEach((card) => {
          const handleMouseEnter = () => {
            gsap.to(card, {
              y: -6,
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              y: 0,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              duration: 0.3,
              ease: "power2.out",
            });
          };

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);
        });
      }
    },
    [],
    sectionRef,
  );

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold text-ink mb-4 font-poppins"
            style={{ letterSpacing: "-0.02em", fontWeight: 800 }}
          >
            Nos assurances
          </h2>
          <p
            className="text-xl text-muted max-w-2xl mx-auto font-inter"
            style={{ lineHeight: "1.65" }}
          >
            Des solutions simples et adaptées à chaque profil
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <Card
              key={index}
              className="service-card bg-white border border-line hover:border-primary/20 transition-all duration-300 cursor-pointer group overflow-hidden"
              style={{
                borderRadius: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent className="p-0">
                <div
                  className="relative overflow-hidden"
                  style={{ height: "180px", borderRadius: "16px 16px 0 0" }}
                >
                  <img
                    src={service.image}
                    alt={getServiceAltText(index)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width="400"
                    height="180"
                  />
                </div>
                <div className="p-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <div className="text-primary">{service.icon}</div>
                  </div>
                  <h3
                    className="text-xl font-bold text-ink mb-3 font-poppins"
                    style={{ letterSpacing: "-0.02em", fontWeight: 800 }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-muted font-inter mb-6"
                    style={{ lineHeight: "1.65" }}
                  >
                    {service.description}
                  </p>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold font-inter transition-all duration-300"
                    style={{ borderRadius: "9999px", height: "48px" }}
                    onClick={() => {
                      window.location.href = service.href;
                    }}
                  >
                    {service.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const defaultServices: Service[] = [
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Santé & Mutuelle",
    description:
      "Remboursements renforcés en optique, dentaire et hospitalisation.",
    image:
      "https://images.unsplash.com/photo-1588776814546-ec2f22bb6f2e?ixlib=rb-4.0.3&q=80&w=1080&fit=crop",
    href: "/assurances#sante",
    buttonText: "Découvrir",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Prévoyance",
    description:
      "Maintien de revenus et protection de vos proches en cas d'aléas.",
    image:
      "https://images.unsplash.com/photo-1620228885847-01cf7af5120a?ixlib=rb-4.0.3&q=80&w=1080&fit=crop",
    href: "/assurances#prevoyance",
    buttonText: "En savoir plus",
  },
  {
    icon: <Car className="w-5 h-5" />,
    title: "Auto & Habitation",
    description:
      "Couvrez vos biens contre les sinistres du quotidien, simplement.",
    image:
      "https://images.unsplash.com/photo-1604014237800-1adfcaad4191?ixlib=rb-4.0.3&q=80&w=1080&fit=crop",
    href: "/contact",
    buttonText: "Obtenir un devis",
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    title: "Professionnels",
    description:
      "RC Pro, multirisque et protection juridique pour votre activité.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=80&w=1080&fit=crop",
    href: "/assurances#pro",
    buttonText: "Découvrir",
  },
  {
    icon: <PawPrint className="w-5 h-5" />,
    title: "Animaux",
    description:
      "Frais vétérinaires, hospitalisation et prévention pour vos compagnons.",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&q=80&w=1080&fit=crop",
    href: "/assurances#animaux",
    buttonText: "En savoir plus",
  },
];

// Alt text for service images
const getServiceAltText = (index: number): string => {
  const altTexts = [
    "Consultation médicale - Assurance Santé & Mutuelle",
    "Protection familiale - Assurance Prévoyance",
    "Voiture et maison - Assurance Auto & Habitation",
    "Bureau professionnel - Assurance Professionnels",
    "Chien et vétérinaire - Assurance Animaux",
  ];
  return altTexts[index] || "Service d'assurance Prévoyance Services";
};

export default ServicesCards;
