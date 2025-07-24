import React, { useRef, useState, useEffect } from "react";
import { useGSAP, gsap, prefersReducedMotion } from "@/lib/gsap";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown, Search, User } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface SiteHeaderProps {
  transparent?: boolean;
}

const navItems: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Solutions",
    href: "#",
    children: [
      { label: "Assurance Habitation", href: "/produits/habitation" },
      { label: "Assurance Auto", href: "/produits/auto" },
      { label: "Assurance Santé", href: "/produits/sante" },
      { label: "Prévoyance", href: "/produits/prevoyance" },
      { label: "Assurance Professionnelle", href: "/produits/pro" },
      { label: "Épargne Retraite", href: "/produits/retraite" },
    ],
  },
  { label: "Devis", href: "/devis" },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SiteHeader = ({ transparent = false }: SiteHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<SVGSVGElement>(null);
  const closeRef = useRef<SVGSVGElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if we should hide the header
      if (currentScrollY > 80) {
        setIsScrolled(true);

        // Hide header when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && !isMenuOpen) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      } else {
        setIsScrolled(false);
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen]);

  // GSAP animations
  useGSAP((gsap) => {
    const reducedMotion = prefersReducedMotion();

    // Animate background gradient rotation
    if (bgRef.current && !reducedMotion) {
      gsap.to(bgRef.current, {
        backgroundPosition: "200% 0%",
        duration: 15,
        repeat: -1,
        ease: "sine.inOut",
      });
    }

    // Set up the Flip plugin for the indicator if available
    if (typeof window !== "undefined" && window.Flip && indicatorRef.current) {
      const { Flip } = window;

      // Initialize the indicator position
      const activeNavItem = document.querySelector(".nav-item.active");
      if (activeNavItem) {
        gsap.set(indicatorRef.current, {
          width: activeNavItem.getBoundingClientRect().width,
          x:
            activeNavItem.getBoundingClientRect().left -
            (headerRef.current?.getBoundingClientRect().left || 0),
          opacity: 1,
        });
      } else {
        gsap.set(indicatorRef.current, { opacity: 0 });
      }

      // Set up event listeners for nav items
      document.querySelectorAll(".nav-item").forEach((item) => {
        item.addEventListener("mouseenter", () => {
          if (isMenuOpen) return;

          const state = Flip.getState(indicatorRef.current);

          gsap.set(indicatorRef.current, {
            width: item.getBoundingClientRect().width,
            x:
              item.getBoundingClientRect().left -
              (headerRef.current?.getBoundingClientRect().left || 0),
            opacity: 1,
          });

          Flip.from(state, {
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });

      // Reset indicator on mouseleave
      document
        .querySelector(".desktop-nav")
        ?.addEventListener("mouseleave", () => {
          if (isMenuOpen) return;

          const activeNavItem = document.querySelector(".nav-item.active");
          const state = Flip.getState(indicatorRef.current);

          if (activeNavItem) {
            gsap.set(indicatorRef.current, {
              width: activeNavItem.getBoundingClientRect().width,
              x:
                activeNavItem.getBoundingClientRect().left -
                (headerRef.current?.getBoundingClientRect().left || 0),
              opacity: 1,
            });
          } else {
            gsap.to(indicatorRef.current, { opacity: 0, duration: 0.3 });
          }

          Flip.from(state, {
            duration: 0.4,
            ease: "power2.out",
          });
        });
    }

    // Set up burger menu animation
    if (burgerRef.current && closeRef.current) {
      gsap.set(closeRef.current, { opacity: 0, display: "none" });
    }

    return () => {
      // Clean up event listeners
      document.querySelectorAll(".nav-item").forEach((item) => {
        item.removeEventListener("mouseenter", () => {});
      });
      document
        .querySelector(".desktop-nav")
        ?.removeEventListener("mouseleave", () => {});
    };
  }, []);

  // Toggle mobile menu with animation
  const toggleMenu = () => {
    if (burgerRef.current && closeRef.current && menuRef.current) {
      if (!isMenuOpen) {
        // Open menu animation
        gsap.to(burgerRef.current, {
          opacity: 0,
          display: "none",
          duration: 0.3,
          onComplete: () => {
            gsap.to(closeRef.current, {
              opacity: 1,
              display: "block",
              duration: 0.3,
            });
          },
        });

        // Animate menu appearance
        gsap.fromTo(
          menuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        );

        // Stagger menu items
        gsap.fromTo(
          ".mobile-nav-item",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.2,
          },
        );
      } else {
        // Close menu animation
        gsap.to(closeRef.current, {
          opacity: 0,
          display: "none",
          duration: 0.3,
          onComplete: () => {
            gsap.to(burgerRef.current, {
              opacity: 1,
              display: "block",
              duration: 0.3,
            });
          },
        });

        // Fade out menu
        gsap.to(menuRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power3.in",
        });
      }
    }

    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle dropdown menu
  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      } ${isHidden ? "-translate-y-full" : "translate-y-0"} ${
        transparent && !isScrolled
          ? "bg-transparent"
          : "bg-white/80 backdrop-blur-lg shadow-sm"
      }`}
    >
      {/* Animated background gradient */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-r from-[#13B88A]/5 via-[#2563EB]/5 to-[#13B88A]/5 bg-[length:200%_100%] z-0"
        style={{ backgroundPosition: "0% 0%" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center">
          {/* Word-mark */}
          <a
            href="/"
            className="text-xl font-bold text-emerald flex items-center font-sora"
          >
            prevoyancesservices
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 desktop-nav relative">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <a
                  href={item.href}
                  className={`nav-item px-4 py-2 text-gray-700 hover:text-primary transition-colors duration-200 ${item.label === "Accueil" ? "active" : ""}`}
                  onClick={(e) => {
                    if (item.children) {
                      e.preventDefault();
                      toggleDropdown(item.label);
                    }
                  }}
                >
                  <span className="flex items-center">
                    {item.label}
                    {item.children && <ChevronDown className="ml-1 h-4 w-4" />}
                  </span>
                </a>

                {/* Mega Menu Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute left-0 mt-2 w-[500px] bg-white shadow-xl rounded-md overflow-hidden border border-gray-100 z-50">
                    <div className="p-6 grid grid-cols-2 gap-4">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-start"
                        >
                          <div>
                            <div className="font-medium text-gray-900">
                              {child.label}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              Découvrez nos solutions{" "}
                              {child.label.toLowerCase()}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Neon indicator for active/hovered item */}
            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-0.5 bg-neon rounded-full shadow-[0_0_8px_rgba(193,55,255,0.8)] transition-opacity duration-300"
              style={{ left: 0, width: 0 }}
            ></div>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-700">
              <Search className="h-4 w-4 mr-1" /> Rechercher
            </Button>
            <Button className="bg-gradient-to-r from-emerald to-sapphire hover:from-sapphire hover:to-neon text-white relative overflow-hidden group transition-all duration-300">
              <span className="absolute inset-0 bg-gradient-to-r from-neon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <User className="h-4 w-4 mr-1 relative z-10" /> Obtenir un devis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            <Menu ref={burgerRef} className="h-6 w-6" />
            <X ref={closeRef} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-full left-0 w-full bg-gradient-to-b from-[#0B1C30]/95 to-[#0B1C30]/98 backdrop-blur-md shadow-lg py-4 z-40"
        >
          <nav className="container mx-auto px-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label} className="mobile-nav-item">
                  <a
                    href={item.href}
                    className="block py-2 text-white hover:text-[#13B88A] transition-colors duration-200 font-medium"
                    onClick={(e) => {
                      if (item.children) {
                        e.preventDefault();
                        toggleDropdown(item.label);
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                  >
                    <span className="flex items-center justify-between">
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === item.label ? "rotate-180" : ""}`}
                        />
                      )}
                    </span>
                  </a>

                  {/* Mobile Dropdown */}
                  {item.children && activeDropdown === item.label && (
                    <div className="mt-2 ml-4 space-y-2 border-l-2 border-[#13B88A]/30 pl-4">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block py-2 text-white/80 hover:text-[#13B88A] transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
              <li className="mobile-nav-item pt-4 border-t border-white/10 mt-4">
                <Button className="w-full bg-[#13B88A] hover:bg-[#13B88A]/90 text-white">
                  <User className="h-4 w-4 mr-2" /> Espace Client
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
