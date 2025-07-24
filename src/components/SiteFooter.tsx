import React, { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const SiteFooter = () => {
  const footerRef = useRef<HTMLElement>(null);
  const glowLineRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap) => {
    // Animate the glow line
    if (glowLineRef.current) {
      // Create a timeline for the glow line animation
      const glowTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 5,
      });

      // Animate the glow line from left to right
      glowTl.fromTo(
        glowLineRef.current,
        { left: "-100%", width: "50%" },
        { left: "150%", duration: 3, ease: "power2.inOut" },
      );
    }

    // Animate content on scroll into view
    if (
      contentRef.current &&
      typeof window !== "undefined" &&
      window.ScrollTrigger
    ) {
      const { ScrollTrigger } = gsap;

      gsap.fromTo(
        contentRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }

    // Add hover animations for social icons
    if (socialIconsRef.current) {
      const icons = socialIconsRef.current.querySelectorAll(".social-icon");

      icons.forEach((icon) => {
        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            scale: 1.1,
            boxShadow: "0 0 15px rgba(193, 55, 255, 0.8)",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            scale: 1,
            boxShadow: "0 0 5px rgba(193, 55, 255, 0.3)",
            duration: 0.3,
            ease: "power2.in",
          });
        });
      });
    }

    return () => {
      // Clean up event listeners
      if (socialIconsRef.current) {
        const icons = socialIconsRef.current.querySelectorAll(".social-icon");
        icons.forEach((icon) => {
          icon.removeEventListener("mouseenter", () => {});
          icon.removeEventListener("mouseleave", () => {});
        });
      }
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-navy text-white relative overflow-hidden"
    >
      {/* Animated gradient border at the top */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald to-sapphire relative overflow-hidden">
        {/* Animated glow line */}
        <div
          ref={glowLineRef}
          className="absolute top-0 h-full bg-white/70 blur-sm"
          style={{ width: "50%", left: "-100%" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <span className="text-xl font-bold font-sora text-emerald">
                prevoyancesservices
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Des solutions d'assurance innovantes adaptées à vos besoins avec
              un accompagnement personnalisé.
            </p>
            <div className="flex items-center text-gray-400">
              <Phone className="h-4 w-4 mr-2" />
              <span>01 23 45 67 89</span>
            </div>
            <div className="flex items-center text-gray-400 mt-2">
              <Mail className="h-4 w-4 mr-2" />
              <span>contact@prevoyance-services.fr</span>
            </div>
            <div className="flex items-center text-gray-400 mt-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span>123 Avenue des Assurances, 75008 Paris</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Liens rapides
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-emerald transition-colors duration-200"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="/a-propos"
                  className="text-gray-400 hover:text-emerald transition-colors duration-200"
                >
                  À propos
                </a>
              </li>
              <li>
                <a
                  href="/devis"
                  className="text-gray-400 hover:text-emerald transition-colors duration-200"
                >
                  Obtenir un devis
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-gray-400 hover:text-emerald transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-emerald transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Nos produits
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/produits/habitation"
                  className="text-gray-400 hover:text-emerald transition-colors duration-200"
                >
                  Assurance Habitation
                </a>
              </li>
              <li>
                <a
                  href="/produits/auto"
                  className="text-gray-400 hover:text-emerald transition-colors duration-200"
                >
                  Assurance Auto
                </a>
              </li>
              <li>
                <a
                  href="/produits/sante"
                  className="text-gray-400 hover:text-emerald transition-colors duration-200"
                >
                  Assurance Santé
                </a>
              </li>
              <li>
                <a
                  href="/produits/prevoyance"
                  className="text-gray-400 hover:text-emerald transition-colors duration-200"
                >
                  Prévoyance
                </a>
              </li>
              <li>
                <a
                  href="/produits/pro"
                  className="text-gray-400 hover:text-emerald transition-colors duration-200"
                >
                  Assurance Professionnelle
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Inscrivez-vous pour recevoir nos actualités et offres exclusives.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-[#1A1F35] text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary w-full"
              />
              <button
                type="submit"
                className="bg-emerald hover:bg-emerald/90 text-white px-4 py-2 rounded-r-md transition-colors duration-200"
              >
                OK
              </button>
            </form>

            {/* Social Icons */}
            <div ref={socialIconsRef} className="flex space-x-3 mt-6">
              <a
                href="#"
                className="social-icon w-10 h-10 rounded-full bg-[#1A1F35] flex items-center justify-center text-white hover:text-primary transition-colors duration-200 shadow-[0_0_5px_rgba(193,55,255,0.3)]"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="social-icon w-10 h-10 rounded-full bg-[#1A1F35] flex items-center justify-center text-white hover:text-primary transition-colors duration-200 shadow-[0_0_5px_rgba(193,55,255,0.3)]"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="social-icon w-10 h-10 rounded-full bg-[#1A1F35] flex items-center justify-center text-white hover:text-primary transition-colors duration-200 shadow-[0_0_5px_rgba(193,55,255,0.3)]"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="social-icon w-10 h-10 rounded-full bg-[#1A1F35] flex items-center justify-center text-white hover:text-primary transition-colors duration-200 shadow-[0_0_5px_rgba(193,55,255,0.3)]"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} prevoyancesservices. Tous droits
            réservés.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="/mentions-legales"
              className="text-gray-500 hover:text-emerald text-sm transition-colors duration-200"
            >
              Mentions légales
            </a>
            <a
              href="/politique-confidentialite"
              className="text-gray-500 hover:text-emerald text-sm transition-colors duration-200"
            >
              Politique de confidentialité
            </a>
            <a
              href="/cgv"
              className="text-gray-500 hover:text-emerald text-sm transition-colors duration-200"
            >
              CGV
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
