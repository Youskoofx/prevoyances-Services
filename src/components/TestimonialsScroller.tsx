import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import testimonials from "@/data/testimonials.json";

export default function TestimonialsScroller() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gsap || !wrap.current) return;

    // Dynamically import Draggable to ensure it's only loaded on the client side
    const loadDraggable = async () => {
      try {
        const DraggableModule = await import("gsap/Draggable");
        const Draggable = DraggableModule.default || DraggableModule;

        gsap.registerPlugin(Draggable);

        const cards = Array.from(wrap.current.children) as HTMLElement[];
        const totalW =
          cards.reduce((acc, el) => acc + el.offsetWidth + 32 /*gap-x*/, 0) ||
          1;

        // auto-scroll vers la gauche (Diamond 2025 - 35s cycle)
        const tl = gsap.timeline({ repeat: -1 }).to(wrap.current, {
          x: `-=${totalW}`,
          duration: 35, // 35 seconds as specified
          ease: "none",
          modifiers: { x: gsap.utils.unitize(gsap.utils.wrap(-totalW, 0)) },
        });

        // drag + inertia
        Draggable.create(wrap.current, {
          type: "x",
          inertia: true,
          onPress() {
            tl.pause();
          },
          onRelease() {
            tl.resume();
          },
          onDrag() {
            tl.progress(gsap.utils.wrap(0, 1, this.x / totalW));
          },
        });

        // zoom léger sur la carte la + centrée
        const updateScale = () => {
          cards.forEach((card) => {
            const { left, width } = card.getBoundingClientRect();
            const dist = Math.abs(left + width / 2 - window.innerWidth / 2);
            const scale = gsap.utils.mapRange(
              0,
              window.innerWidth / 2,
              1.05, // Diamond 2025 center zoom
              0.85,
              dist,
            );
            gsap.to(card, {
              scale,
              opacity: scale > 1 ? 1 : 0.65,
              overwrite: "auto",
            });
          });
        };
        gsap.ticker.add(updateScale);
        return () => gsap.ticker.remove(updateScale);
      } catch (e) {
        console.error("Failed to load Draggable", e);
      }
    };

    loadDraggable();
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-gray-100 overflow-hidden">
      <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
        Ce que nos clients disent
      </h2>

      <div
        ref={wrap}
        className="flex flex-row-reverse gap-8 px-8 will-change-transform select-none cursor-grab active:cursor-grabbing"
        style={{ transform: "translateX(0px)" }}
      >
        {testimonials.map((t) => (
          <figure
            key={t.id}
            className="min-w-[280px] max-w-[280px] rounded-xl bg-white p-6 shadow-lg transition-transform"
          >
            <div className="mb-3 flex gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.01 5.904 1.417 8.29L12 18.897l-7.407 3.603 1.417-8.29-6.01-5.904 8.332-1.151z" />
                </svg>
              ))}
            </div>
            <blockquote className="italic text-sm text-gray-700">
              "{t.comment}"
            </blockquote>
            <figcaption className="mt-4 text-xs font-semibold text-gray-600">
              {t.author} — {t.date}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
