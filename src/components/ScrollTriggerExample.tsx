import React, { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import { Card, CardContent } from "./ui/card";

interface ScrollTriggerExampleProps {
  className?: string;
  pinned?: boolean;
  scrubValue?: number;
  markers?: boolean;
}

const ScrollTriggerExample = ({
  className = "",
  pinned = false,
  scrubValue = 1,
  markers = false,
}: ScrollTriggerExampleProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (gsap) => {
      if (!sectionRef.current || !boxRef.current || !progressRef.current)
        return;
      if (typeof window === "undefined" || !window.ScrollTrigger) return;

      const { ScrollTrigger } = gsap;

      // Create a timeline for the box animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: scrubValue,
          markers: markers,
          toggleActions: "play none none reverse",
          pin: pinned ? sectionRef.current : false,
          pinSpacing: true,
          onUpdate: (self: any) => {
            // Update progress bar
            gsap.to(progressRef.current, {
              width: `${self.progress * 100}%`,
              duration: 0.1,
            });
          },
        },
      });

      // Add animations to the timeline
      tl.to(boxRef.current, {
        x: "100%",
        rotation: 360,
        backgroundColor: "#13B88A",
        boxShadow: "0 10px 25px rgba(19, 184, 138, 0.5)",
        duration: 1,
      });

      // Create horizontal scroll effect for panels if they exist
      if (panelsRef.current && panelsRef.current.children.length > 0) {
        const panels = panelsRef.current.children;
        const panelWidth = panels[0].clientWidth;
        const totalPanels = panels.length;

        // Set the container width to accommodate all panels side by side
        gsap.set(panelsRef.current, {
          width: `${totalPanels * 100}%`,
          display: "flex",
        });

        // Create horizontal scroll animation
        gsap.to(panelsRef.current, {
          x: () => -(totalPanels - 1) * panelWidth,
          ease: "none",
          scrollTrigger: {
            trigger: panelsRef.current,
            start: "top top",
            end: () => `+=${panelWidth * (totalPanels - 1)}`,
            pin: true,
            pinSpacing: true,
            scrub: true,
            markers: markers,
            invalidateOnRefresh: true,
          },
        });
      }

      // Return cleanup function
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        tl.kill();
      };
    },
    [pinned, scrubValue, markers],
  );

  return (
    <div
      ref={sectionRef}
      className={`bg-white p-8 rounded-lg shadow-md ${className}`}
    >
      <h2 className="text-2xl font-bold mb-4">
        ScrollTrigger {pinned ? "Pinned" : "Scrub"}
      </h2>
      <p className="mb-6 text-gray-600">
        {pinned
          ? "This section stays pinned while you scroll, creating a fixed-position effect."
          : "Scroll down to see the animation in action. The box will move and rotate as you scroll through this section."}
      </p>

      <div className="h-4 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-[#13B88A] rounded-full w-0"
        ></div>
      </div>

      <div className="h-40 relative overflow-hidden border border-gray-200 rounded-lg mb-8">
        <div
          ref={boxRef}
          className="absolute top-1/2 left-0 -translate-y-1/2 w-16 h-16 bg-gray-500 rounded-md will-change-transform"
        ></div>
      </div>

      {/* Horizontal scroll panels - only shown when pinned is true */}
      {pinned && (
        <div ref={panelsRef} className="overflow-hidden mt-12 mb-8 h-[300px]">
          {[1, 2, 3].map((panel) => (
            <div
              key={panel}
              className="flex-shrink-0 w-full h-full flex items-center justify-center bg-gradient-to-r from-[#13B88A]/10 to-[#2563EB]/10 rounded-lg"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Panel {panel}</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  This is a horizontal scrolling panel. As you scroll down, the
                  panels will move horizontally. This is achieved using
                  ScrollTrigger's pin and scrub features.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">How it works</h3>
          <p className="text-gray-600">
            This example uses the ScrollTrigger plugin to create animations that
            are synchronized with the scroll position.{" "}
            {pinned &&
              "The section is pinned to create a fixed-position effect while scrolling."}{" "}
            The progress bar shows how far you've scrolled through the trigger
            area.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScrollTriggerExample;
