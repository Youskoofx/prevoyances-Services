import React, { useRef, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useGSAP, gsap } from "@/lib/gsap";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Calendar, User, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const ArticleTemplate = () => {
  const { slug } = useParams<{ slug: string }>();
  const articleRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const takeawaysRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  if (!slug) {
    return <Navigate to="/actualites" replace />;
  }

  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <Navigate to="/actualites" replace />;
  }

  const relatedPosts = getRelatedPosts(post);

  // Update document title and meta description
  useEffect(() => {
    document.title = `${post.title} - Prévoyance Services`;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", post.excerpt);
    }

    // Add JSON-LD structured data for the article
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      image: post.image,
      author: {
        "@type": "Person",
        name: post.author,
      },
      publisher: {
        "@type": "Organization",
        name: "Prévoyance Services",
        logo: {
          "@type": "ImageObject",
          url: "/logo-new.png",
        },
      },
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": window.location.href,
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [post]);

  useGSAP((gsap) => {
    if (articleRef.current) {
      // Animate article content
      const elements = [
        articleRef.current.querySelector(".article-meta"),
        articleRef.current.querySelector(".article-title"),
        articleRef.current.querySelector(".article-chapo"),
        articleRef.current.querySelector(".article-image"),
      ].filter(Boolean);

      gsap.fromTo(
        elements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        },
      );
    }

    // Animate content sections
    if (contentRef.current) {
      const contentElements =
        contentRef.current.querySelectorAll("h2, p, ul, li");
      gsap.fromTo(
        contentElements,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }

    // Animate takeaways box
    if (takeawaysRef.current) {
      gsap.fromTo(
        takeawaysRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: takeawaysRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }

    // Animate CTA
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader transparent={false} />

      <article ref={articleRef} className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Article Meta */}
          <div className="article-meta flex items-center text-sm text-muted mb-6">
            <span className="bg-primary text-white px-3 py-1 rounded-full font-medium mr-4">
              {post.category}
            </span>
            <Calendar className="w-4 h-4 mr-2" />
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <User className="w-4 h-4 mr-2" />
            <span>{post.author}</span>
            <span className="mx-2">•</span>
            <Clock className="w-4 h-4 mr-2" />
            <span>{post.readTime}</span>
          </div>

          {/* Article Title */}
          <h1 className="article-title text-4xl md:text-5xl font-bold text-ink mb-6 font-sora leading-tight">
            {post.title}
          </h1>

          {/* Chapo */}
          <div className="article-chapo text-xl text-muted leading-relaxed mb-8 p-6 bg-primary/5 rounded-lg border-l-4 border-primary">
            {post.chapo}
          </div>

          {/* Article Image */}
          <div className="article-image mb-12">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Article Content */}
          <div
            ref={contentRef}
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={
              {
                "--tw-prose-body": "#64748B",
                "--tw-prose-headings": "#0F172A",
                "--tw-prose-links": "#115E59",
                "--tw-prose-bold": "#0F172A",
                "--tw-prose-bullets": "#115E59",
              } as React.CSSProperties
            }
          />

          {/* Key Takeaways */}
          <Card
            ref={takeawaysRef}
            className="mb-12 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20"
          >
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-ink mb-6 font-sora flex items-center">
                <CheckCircle className="w-6 h-6 text-primary mr-3" />À retenir
              </h3>
              <ul className="space-y-3">
                {post.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <div
            ref={ctaRef}
            className="text-center bg-white p-8 rounded-lg shadow-lg border border-primary/10"
          >
            <h3 className="text-2xl font-bold text-ink mb-4 font-sora">
              Besoin de conseils personnalisés ?
            </h3>
            <p className="text-muted mb-6">
              Nos experts sont là pour vous accompagner dans vos choix
              d'assurance.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => (window.location.href = "/contact")}
            >
              Parler à un conseiller
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-ink mb-8 text-center font-sora">
              Articles similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="bg-white shadow-lg hover:shadow-xl border-0 transition-all duration-300 cursor-pointer group overflow-hidden"
                  onClick={() =>
                    (window.location.href = `/actualites/${relatedPost.slug}`)
                  }
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-ink mb-2 font-sora group-hover:text-primary transition-colors duration-300">
                      {relatedPost.title}
                    </h3>
                    <p className="text-muted text-sm mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                      <span>Lire l'article</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
};

export default ArticleTemplate;
