import React, { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { useGSAP, gsap } from "@/lib/gsap";
import { Calendar, User, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
}

interface BlogPreviewProps {
  posts?: BlogPost[];
}

const BlogPreview = ({ posts = defaultPosts }: BlogPreviewProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap) => {
    if (sectionRef.current && gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".blog-card");

      // Masonry-style fade-up animation
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: {
            amount: 0.8,
            grid: "auto",
            from: "start",
          },
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Add hover animations
      cards.forEach((card) => {
        const image = card.querySelector(".blog-image");
        const content = card.querySelector(".blog-content");

        card.addEventListener("mouseenter", () => {
          gsap.to(image, {
            scale: 1.1,
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(content, {
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(content, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="py-24 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-sora">
            Actualités & <span className="text-emerald">Conseils</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Restez informé des dernières actualités et découvrez nos conseils
            d'experts
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post, index) => (
            <Card
              key={post.id}
              className={`blog-card bg-white/70 backdrop-blur-lg shadow-xl/10 hover:shadow-xl/20 border-0 transition-all duration-300 cursor-pointer group overflow-hidden ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              } ${index === 1 ? "lg:row-span-2" : ""}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="blog-image w-full h-48 object-cover transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-emerald text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              <CardContent className="blog-content p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <User className="w-4 h-4 mr-2" />
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 font-sora group-hover:text-emerald transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-emerald font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span>Lire la suite</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-emerald to-sapphire hover:from-sapphire hover:to-neon text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
            Voir tous les articles
          </button>
        </div>
      </div>
    </section>
  );
};

const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title: "Comment bien choisir son assurance habitation en 2025",
    excerpt:
      "Découvrez les critères essentiels pour sélectionner l'assurance habitation qui correspond parfaitement à vos besoins et à votre budget.",
    author: "Marie Dubois",
    date: "15 Jan 2025",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    category: "Habitation",
    readTime: "5 min",
  },
  {
    id: "2",
    title: "Les nouvelles réglementations auto 2025",
    excerpt:
      "Tout ce que vous devez savoir sur les changements réglementaires qui impactent votre assurance automobile cette année.",
    author: "Pierre Martin",
    date: "12 Jan 2025",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80",
    category: "Automobile",
    readTime: "7 min",
  },
  {
    id: "3",
    title: "Prévoyance : protéger sa famille efficacement",
    excerpt:
      "Les meilleures stratégies pour assurer la sécurité financière de vos proches en cas d'imprévu.",
    author: "Sophie Leroy",
    date: "10 Jan 2025",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80",
    category: "Prévoyance",
    readTime: "6 min",
  },
  {
    id: "4",
    title: "Télétravail : adapter son assurance professionnelle",
    excerpt:
      "Comment ajuster votre couverture professionnelle aux nouvelles modalités de travail à distance.",
    author: "Thomas Rousseau",
    date: "8 Jan 2025",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
    category: "Professionnel",
    readTime: "4 min",
  },
  {
    id: "5",
    title: "Santé : les remboursements 2025",
    excerpt:
      "Panorama complet des nouveaux taux de remboursement et des garanties santé pour cette année.",
    author: "Dr. Anne Moreau",
    date: "5 Jan 2025",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&q=80",
    category: "Santé",
    readTime: "8 min",
  },
  {
    id: "6",
    title: "Épargne retraite : optimiser ses placements",
    excerpt:
      "Stratégies d'investissement pour préparer sereinement votre retraite avec les meilleurs rendements.",
    author: "Jean-Luc Petit",
    date: "3 Jan 2025",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    category: "Épargne",
    readTime: "10 min",
  },
];

export default BlogPreview;
