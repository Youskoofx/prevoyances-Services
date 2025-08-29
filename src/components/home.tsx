import React, { useRef, useState, useEffect } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import TestimonialsScroller from "./TestimonialsScroller";
import ChatWidget from "./ChatWidget";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useGSAP, gsap } from "@/lib/gsap";
import {
  Shield,
  Heart,
  Car,
  Home as HomeIcon,
  Briefcase,
  PawPrint,
  Users,
  Award,
  MapPin,
  Phone,
  Mail,
  Target,
  CheckCircle,
  Zap,
  Clock,
} from "lucide-react";

const Home = () => {
  const heroRef = useRef<HTMLElement>(null);
  const partnersRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const whyUsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    besoin: "",
    message: "",
    rgpd: false,
  });

  // Prefetch key pages on component mount
  useEffect(() => {
    const prefetchPages = () => {
      const keyPages = ["/assurances", "/contact", "/pourquoi-nous"];
      keyPages.forEach((page) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = page;
        document.head.appendChild(link);
      });
    };

    // Prefetch after a short delay to not interfere with initial page load
    const timer = setTimeout(prefetchPages, 1000);
    return () => clearTimeout(timer);
  }, []);

  // GSAP animations
  useGSAP(
    (gsap) => {
      // Hero animations
      if (heroRef.current) {
        const tl = gsap.timeline({ delay: 0.5 });

        tl.fromTo(
          ".hero-title",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        )
          .fromTo(
            ".hero-subtitle",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.6",
          )
          .fromTo(
            ".hero-buttons",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.4",
          )
          .fromTo(
            ".hero-stats",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.2",
          );
      }

      // Partners section animation
      if (
        partnersRef.current &&
        typeof window !== "undefined" &&
        window.ScrollTrigger
      ) {
        const { ScrollTrigger } = gsap;

        gsap.fromTo(
          ".partner-logo",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: partnersRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Services section animation
      if (
        servicesRef.current &&
        typeof window !== "undefined" &&
        window.ScrollTrigger
      ) {
        const { ScrollTrigger } = gsap;

        gsap.fromTo(
          ".service-card",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Why Us section animation
      if (
        whyUsRef.current &&
        typeof window !== "undefined" &&
        window.ScrollTrigger
      ) {
        const { ScrollTrigger } = gsap;

        gsap.fromTo(
          ".advantage-item",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: whyUsRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Contact section animation
      if (
        contactRef.current &&
        typeof window !== "undefined" &&
        window.ScrollTrigger
      ) {
        const { ScrollTrigger } = gsap;

        gsap.fromTo(
          ".contact-content",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    },
    [],
    heroRef,
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      besoin: value,
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      rgpd: checked,
    });
  };

  const partnerLogos = [
    { name: "Allianz" },
    { name: "April" },
    { name: "Aésio" },
    { name: "Malakoff Humanis" },
    { name: "SwissLife" },
    { name: "Solly Azar" },
    { name: "Alptis" },
    { name: "NetVox" },
    { name: "Néoliane" },
  ];

  const insuranceServices = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Santé & Mutuelle",
      description:
        "Garanties adaptées, renforts optique/dentaire, tiers payant.",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop",
      alt: "Consultation médicale",
      href: "/assurances/sante",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Prévoyance",
      description:
        "Préservez vos revenus et vos proches (arrêt, invalidité, décès).",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
      alt: "Famille rassurée",
      href: "/assurances/prevoyance",
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "Auto",
      description: "Tiers, tous risques, assistance 0 km, conducteurs.",
      image:
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
      alt: "Voiture urbaine",
      href: "/assurances/auto",
    },
    {
      icon: <HomeIcon className="w-6 h-6" />,
      title: "Habitation",
      description: "Incendie, dégât des eaux, vol, RC, valeur à neuf.",
      image:
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1600&auto=format&fit=crop",
      alt: "Salon lumineux",
      href: "/assurances/habitation",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Professionnels / TNS",
      description: "RC pro, multirisque, flotte, santé co., prévoyance TNS.",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop",
      alt: "Bureau moderne",
      href: "/assurances/pro",
    },
    {
      icon: <PawPrint className="w-6 h-6" />,
      title: "Animaux",
      description: "Frais vétérinaires, hospitalisation, prévention.",
      image:
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1600&auto=format&fit=crop",
      alt: "Chien et vétérinaire",
      href: "/assurances/animaux",
    },
  ];

  const advantages = [
    {
      icon: <Target className="w-12 h-12 text-primary" />,
      title: "Expertise & indépendance",
      description: "27 ans d'expérience, comparaison multi-assureurs.",
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-primary" />,
      title: "Accompagnement humain",
      description: "Un conseiller dédié, disponible et pédagogue.",
    },
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: "Simplicité & économies",
      description: "Nous gérons les démarches et négocions au mieux.",
    },
  ];

  const faqs = [
    {
      question: "Mutuelle vs assurance santé : quelle différence ?",
      answer:
        "La mutuelle complète la Sécurité sociale avec des garanties adaptées à vos besoins.",
    },
    {
      question: "En combien de temps pour un devis ?",
      answer: "Souvent 24–48 h ouvrées après un échange sur vos besoins.",
    },
    {
      question: "Puis-je résilier facilement ?",
      answer: "Oui, on s'occupe des démarches et du transfert.",
    },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader />

      {/* Hero Section */}
      <section
        id="main"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ paddingTop: "80px" }}
        role="main"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=85&w=2400&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.35))",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[780px] mx-auto px-6 text-center">
          <h1
            className="hero-title font-bold text-ink mb-8 font-poppins leading-tight"
            style={{
              fontSize: "clamp(38px, 6vw, 60px)",
              letterSpacing: "-0.02em",
              fontWeight: 800,
            }}
          >
            Indépendants, à vos côtés dans la durée
          </h1>

          <p
            className="hero-subtitle text-lg text-muted max-w-4xl mx-auto mb-12 font-inter"
            style={{ lineHeight: "1.65" }}
          >
            Nous comparons et négocions vos assurances partout en France pour
            protéger ce qui compte vraiment.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg font-semibold font-inter transition-all duration-300 rounded-full"
              asChild
            >
              <a
                href="/contact"
                data-utm-source="hero"
                data-utm-medium="cta"
                data-utm-campaign="devis"
              >
                Demander un devis gratuit
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-6 text-lg font-semibold font-inter transition-all duration-300 rounded-full"
              asChild
            >
              <a
                href="/contact"
                data-utm-source="hero"
                data-utm-medium="cta"
                data-utm-campaign="rappel"
              >
                Être rappelé
              </a>
            </Button>
          </div>

          <div
            className="hero-stats flex flex-wrap justify-center gap-12 text-sm font-inter"
            style={{ color: "#334155" }}
          >
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5" />
              <span>9200+ clients</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5" />
              <span>27 années d'expertise</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5" />
              <span>16 partenaires</span>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section ref={partnersRef} className="py-16 bg-bg border-t border-line">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="sr-only">Partenaires assureurs</h2>
          <div className="overflow-hidden">
            <div className="flex animate-marquee gap-16 items-center justify-center">
              {[...partnerLogos, ...partnerLogos].map((partner, index) => (
                <div
                  key={index}
                  className="partner-logo flex-shrink-0 opacity-40 hover:opacity-100 transition-all duration-300 hover:scale-105 grayscale hover:grayscale-0"
                >
                  <div className="h-8 px-6 flex items-center justify-center text-muted font-medium text-sm font-inter">
                    {partner.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Services */}
      <section ref={servicesRef} className="py-24 bg-card">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-ink mb-6 font-poppins"
              style={{ letterSpacing: "-0.02em", fontWeight: 800 }}
            >
              Nos assurances
            </h2>
            <p
              className="text-xl text-muted max-w-2xl mx-auto font-inter"
              style={{ lineHeight: "1.65" }}
            >
              Des solutions claires et adaptées à votre situation. Photos
              explicites, intitulés simples, parcours évident.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insuranceServices.map((service, index) => (
              <Card
                key={index}
                className="service-card bg-bg border border-line hover:border-primary/30 transition-all duration-300 cursor-pointer group hover:shadow-lg overflow-hidden"
                style={{ borderRadius: "18px" }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <div className="text-primary">{service.icon}</div>
                  </div>
                  <h3
                    className="text-xl font-bold text-ink mb-3 font-poppins"
                    style={{ letterSpacing: "-0.02em", fontWeight: 800 }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-muted font-inter mb-4"
                    style={{ lineHeight: "1.65" }}
                  >
                    {service.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary/80 font-medium font-inter p-0 h-auto transition-all duration-300"
                    asChild
                  >
                    <a href={service.href}>Voir l'offre →</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-bg">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-ink mb-6 font-poppins"
              style={{ letterSpacing: "-0.02em", fontWeight: 800 }}
            >
              Un parcours simple pour tout le monde
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary font-poppins">
                  1
                </span>
              </div>
              <h3
                className="text-xl font-bold text-ink mb-4 font-poppins"
                style={{ letterSpacing: "-0.02em", fontWeight: 800 }}
              >
                Expliquez votre besoin
              </h3>
              <p
                className="text-muted font-inter"
                style={{ lineHeight: "1.65" }}
              >
                Nous clarifions votre situation et vos priorités.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary font-poppins">
                  2
                </span>
              </div>
              <h3
                className="text-xl font-bold text-ink mb-4 font-poppins"
                style={{ letterSpacing: "-0.02em", fontWeight: 800 }}
              >
                On compare pour vous
              </h3>
              <p
                className="text-muted font-inter"
                style={{ lineHeight: "1.65" }}
              >
                Plusieurs assureurs, garanties expliquées sans jargon.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary font-poppins">
                  3
                </span>
              </div>
              <h3
                className="text-xl font-bold text-ink mb-4 font-poppins"
                style={{ letterSpacing: "-0.02em", fontWeight: 800 }}
              >
                Vous choisissez sereinement
              </h3>
              <p
                className="text-muted font-inter"
                style={{ lineHeight: "1.65" }}
              >
                On négocie, on met en place, on vous suit dans la durée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyUsRef} className="py-24 bg-card">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2
            className="text-4xl font-bold text-center text-ink mb-16 font-poppins"
            style={{ letterSpacing: "-0.02em", fontWeight: 800 }}
          >
            Pourquoi choisir Prévoyance Services ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            {advantages.map((advantage, index) => (
              <div key={index} className="advantage-item text-center">
                <div className="flex justify-center mb-8">{advantage.icon}</div>
                <h3
                  className="text-2xl font-bold text-ink mb-6 font-poppins"
                  style={{ letterSpacing: "-0.02em", fontWeight: 800 }}
                >
                  {advantage.title}
                </h3>
                <p
                  className="text-muted font-inter text-lg"
                  style={{ lineHeight: "1.65" }}
                >
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>

          {/* Key Numbers */}
          <div className="text-center">
            <p className="text-muted font-inter text-lg">
              9200+ clients • 27 ans • 16 partenaires
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Infinite Autoplay */}
      <TestimonialsScroller />

      {/* FAQ Section */}
      <section className="py-24 bg-bg">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-ink mb-6 font-poppins"
              style={{ letterSpacing: "-0.02em", fontWeight: 800 }}
            >
              Questions fréquentes
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-inter font-semibold text-ink">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-muted font-inter"
                    style={{ lineHeight: "1.65" }}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-24 bg-card">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <div className="contact-content">
              <h2
                className="text-4xl font-bold text-ink mb-12 font-poppins"
                style={{ letterSpacing: "-0.02em", fontWeight: 800 }}
              >
                Parlons de votre besoin
              </h2>
              <p
                className="text-xl text-muted mb-8 font-inter"
                style={{ lineHeight: "1.65" }}
              >
                Un expert vous rappelle gratuitement sous 24 h.
              </p>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink font-inter text-lg mb-2">
                      Adresse
                    </p>
                    <p
                      className="text-muted font-inter text-lg"
                      style={{ lineHeight: "1.65" }}
                    >
                      15 Avenue Gabriel Péri
                      <br />
                      92230 Gennevilliers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink font-inter text-lg mb-2">
                      Téléphone
                    </p>
                    <a
                      href="tel:0147941234"
                      className="text-muted hover:text-primary font-inter text-lg transition-colors duration-300"
                    >
                      01 47 94 12 34
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink font-inter text-lg mb-2">
                      Email
                    </p>
                    <a
                      href="mailto:contact@prevoyanceservices.fr"
                      className="text-muted hover:text-primary font-inter text-lg transition-colors duration-300"
                    >
                      contact@prevoyanceservices.fr
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-content">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="nom"
                    placeholder="Nom complet"
                    value={formData.nom}
                    onChange={handleInputChange}
                    className="bg-bg border-line font-inter h-14 text-lg focus:border-primary transition-colors duration-300"
                    style={{ borderRadius: "18px" }}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-bg border-line font-inter h-14 text-lg focus:border-primary transition-colors duration-300"
                    style={{ borderRadius: "18px" }}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    name="telephone"
                    placeholder="Téléphone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    className="bg-bg border-line font-inter h-14 text-lg focus:border-primary transition-colors duration-300"
                    style={{ borderRadius: "18px" }}
                    required
                  />
                </div>
                <div>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger
                      className="bg-bg border-line font-inter h-14 text-lg focus:border-primary transition-colors duration-300"
                      style={{ borderRadius: "18px" }}
                    >
                      <SelectValue placeholder="Votre besoin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sante">Santé & Mutuelle</SelectItem>
                      <SelectItem value="prevoyance">Prévoyance</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="habitation">Habitation</SelectItem>
                      <SelectItem value="pro">Pro / TNS</SelectItem>
                      <SelectItem value="animaux">Animaux</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-bg border-line min-h-[140px] font-inter text-lg focus:border-primary transition-colors duration-300"
                    style={{ borderRadius: "18px" }}
                  />
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="rgpd"
                    checked={formData.rgpd}
                    onCheckedChange={handleCheckboxChange}
                    className="mt-1"
                    required
                  />
                  <label
                    htmlFor="rgpd"
                    className="text-sm text-muted font-inter"
                    style={{ lineHeight: "1.65" }}
                  >
                    J'accepte que mes données soient utilisées pour me
                    recontacter dans le cadre de ma demande.
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold font-inter transition-all duration-300 rounded-full"
                  disabled={!formData.rgpd}
                  style={{ fontWeight: 600 }}
                >
                  Envoyer
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <ChatWidget />
    </div>
  );
};

export default Home;
