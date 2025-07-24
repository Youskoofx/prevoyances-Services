import React, { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { useGSAP, gsap } from "@/lib/gsap";
import { Shield, Car, Home, Heart, Briefcase } from "lucide-react";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  image?: string;
}

interface ServicesCardsProps {
  services?: Service[];
}

const ServicesCards = ({ services = defaultServices }: ServicesCardsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap) => {
    if (sectionRef.current && cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".service-card");

      // Fade-up animation with stagger
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, rotationX: 15 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Add tilt effect on hover
      cards.forEach((card) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;

          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-sora">
            Nos <span className="text-emerald">Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de produits d'assurance adaptés à
            tous vos besoins
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {services.map((service, index) => (
            <Card
              key={index}
              className="service-card bg-white/70 backdrop-blur-lg shadow-xl/10 hover:shadow-xl/20 border-0 transition-all duration-300 cursor-pointer group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <CardContent className="p-0 h-full flex flex-col">
                {service.image && (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div
                      className={`absolute top-4 left-4 w-12 h-12 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}
                    >
                      {service.icon}
                    </div>
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col justify-center text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-sora">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {service.description}
                  </p>
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
    icon: <Heart className="w-8 h-8 text-white" />,
    title: "Assurance Santé",
    description: "Prenez soin de votre santé avec nos mutuelles performantes.",
    color: "from-neon to-emerald",
    image: "/cdn/service-sante.webp",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-white" />,
    title: "TNS",
    description:
      "Solutions dédiées aux travailleurs non-salariés et indépendants.",
    color: "from-gold to-sapphire",
    image: "/cdn/service-tns.webp",
  },
  {
    icon: <Home className="w-8 h-8 text-white" />,
    title: "Assurance Habitation",
    description:
      "Protégez votre logement et vos biens avec nos garanties complètes.",
    color: "from-emerald to-sapphire",
    image: "/cdn/service-home.webp",
  },
  {
    icon: <Shield className="w-8 h-8 text-white" />,
    title: "RC Pro",
    description:
      "Responsabilité civile professionnelle pour sécuriser votre activité.",
    color: "from-emerald to-gold",
    image: "/cdn/service-rcpro.webp",
  },
  {
    icon: <Heart className="w-8 h-8 text-white" />,
    title: "Assurance Animaux",
    description:
      "Protégez vos compagnons à quatre pattes avec nos formules adaptées.",
    color: "from-sapphire to-neon",
    image: "/cdn/service-pet.webp",
  },
];

export default ServicesCards;
