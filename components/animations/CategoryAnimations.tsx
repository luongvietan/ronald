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

export default function CategoryAnimations() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = document.querySelector<HTMLElement>("[data-page='category']");
    if (!root) return;

    const ctx = gsap.context(() => {
      // ── HEADER: breadcrumb, label, title ──────────────────
      const breadcrumb = root.querySelector<HTMLElement>("[data-cat-breadcrumb]");
      const label = root.querySelector<HTMLElement>("[data-cat-header] .section-label");
      const title = root.querySelector<HTMLElement>("[data-cat-header] h1");

      const tl = gsap.timeline({ defaults: { ease: EASE } });
      if (breadcrumb) tl.from(breadcrumb, { y: 10, opacity: 0, duration: 0.5 }, 0);
      if (label) tl.from(label, { y: 16, opacity: 0, duration: 0.6 }, 0.1);
      if (title) {
        tl.from(title, { y: 28, opacity: 0, duration: 0.8, ease: EASE_EXPO }, 0.2);
      }

      // ── CATEGORY PILLS ─ horizontal stagger ───────────────
      const pills = root.querySelectorAll<HTMLElement>("[data-cat-pills] > a");
      if (pills.length) {
        gsap.from(pills, {
          y: 14,
          opacity: 0,
          scale: 0.92,
          duration: 0.55,
          stagger: 0.05,
          ease: EASE_BACK,
          delay: 0.3,
        });
      }

      // ── FILTERS BAR ────────────────────────────────────────
      const filters = root.querySelector<HTMLElement>("[data-cat-filters]");
      if (filters) {
        gsap.from(filters, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: EASE,
          scrollTrigger: { trigger: filters, start: "top 90%", once: true },
        });
      }

      // ── PROVIDER CARDS GRID ────────────────────────────────
      const cards = root.querySelectorAll<HTMLElement>("[data-cat-grid] > *");
      if (cards.length) {
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          scale: 0.96,
          duration: 0.8,
          stagger: { amount: 0.6, from: "start" },
          ease: EASE_EXPO,
          scrollTrigger: { trigger: cards[0], start: "top 88%", once: true },
        });
      }

      // ── EMPTY STATE ────────────────────────────────────────
      const empty = root.querySelector<HTMLElement>("[data-cat-empty]");
      if (empty) {
        const icon = empty.querySelector<HTMLElement>("span.material-symbols-outlined");
        const children = empty.querySelectorAll<HTMLElement>("h3, p, a");
        if (icon) {
          gsap.from(icon, { scale: 0, rotate: -30, duration: 0.7, ease: EASE_BACK });
        }
        if (children.length) {
          gsap.from(children, {
            y: 14,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: EASE,
            delay: 0.2,
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
