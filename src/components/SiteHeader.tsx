import React, { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";
import { Menu, X, Phone } from "lucide-react";

interface SiteHeaderProps {
  transparent?: boolean;
}

const NAV_ITEMS = [
  { label: "Accueil", href: "/" },
  { label: "Nos assurances", href: "/assurances" },
  { label: "Pourquoi nous", href: "/pourquoi-nous" },
  { label: "FAQ", href: "/faq" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

const SiteHeader = ({ transparent = false }: SiteHeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Scroll behavior
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP entrance animations
  useGSAP(
    (gsap) => {
      if (!headerRef.current) return;
      if (prefersReducedMotion()) {
        gsap.set([logoRef.current, navRef.current, ctaRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({ delay: 0.2 });

      // Logo animation
      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { opacity: 0, y: -20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
          0,
        );
      }

      // Navigation items animation
      if (navRef.current) {
        const items = navRef.current.querySelectorAll(".nav-item");
        if (items.length) {
          tl.fromTo(
            items,
            { opacity: 0, y: -15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
            },
            0.2,
          );
        }
      }

      // CTA button animation
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          0.4,
        );
      }
    },
    [],
    headerRef,
  );

  const currentPath = window.location.pathname || "/";

  const isActive = (href: string) => {
    return currentPath === href || (href === "/" && currentPath === "/");
  };

  const headerClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled
      ? "bg-white/95 backdrop-blur-sm border-b border-line shadow-sm"
      : "bg-white/90 backdrop-blur-sm border-b border-transparent"
  }`;

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-primary px-4 py-2 rounded-full shadow-lg z-[60] focus:outline-none focus:ring-2 focus:ring-primary/25"
      >
        Aller au contenu
      </a>

      <header ref={headerRef} className={headerClasses} role="banner">
        <div className="mx-auto px-6" style={{ maxWidth: "1100px" }}>
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <a
                href="/"
                className="inline-flex items-center focus:outline-none focus:ring-2 focus:ring-primary/25 rounded-lg transition-all duration-300"
                aria-label="Prévoyance Services - Accueil"
              >
                <img
                  ref={logoRef}
                  src="/logo-new.png"
                  alt="Prévoyance Services"
                  className="h-10 w-auto transition-all duration-300"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav
              ref={navRef}
              className="hidden lg:flex items-center justify-center flex-1 mx-12"
              role="navigation"
              aria-label="Navigation principale"
            >
              <div className="flex items-center gap-8">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`nav-item text-sm font-medium transition-colors duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary/25 rounded-lg px-2 py-1 font-inter ${
                        active ? "text-primary" : "text-ink hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Desktop CTA */}
              <Button
                ref={ctaRef}
                asChild
                className="hidden lg:inline-flex bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/25 px-6 py-3 rounded-full font-inter"
              >
                <a href="/contact">Devis gratuit</a>
              </Button>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                  <SheetTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-11 h-11 bg-primary/10 text-primary rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/25"
                      aria-label="Ouvrir le menu"
                    >
                      <Menu className="h-5 w-5" />
                    </button>
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    className="w-[88%] max-w-sm p-0 bg-white border-l border-line"
                  >
                    <SheetHeader className="p-6 border-b border-line">
                      <div className="flex items-center justify-between">
                        <img
                          src="/logo-new.png"
                          alt="Prévoyance Services"
                          className="h-8 w-auto"
                        />
                        <SheetClose asChild>
                          <button
                            className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/25 transition-all duration-300"
                            aria-label="Fermer le menu"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </SheetClose>
                      </div>
                    </SheetHeader>

                    <div className="flex flex-col h-full">
                      <div className="flex-1 p-6 space-y-2">
                        {NAV_ITEMS.map((item) => {
                          const active = isActive(item.href);
                          return (
                            <SheetClose asChild key={item.href}>
                              <a
                                href={item.href}
                                onClick={() => setIsDrawerOpen(false)}
                                className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/25 font-inter ${
                                  active
                                    ? "text-primary bg-primary/10"
                                    : "text-ink hover:text-primary hover:bg-primary/5"
                                }`}
                              >
                                {item.label}
                              </a>
                            </SheetClose>
                          );
                        })}

                        <div className="pt-4 border-t border-line">
                          <SheetClose asChild>
                            <Button
                              asChild
                              className="w-full bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/25 py-4 rounded-full font-inter"
                              onClick={() => setIsDrawerOpen(false)}
                            >
                              <a href="/contact">Devis gratuit</a>
                            </Button>
                          </SheetClose>
                        </div>
                      </div>

                      <div className="p-6 bg-card border-t border-line">
                        <p
                          className="text-xs text-muted text-center font-inter"
                          style={{ lineHeight: "1.6" }}
                        >
                          Prévoyance Services — À vos côtés dans la durée
                        </p>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default SiteHeader;
