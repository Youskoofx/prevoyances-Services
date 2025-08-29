import React, { useState, useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Calendar,
  User,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  blogPosts,
  blogCategories,
  filterBlogPostsByCategory,
  type BlogCategory,
} from "@/data/blog";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const POSTS_PER_PAGE = 6;

const BlogListing = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<BlogCategory>("Tous");
  const [currentPage, setCurrentPage] = useState(1);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  const filteredPosts = filterBlogPostsByCategory(blogPosts, selectedCategory);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE,
  );

  useGSAP(
    (gsap) => {
      if (sectionRef.current && gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".blog-card");

        // Animate cards on load
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: {
              amount: 0.6,
              grid: "auto",
              from: "start",
            },
            duration: 0.7,
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
              scale: 1.05,
              duration: 0.4,
              ease: "power2.out",
            });
            gsap.to(content, {
              y: -3,
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

      // Animate filters
      if (filtersRef.current) {
        const filterButtons =
          filtersRef.current.querySelectorAll(".filter-btn");
        gsap.fromTo(
          filterButtons,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.2,
          },
        );
      }
    },
    [currentPosts],
  );

  const handleCategoryChange = (category: BlogCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader transparent={false} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-ink mb-6 font-sora">
              Actualités & <span className="text-primary">Conseils</span>
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Guides pratiques sur mutuelle, prévoyance, auto, habitation.
              Comprendre pour mieux choisir.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-primary/10">
        <div className="container mx-auto px-4">
          <div ref={filtersRef} className="flex flex-wrap justify-center gap-3">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`filter-btn px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section ref={sectionRef} className="py-16">
        <div className="container mx-auto px-4">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentPosts.map((post) => (
              <Card
                key={post.id}
                className="blog-card bg-white shadow-lg hover:shadow-xl border-0 transition-all duration-300 cursor-pointer group overflow-hidden"
                onClick={() =>
                  (window.location.href = `/actualites/${post.slug}`)
                }
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="blog-image w-full h-48 object-cover transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <CardContent className="blog-content p-6">
                  <div className="flex items-center text-sm text-muted mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <User className="w-4 h-4 mr-2" />
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-ink mb-3 font-sora group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-muted mb-4 line-clamp-3">{post.excerpt}</p>

                  <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <span>Lire l'article</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Précédent
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="min-w-[40px]"
                  >
                    {page}
                  </Button>
                ),
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center"
              >
                Suivant
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default BlogListing;
