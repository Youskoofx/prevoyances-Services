import React, { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
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

const AdvantagesSection = () => {
  return (
    <section className="bg-emerald-500 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-sora">
          Contactez-nous et protégez votre avenir
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Nos conseillers sont à votre disposition pour vous accompagner
        </p>
        <Button className="bg-white text-emerald-500 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full">
          Prendre rendez-vous
        </Button>
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
