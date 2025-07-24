import { useLayoutEffect } from "react";

// Use dynamic imports instead of require for browser compatibility
let gsap: any = null;

// Define a type for GSAP plugins
type GSAPPlugin = string;

// List of plugins to load
const plugins: GSAPPlugin[] = [
  "ScrollTrigger",
  "ScrollSmoother",
  "SplitText",
  "Flip",
  "DrawSVG",
  "ScrollTo",
  "MotionPath",
  "MorphSVG",
  "Draggable",
];

// Initialize GSAP only on the client side
if (typeof window !== "undefined") {
  // Immediately invoke async function to load GSAP
  (async () => {
    try {
      // Dynamic import for GSAP core
      const module = await import("gsap");
      gsap = module.default || module;

      // Load and register all plugins
      for (const pluginName of plugins) {
        try {
          if (typeof (window as any)[pluginName] === "undefined") {
            const pluginModule = await import(`gsap/${pluginName}`);
            const plugin = pluginModule.default || pluginModule;
            gsap.registerPlugin(plugin);
            (window as any)[pluginName] = plugin;
          }
        } catch (e) {
          console.warn(`${pluginName} plugin not available`, e);
        }
      }
    } catch (e) {
      console.error("Failed to load GSAP", e);
    }
  })();
}

// Export GSAP instance
export { gsap };

// Custom hook for GSAP animations with proper cleanup
export const useGSAP = (
  callback: (gsapInstance: any) => void | (() => void),
  dependencies: any[] = [],
) => {
  useLayoutEffect(() => {
    // Skip if we're not in the browser or GSAP isn't loaded yet
    if (!gsap) return;

    // Run the animation callback with gsap instance
    const cleanup = callback(gsap);

    // Return cleanup function
    return () => {
      if (typeof cleanup === "function") {
        cleanup();
      }

      // Kill any remaining GSAP animations to prevent memory leaks
      gsap.killTweensOf("*");
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
      : options.smooth || defaultOptions.smooth,
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
