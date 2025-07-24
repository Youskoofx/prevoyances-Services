import React, { useRef, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import { useGSAP, gsap } from "@/lib/gsap";

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface TrustpilotCarouselProps {
  reviews?: Review[];
}

const TrustpilotCarousel = ({
  reviews = defaultReviews,
}: TrustpilotCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll functionality
  useGSAP(
    (gsap) => {
      if (cardsRef.current && cardsRef.current.children.length > 0) {
        // Clone the first item and append it to the end for infinite loop
        const firstCard = cardsRef.current.children[0].cloneNode(true);
        cardsRef.current.appendChild(firstCard);

        // Calculate the width of a single card + gap
        const cardWidth = cardsRef.current.children[0].clientWidth;
        const gap = 24; // matches the gap-6 (1.5rem = 24px)
        const totalWidth = cardWidth + gap;

        // Create the animation
        const tl = gsap.timeline({
          repeat: -1,
          defaults: { ease: "none" },
        });

        // Animate the carousel
        tl.to(cardsRef.current, {
          x: `-=${totalWidth * reviews.length}px`,
          duration: reviews.length * 5, // 5 seconds per card
          ease: "linear",
        });

        // Reset position instantly but invisibly
        tl.set(cardsRef.current, { x: 0 });

        // Pause on hover
        carouselRef.current?.addEventListener("mouseenter", () => {
          tl.pause();
        });

        carouselRef.current?.addEventListener("mouseleave", () => {
          tl.play();
        });

        return () => {
          tl.kill();
        };
      }
    },
    [reviews.length],
  );

  return (
    <div className="bg-gray100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ce que nos clients disent
          </h2>
          <div className="flex justify-center items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-6 h-6 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <p className="text-lg text-gray-600">
            Plus de 2000 avis vérifiés sur Trustpilot
          </p>
        </div>

        <div ref={carouselRef} className="overflow-hidden">
          <div ref={cardsRef} className="flex gap-6">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="flex-none w-full md:w-[350px] backdrop-blur-md bg-white/90 border border-gray-100 shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{review.text}"</p>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{review.author}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const defaultReviews: Review[] = [
  {
    id: "1",
    author: "Marie L.",
    rating: 5,
    text: "Un service client exceptionnel. Mon conseiller a pris le temps de m'expliquer toutes les options et de trouver la solution parfaite pour ma situation.",
    date: "15/05/2023",
  },
  {
    id: "2",
    author: "Thomas B.",
    rating: 5,
    text: "Processus de souscription simple et rapide. J'ai pu obtenir mon contrat en moins de 48h. Je recommande vivement !",
    date: "03/06/2023",
  },
  {
    id: "3",
    author: "Sophie M.",
    rating: 4,
    text: "Très satisfaite de la qualité des garanties proposées. Le rapport qualité-prix est excellent comparé à mon ancienne assurance.",
    date: "22/04/2023",
  },
  {
    id: "4",
    author: "Jean-Pierre D.",
    rating: 5,
    text: "Suite à un sinistre, j'ai été pris en charge rapidement et efficacement. Le remboursement a été effectué dans les délais annoncés.",
    date: "10/07/2023",
  },
  {
    id: "5",
    author: "Camille F.",
    rating: 5,
    text: "L'application mobile est très pratique pour suivre mes contrats et déclarer un sinistre. Interface intuitive et fonctionnelle.",
    date: "29/05/2023",
  },
];

export default TrustpilotCarousel;
