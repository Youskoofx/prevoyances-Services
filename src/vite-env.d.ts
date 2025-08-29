/// <reference types="vite/client" />

// GSAP Plugin Type Declarations
declare global {
  interface Window {
    ScrollTrigger?: any;
    ScrollToPlugin?: any;
    SplitText?: any;
    Flip?: any;
    Draggable?: any;
    ScrollSmoother?: any;
  }
}

// Make sure this file is treated as a module
export {};
