import React, { useEffect } from "react";
import HeroSmooth from "./HeroSmooth";
import ServicesCards from "./ServicesCards";
import AdvantagesSection from "./AdvantagesSection";
import TestimonialsScroller from "./TestimonialsScroller";
import BlogPreview from "./BlogPreview";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { gsap, createSmoothScroll } from "@/lib/gsap";

function Home() {
  // Initialize smooth scrolling
  useEffect(() => {
    // Create smooth scrolling if ScrollSmoother is available
    const smoother = createSmoothScroll({
      smooth: 1,
      effects: true,
    });

    return () => {
      // Clean up
      if (smoother) smoother.kill();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader transparent={true} />
      <main>
        <HeroSmooth />
        <ServicesCards />
        <AdvantagesSection />
        <TestimonialsScroller />
        <BlogPreview />
      </main>
      <SiteFooter />
    </div>
  );
}

export default Home;
