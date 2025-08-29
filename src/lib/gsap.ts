import { useLayoutEffect } from "react";

// Use dynamic imports for Vite/Tempo compatibility
let gsap: any = null;

// Initialize GSAP only on the client side
if (typeof window !== "undefined") {
  // Immediately invoke async function to load GSAP
  (async () => {
    try {
      // Dynamic import for GSAP core
      const { gsap: gsapCore } = await import("gsap");
      gsap = gsapCore;

      // Lazy-import plugins to avoid "not available" errors
      Promise.all([
        import("gsap/ScrollTrigger"),
        import("gsap/Flip"),
        import("gsap/Draggable"),
      ])
        .then(([{ ScrollTrigger }, { Flip }, { Draggable }]) => {
          gsap.registerPlugin(ScrollTrigger, Flip, Draggable);
        })
        .catch((e) => {
          console.warn("Some GSAP plugins could not be loaded", e);
        });
    } catch (e) {
      console.error("Failed to load GSAP", e);
    }
  })();
}

// Export GSAP instance
export { gsap };

// Custom hook for GSAP animations with proper cleanup using context
export const useGSAP = (
  callback: (gsapInstance: any) => void | (() => void),
  dependencies: any[] = [],
  scope?: React.RefObject<HTMLElement>,
) => {
  useLayoutEffect(() => {
    // Skip if we're not in the browser or GSAP isn't loaded yet
    if (!gsap) return;

    // Check for reduced motion preference
    const prefersReduced = prefersReducedMotion();
    if (prefersReduced) {
      // Skip animations for users who prefer reduced motion
      return;
    }

    // Create GSAP context for better cleanup
    const ctx = gsap.context(() => {
      const cleanup = callback(gsap);
      return cleanup;
    }, scope?.current);

    // Return cleanup function
    return () => {
      ctx.revert(); // This will kill all animations created in this context
    };
  }, dependencies);
};

/**
 * Utility function to check if reduced motion is preferred
 * @returns boolean indicating if reduced motion is preferred
 */
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Utility function to create a GSAP timeline with reduced motion support
 * @param gsapInstance GSAP instance
 * @param options Timeline options
 * @returns GSAP timeline
 */
export const createTimeline = (gsapInstance: any, options = {}) => {
  const reducedMotion = prefersReducedMotion();

  // Create timeline with adjusted options for reduced motion
  return gsapInstance.timeline({
    ...options,
    // Reduce duration for users who prefer reduced motion
    timeScale: reducedMotion ? 1.5 : 1,
  });
};

/**
 * Creates a smooth scrolling experience using ScrollSmoother
 * @param options ScrollSmoother options
 * @returns ScrollSmoother instance or null if not available
 */
export const createSmoothScroll = (options = {}) => {
  if (!gsap || typeof window === "undefined" || !window.ScrollSmoother)
    return null;

  const defaultOptions = {
    smooth: 1.5,
    effects: true,
    normalizeScroll: true,
    smoothTouch: 0.1,
  };

  return window.ScrollSmoother.create({
    ...defaultOptions,
    ...options,
    // Disable for users who prefer reduced motion
    smooth: prefersReducedMotion()
      ? 0
      : (options as any).smooth || defaultOptions.smooth,
  });
};

/**
 * Utility to create a SplitText instance with proper cleanup
 * @param target Element to split
 * @param options SplitText options
 * @returns SplitText instance or null if not available
 */
export const createSplitText = (target: any, options = {}) => {
  if (!gsap || typeof window === "undefined" || !window.SplitText) return null;

  const defaultOptions = {
    type: "chars,words,lines",
    linesClass: "split-line",
    charsClass: "split-char",
    wordsClass: "split-word",
  };

  return new window.SplitText(target, {
    ...defaultOptions,
    ...options,
  });
};
