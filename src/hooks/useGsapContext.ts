import { useRef, useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom hook that creates a GSAP context for better performance and cleanup
 * @param callback Function that receives the GSAP context and returns a cleanup function
 * @param dependencies Array of dependencies to re-run the effect
 */
export const useGsapContext = (
  callback: (context: gsap.Context) => void | (() => void),
  dependencies: any[] = [],
) => {
  // Create a ref to store the GSAP context
  const contextRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    // Skip if we're not in the browser
    if (!gsap) return;

    // Create a new GSAP context
    const ctx = gsap.context(callback);
    contextRef.current = ctx;

    // Return cleanup function
    return () => {
      ctx.revert(); // This will kill all animations created in this context
    };
  }, dependencies);

  return contextRef;
};

/**
 * Custom hook for creating GSAP animations with ScrollTrigger
 * @param callback Function that receives the GSAP instance and ScrollTrigger
 * @param dependencies Array of dependencies to re-run the effect
 */
export const useScrollTrigger = (
  callback: (gsap: any, ScrollTrigger: any) => void | (() => void),
  dependencies: any[] = [],
) => {
  useLayoutEffect(() => {
    // Skip if we're not in the browser
    if (typeof window === "undefined" || !gsap) return;

    // Import ScrollTrigger dynamically
    const loadScrollTrigger = async () => {
      try {
        // Dynamic import of ScrollTrigger
        const ScrollTriggerModule = await import("gsap/ScrollTrigger");
        const { ScrollTrigger } = ScrollTriggerModule;

        // Register the plugin
        if (!gsap.plugins?.ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
        }

        // Run the callback with gsap and ScrollTrigger
        const cleanup = callback(gsap, ScrollTrigger);

        // Return cleanup function
        return () => {
          if (typeof cleanup === "function") {
            cleanup();
          }
          // Kill all ScrollTrigger instances
          ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
        };
      } catch (error) {
        console.error("Error loading ScrollTrigger:", error);
      }
    };

    const cleanupPromise = loadScrollTrigger();

    return () => {
      cleanupPromise.then((cleanup) => {
        if (typeof cleanup === "function") {
          cleanup();
        }
      });
    };
  }, dependencies);
};

/**
 * Custom hook for creating GSAP animations with SplitText
 * @param callback Function that receives the GSAP instance and SplitText
 * @param dependencies Array of dependencies to re-run the effect
 */
export const useSplitText = (
  callback: (gsap: any, SplitText: any) => void | (() => void),
  dependencies: any[] = [],
) => {
  useLayoutEffect(() => {
    // Skip if we're not in the browser
    if (typeof window === "undefined" || !gsap) return;

    // Import SplitText dynamically
    const loadSplitText = async () => {
      try {
        // Dynamic import of SplitText
        const SplitTextModule = await import("gsap/SplitText");
        const { SplitText } = SplitTextModule;

        // Register the plugin
        if (!gsap.plugins?.SplitText) {
          gsap.registerPlugin(SplitText);
        }

        // Run the callback with gsap and SplitText
        const cleanup = callback(gsap, SplitText);

        // Return cleanup function
        return () => {
          if (typeof cleanup === "function") {
            cleanup();
          }
        };
      } catch (error) {
        console.error("Error loading SplitText:", error);
      }
    };

    const cleanupPromise = loadSplitText();

    return () => {
      cleanupPromise.then((cleanup) => {
        if (typeof cleanup === "function") {
          cleanup();
        }
      });
    };
  }, dependencies);
};
