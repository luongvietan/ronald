"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Global smooth scroll + GSAP ScrollTrigger integration.
 * - Lenis drives the scroll with easing (window scroller).
 * - GSAP ticker feeds Lenis, ScrollTrigger updates on every scroll event.
 * - Respects `prefers-reduced-motion`.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    document.documentElement.classList.add("lenis", "lenis-smooth");

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const rafCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCb);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(rafCb);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return null;
}
