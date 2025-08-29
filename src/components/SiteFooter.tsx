import React, { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap";

const SiteFooter = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap) => {
    // Animate content on scroll into view
    if (
      contentRef.current &&
      typeof window !== "undefined" &&
      window.ScrollTrigger
    ) {
      const { ScrollTrigger } = gsap;

      gsap.fromTo(
        contentRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#0F172A] text-white py-16 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {/* Colonne 1 - Logo + Baseline */}
          <div className="space-y-4">
            <div>
              <img
                src="/logo-new.png"
                alt="Prévoyance Services"
                className="h-8 w-auto brightness-0 invert mb-3"
              />
              <h3
                className="text-white font-medium text-base font-inter"
                style={{ lineHeight: "1.6" }}
              >
                Prévoyance Services
              </h3>
            </div>
            <p
              className="text-white/90 font-inter text-sm"
              style={{ lineHeight: "1.6" }}
            >
              À vos côtés dans la durée
            </p>
          </div>

          {/* Colonne 2 - Navigation */}
          <div>
            <h4 className="text-white/60 uppercase text-xs font-medium font-inter mb-4 tracking-wider">
              Navigation
            </h4>
            <nav className="space-y-2">
              <a
                href="/"
                className="block text-white/90 hover:text-white transition-colors duration-200 font-inter text-sm"
                style={{ lineHeight: "1.6" }}
              >
                Accueil
              </a>
              <a
                href="/assurances"
                className="block text-white/90 hover:text-white transition-colors duration-200 font-inter text-sm"
                style={{ lineHeight: "1.6" }}
              >
                Nos assurances
              </a>
              <a
                href="/pourquoi-nous"
                className="block text-white/90 hover:text-white transition-colors duration-200 font-inter text-sm"
                style={{ lineHeight: "1.6" }}
              >
                Pourquoi nous
              </a>
              <a
                href="/faq"
                className="block text-white/90 hover:text-white transition-colors duration-200 font-inter text-sm"
                style={{ lineHeight: "1.6" }}
              >
                FAQ
              </a>
              <a
                href="/actualites"
                className="block text-white/90 hover:text-white transition-colors duration-200 font-inter text-sm"
                style={{ lineHeight: "1.6" }}
              >
                Actualités
              </a>
              <a
                href="/contact"
                className="block text-white/90 hover:text-white transition-colors duration-200 font-inter text-sm"
                style={{ lineHeight: "1.6" }}
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Colonne 3 - Contact */}
          <div>
            <h4 className="text-white/60 uppercase text-xs font-medium font-inter mb-4 tracking-wider">
              Contact
            </h4>
            <div className="space-y-2">
              <p
                className="text-white/90 font-inter text-sm"
                style={{ lineHeight: "1.6" }}
              >
                15 Av. Gabriel Péri
                <br />
                92230 Gennevilliers
              </p>
              <a
                href="tel:0147941234"
                className="block text-white/90 hover:text-white transition-colors duration-200 font-inter text-sm"
                style={{ lineHeight: "1.6" }}
              >
                01 47 94 12 34
              </a>
              <a
                href="mailto:contact@prevoyanceservices.fr"
                className="block text-white/90 hover:text-white transition-colors duration-200 font-inter text-sm"
                style={{ lineHeight: "1.6" }}
              >
                contact@prevoyanceservices.fr
              </a>
            </div>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="border-t border-white/20 mt-12 pt-6">
          <div className="text-center">
            <p
              className="text-white/60 font-inter text-xs"
              style={{ lineHeight: "1.6" }}
            >
              <a
                href="/mentions-legales"
                className="hover:text-white transition-colors duration-200"
              >
                Mentions légales
              </a>
              <span className="mx-3 text-white/40">|</span>
              <a
                href="/politique-confidentialite"
                className="hover:text-white transition-colors duration-200"
              >
                Politique de confidentialité
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
