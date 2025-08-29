import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import testimonials from "@/data/testimonials.json";

export default function TestimonialsScroller() {
  const wrap = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!gsap || !wrap.current) return;

    const cards = Array.from(wrap.current.children) as HTMLElement[];
    const cardWidth = 308; // 280px + 28px gap
    const totalW = cards.length * cardWidth;

    // Create infinite auto-scroll timeline
    const tl = gsap.timeline({ repeat: -1 }).to(wrap.current, {
      x: `-=${totalW}`,
      duration: 40,
      ease: "none",
      modifiers: { x: gsap.utils.unitize(gsap.utils.wrap(-totalW, 0)) },
    });

    timelineRef.current = tl;

    // Pause on hover
    const container = wrap.current.parentElement;
    if (container) {
      container.addEventListener("mouseenter", () => tl.pause());
      container.addEventListener("mouseleave", () => tl.resume());
    }

    return () => {
      tl.kill();
      if (container) {
        container.removeEventListener("mouseenter", () => tl.pause());
        container.removeEventListener("mouseleave", () => tl.resume());
      }
    };
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-bg overflow-hidden relative">
      <div className="text-center mb-16">
        <h2
          className="text-4xl font-bold text-ink mb-6 font-poppins"
          style={{ letterSpacing: "-0.02em" }}
        >
          Ils parlent de nous
        </h2>
      </div>

      {/* Testimonials Container */}
      <div className="relative">
        <div
          ref={wrap}
          className="flex gap-7 px-8 will-change-transform"
          style={{ transform: "translateX(0px)" }}
        >
          {/* Duplicate testimonials for seamless loop */}
          {[...testimonials, ...testimonials].map((t, index) => (
            <figure
              key={`${t.id}-${index}`}
              className="min-w-[280px] max-w-[280px] rounded-xl bg-white p-6 shadow-lg border border-line flex-shrink-0"
              style={{ borderRadius: "18px" }}
            >
              <div className="mb-3 flex gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.01 5.904 1.417 8.29L12 18.897l-7.407 3.603 1.417-8.29-6.01-5.904 8.332-1.151z" />
                  </svg>
                ))}
              </div>
              <blockquote
                className="text-muted font-inter mb-4 text-base"
                style={{ lineHeight: "1.65" }}
              >
                &quot;{t.comment}&quot;
              </blockquote>
              <figcaption className="text-sm font-semibold text-ink font-inter">
                {t.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
