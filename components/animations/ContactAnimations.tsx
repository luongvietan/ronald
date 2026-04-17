"use client";

import { useEffect } from "react";
import {
  gsap,
  ScrollTrigger,
  EASE,
  EASE_BACK,
  markReady,
  prefersReducedMotion,
  splitWords,
} from "./animUtils";

export default function ContactAnimations() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = document.querySelector<HTMLElement>("[data-page='contact']");
    if (!root) return;

    const ctx = gsap.context(() => {
      // ── HERO TITLE — word reveal ──────────────────────────
      const hero = root.querySelector<HTMLElement>("[data-contact-hero]");
      const title = hero?.querySelector<HTMLElement>("h1") ?? null;
      const sub = hero?.querySelector<HTMLElement>("p") ?? null;
      const titleWords = title ? splitWords(title) : [];

      const tl = gsap.timeline({ defaults: { ease: EASE } });
      if (titleWords.length) {
        tl.from(
          titleWords,
          { yPercent: 110, opacity: 0, duration: 0.85, stagger: 0.06, ease: "power4.out" },
          0,
        );
      }
      if (sub) tl.from(sub, { y: 16, opacity: 0, duration: 0.6 }, 0.4);

      // ── INFO CARDS ─ slide from left + icon bounce ────────
      const infoItems = root.querySelectorAll<HTMLElement>("[data-contact-info-item]");
      infoItems.forEach((item, i) => {
        const icon = item.querySelector<HTMLElement>(".material-symbols-outlined");
        gsap.from(item, {
          x: -40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.12,
          ease: EASE,
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
        if (icon) {
          gsap.from(icon, {
            scale: 0,
            duration: 0.6,
            delay: i * 0.12 + 0.2,
            ease: EASE_BACK,
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          });
        }
      });

      // ── CTA SIDE PANEL ─────────────────────────────────────
      const ctaPanel = root.querySelector<HTMLElement>("[data-contact-cta]");
      if (ctaPanel) {
        gsap.from(ctaPanel, {
          x: -30,
          opacity: 0,
          duration: 0.8,
          ease: EASE,
          scrollTrigger: { trigger: ctaPanel, start: "top 85%", once: true },
        });
      }

      // ── FORM ─ slide from right + fields stagger ──────────
      const formWrap = root.querySelector<HTMLElement>("[data-contact-form-wrap]");
      if (formWrap) {
        const heading = formWrap.querySelector<HTMLElement>("h2");
        if (heading) {
          gsap.from(heading, {
            x: 30,
            opacity: 0,
            duration: 0.7,
            ease: EASE,
            scrollTrigger: { trigger: heading, start: "top 88%", once: true },
          });
        }

        const fields = formWrap.querySelectorAll<HTMLElement>("input, textarea, select, button");
        if (fields.length) {
          gsap.from(fields, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: EASE,
            scrollTrigger: { trigger: formWrap, start: "top 80%", once: true },
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
