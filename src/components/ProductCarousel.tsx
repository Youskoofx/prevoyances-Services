import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface ProductCarouselProps {
  products?: Product[];
}

const ProductCarousel = ({
  products = defaultProducts,
}: ProductCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Initialize GSAP animations
  useGSAP((gsap) => {
    // Initial animation for title and controls
    gsap.from("h2.carousel-title", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".carousel-controls", {
      opacity: 0,
      x: 20,
      duration: 0.6,
      delay: 0.3,
      ease: "back.out",
    });

    // Animate cards on initial load
    gsap.from(".product-card", {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.5,
    });

    return () => {
      // Cleanup animations if needed
    };
  }, []);

  // Check if we can scroll in either direction
  useEffect(() => {
    const checkScrollable = () => {
      if (!carouselRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setScrollPosition(scrollLeft);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", checkScrollable);
      checkScrollable();
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("scroll", checkScrollable);
      }
    };
  }, [products]);

  // Handle mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollPosition(carouselRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;

    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    carouselRef.current.scrollLeft = scrollPosition - walk;
  };

  // Handle scroll buttons with GSAP animation
  const scrollLeftHandler = () => {
    if (!carouselRef.current || !gsap) return;

    gsap.to(carouselRef.current, {
      scrollLeft: carouselRef.current.scrollLeft - 300,
      duration: 0.8,
      ease: "power2.out",
    });

    // Animate the button press
    gsap.to(".scroll-left-btn", {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
  };

  const scrollRightHandler = () => {
    if (!carouselRef.current || !gsap) return;

    gsap.to(carouselRef.current, {
      scrollLeft: carouselRef.current.scrollLeft + 300,
      duration: 0.8,
      ease: "power2.out",
    });

    // Animate the button press
    gsap.to(".scroll-right-btn", {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
  };

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="carousel-title text-3xl font-bold text-gray-900">
            Nos produits d'assurance
          </h2>
          <div className="carousel-controls flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeftHandler}
              disabled={!canScrollLeft}
              className="scroll-left-btn rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollRightHandler}
              disabled={!canScrollRight}
              className="scroll-right-btn rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div ref={cardsRef} className="flex space-x-6">
            {products.map((product, index) => (
              <div key={product.id} className="flex-none w-[300px] snap-center">
                <Card
                  className="product-card h-full transition-all duration-300 hover:shadow-lg bg-white border border-gray-100"
                  onMouseEnter={(e) => {
                    if (gsap) {
                      gsap.to(e.currentTarget, {
                        y: -10,
                        boxShadow:
                          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        duration: 0.3,
                        ease: "power2.out",
                      });
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (gsap) {
                      gsap.to(e.currentTarget, {
                        y: 0,
                        boxShadow:
                          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                        duration: 0.3,
                        ease: "power2.out",
                      });
                    }
                  }}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      onLoad={(e) => {
                        if (gsap) {
                          gsap.fromTo(
                            e.currentTarget,
                            { scale: 1.1, opacity: 0 },
                            {
                              scale: 1,
                              opacity: 1,
                              duration: 0.8,
                              ease: "power2.out",
                            },
                          );
                        }
                      }}
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <Button
                      className="bg-primary hover:bg-primaryDark text-white w-full group"
                      onMouseEnter={(e) => {
                        if (gsap) {
                          gsap.to(e.currentTarget.querySelector("svg"), {
                            x: 5,
                            duration: 0.3,
                            ease: "power2.out",
                          });
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (gsap) {
                          gsap.to(e.currentTarget.querySelector("svg"), {
                            x: 0,
                            duration: 0.3,
                            ease: "power2.out",
                          });
                        }
                      }}
                    >
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Default products if none are provided
const defaultProducts: Product[] = [
  {
    id: "1",
    title: "Assurance Habitation",
    description:
      "Protégez votre domicile et vos biens contre les imprévus avec notre couverture complète.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    link: "/produits/habitation",
  },
  {
    id: "2",
    title: "Assurance Auto",
    description:
      "Des formules adaptées à tous les conducteurs avec assistance 24/7 et garanties personnalisables.",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    link: "/produits/auto",
  },
  {
    id: "3",
    title: "Assurance Santé",
    description:
      "Accédez aux meilleurs soins avec nos complémentaires santé adaptées à vos besoins.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    link: "/produits/sante",
  },
  {
    id: "4",
    title: "Prévoyance",
    description:
      "Protégez vos proches et sécurisez leur avenir financier en cas d'imprévu.",
    image:
      "https://images.unsplash.com/photo-1565377025687-7379b76b3d4d?w=800&q=80",
    link: "/produits/prevoyance",
  },
  {
    id: "5",
    title: "Assurance Professionnelle",
    description:
      "Des solutions sur mesure pour protéger votre activité et assurer sa pérennité.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    link: "/produits/pro",
  },
  {
    id: "6",
    title: "Épargne Retraite",
    description:
      "Préparez sereinement votre retraite avec nos solutions d'épargne performantes.",
    image:
      "https://images.unsplash.com/photo-1621252179027-9262e8d7df0b?w=800&q=80",
    link: "/produits/retraite",
  },
];

export default ProductCarousel;
