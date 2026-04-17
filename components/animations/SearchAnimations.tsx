"use client";

import { useEffect } from "react";
import {
  gsap,
  ScrollTrigger,
  EASE,
  EASE_BACK,
  EASE_EXPO,
  markReady,
  prefersReducedMotion,
} from "./animUtils";

export default function SearchAnimations() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = document.querySelector<HTMLElement>("[data-page='search']");
    if (!root) return;

    const ctx = gsap.context(() => {
      // ── HEADER ──────────────────────────────────────────────
      const heading = root.querySelector<HTMLElement>("[data-search-heading]");
      const searchBar = root.querySelector<HTMLElement>("[data-search-bar]");
      const tl = gsap.timeline({ defaults: { ease: EASE } });

      if (heading) tl.from(heading, { y: 22, opacity: 0, duration: 0.7, ease: EASE_EXPO }, 0);
      if (searchBar) tl.from(searchBar, { y: 20, opacity: 0, duration: 0.6 }, 0.2);

      // ── ACTIVE FILTER CHIPS ────────────────────────────────
      const chips = root.querySelectorAll<HTMLElement>("[data-search-chips] > *");
      if (chips.length) {
        gsap.from(chips, {
          y: 10,
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          stagger: 0.06,
          ease: EASE_BACK,
          delay: 0.4,
        });
      }

      // ── RESULT SUMMARY ─────────────────────────────────────
      const summary = root.querySelector<HTMLElement>("[data-search-summary]");
      if (summary) {
        gsap.from(summary, { y: 10, opacity: 0, duration: 0.5, ease: EASE, delay: 0.5 });
      }

      // ── RESULTS GRID — fade from bottom w/ staggered wave ─
      const cards = root.querySelectorAll<HTMLElement>("[data-search-grid] > *");
      if (cards.length) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: { amount: 0.8, from: "start" },
          ease: EASE_EXPO,
          scrollTrigger: { trigger: cards[0], start: "top 88%", once: true },
        });
      }

      // ── EMPTY STATE ────────────────────────────────────────
      const empty = root.querySelector<HTMLElement>("[data-search-empty]");
      if (empty) {
        const icon = empty.querySelector<HTMLElement>("span.material-symbols-outlined");
        const rest = empty.querySelectorAll<HTMLElement>("h3, p, a");
        if (icon) {
          gsap.from(icon, { scale: 0, opacity: 0, duration: 0.7, ease: EASE_BACK });
        }
        if (rest.length) {
          gsap.from(rest, {
            y: 14,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.2,
            ease: EASE,
          });
        }
      }

      markReady(root);
      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return null;
}
