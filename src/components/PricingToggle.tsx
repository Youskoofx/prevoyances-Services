import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useGSAP, gsap } from "@/lib/gsap";
import { Check, Star } from "lucide-react";

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  popular?: boolean;
  color: string;
}

interface PricingToggleProps {
  plans?: PricingPlan[];
}

const PricingToggle = ({ plans = defaultPlans }: PricingToggleProps) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap) => {
    if (sectionRef.current && cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".pricing-card");

      // Fade-up animation with stagger
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }
  }, []);

  const handleToggle = () => {
    setIsAnnual(!isAnnual);

    // Animate price changes
    if (cardsRef.current) {
      const prices = cardsRef.current.querySelectorAll(".price-amount");
      gsap.fromTo(
        prices,
        { scale: 1.1, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" },
      );
    }

    // Flip animation for popular badge if available
    if (typeof window !== "undefined" && window.Flip && highlightRef.current) {
      const state = window.Flip.getState(highlightRef.current);
      window.Flip.from(state, {
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-24 bg-gradient-to-br from-white to-gray-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-sora">
            Nos <span className="text-emerald">Tarifs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choisissez la formule qui vous convient le mieux
          </p>

          {/* Toggle Switch */}
          <div
            ref={toggleRef}
            className="flex items-center justify-center space-x-4 mb-8"
          >
            <span
              className={`text-lg font-medium ${!isAnnual ? "text-emerald" : "text-gray-500"}`}
            >
              Mensuel
            </span>
            <button
              onClick={handleToggle}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none ${
                isAnnual ? "bg-emerald" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  isAnnual ? "translate-x-8" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`text-lg font-medium ${isAnnual ? "text-emerald" : "text-gray-500"}`}
            >
              Annuel
              <span className="ml-2 text-sm bg-accent text-gray-800 px-2 py-1 rounded-full">
                -20%
              </span>
            </span>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`pricing-card relative bg-white/70 backdrop-blur-lg shadow-xl/10 hover:shadow-xl/20 border-0 transition-all duration-300 ${
                plan.popular ? "ring-2 ring-emerald scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div
                  ref={highlightRef}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald to-sapphire text-white px-6 py-2 rounded-full text-sm font-medium flex items-center"
                >
                  <Star className="w-4 h-4 mr-1" />
                  Plus populaire
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <h3 className="text-2xl font-bold text-gray-900 font-sora mb-2">
                  {plan.name}
                </h3>
                <div className="price-amount">
                  <span className="text-4xl font-bold text-gray-900">
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}€
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{isAnnual ? "an" : "mois"}
                  </span>
                </div>
                {isAnnual && (
                  <p className="text-sm text-green-600 mt-2">
                    Économisez {plan.monthlyPrice * 12 - plan.annualPrice}€ par
                    an
                  </p>
                )}
              </CardHeader>

              <CardContent className="pt-4">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-emerald mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-medium py-3 transition-all duration-300`}
                >
                  Choisir ce plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const defaultPlans: PricingPlan[] = [
  {
    name: "Essentiel",
    monthlyPrice: 29,
    annualPrice: 279,
    features: [
      "Assurance habitation de base",
      "Responsabilité civile",
      "Assistance 24h/24",
      "Garantie vol et incendie",
      "Support par email",
    ],
    color: "from-emerald to-sapphire",
  },
  {
    name: "Confort",
    monthlyPrice: 49,
    annualPrice: 469,
    popular: true,
    features: [
      "Tout du plan Essentiel",
      "Assurance auto incluse",
      "Garanties étendues",
      "Assistance juridique",
      "Support téléphonique prioritaire",
      "Remboursement accéléré",
    ],
    color: "from-sapphire to-neon",
  },
  {
    name: "Premium",
    monthlyPrice: 79,
    annualPrice: 759,
    features: [
      "Tout du plan Confort",
      "Assurance santé premium",
      "Prévoyance complète",
      "Conseiller dédié",
      "Garantie tous risques",
      "Services concierge",
      "Couverture internationale",
    ],
    color: "from-neon to-emerald",
  },
];

export default PricingToggle;
