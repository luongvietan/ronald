"use client";

import { useEffect } from "react";
import {
  gsap,
  ScrollTrigger,
  EASE,
  EASE_EXPO,
  markReady,
  prefersReducedMotion,
} from "./animUtils";

export default function LegalAnimations() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = document.querySelector<HTMLElement>("[data-page='legal']");
    if (!root) return;

    const ctx = gsap.context(() => {
      // ── BACK LINK + TITLE + UPDATED ──────────────────────
      const back = root.querySelector<HTMLElement>("[data-legal-back]");
      const title = root.querySelector<HTMLElement>("h1");
      const updated = root.querySelector<HTMLElement>("[data-legal-updated]");

      const tl = gsap.timeline({ defaults: { ease: EASE } });
      if (back) tl.from(back, { x: -10, opacity: 0, duration: 0.5 }, 0);
      if (title) tl.from(title, { y: 24, opacity: 0, duration: 0.8, ease: EASE_EXPO }, 0.1);
      if (updated) tl.from(updated, { y: 10, opacity: 0, duration: 0.5 }, 0.3);

      // ── SECTIONS — reveal on scroll, with a subtle left marker ─
      const sections = root.querySelectorAll<HTMLElement>("[data-legal-body] > section");
      sections.forEach((section) => {
        const heading = section.querySelector<HTMLElement>("h2");
        const body = section.querySelectorAll<HTMLElement>("p, ul");

        const sTl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        });
        if (heading) sTl.from(heading, { x: -20, opacity: 0, duration: 0.6, ease: EASE }, 0);
        if (body.length) {
          sTl.from(body, { y: 14, opacity: 0, duration: 0.5, stagger: 0.08, ease: EASE }, 0.15);
        }
      });

      markReady(root);
      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return null;
}
