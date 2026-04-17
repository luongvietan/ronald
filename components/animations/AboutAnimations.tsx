"use client";

import { useEffect } from "react";
import {
  gsap,
  ScrollTrigger,
  EASE,
  EASE_BACK,
  EASE_EXPO,
  animateNumber,
  markReady,
  prefersReducedMotion,
  splitWords,
} from "./animUtils";

export default function AboutAnimations() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = document.querySelector<HTMLElement>("[data-page='about']");
    if (!root) return;

    const ctx = gsap.context(() => {
      // ── HERO ───────────────────────────────────────────────
      const hero = root.querySelector<HTMLElement>("[data-about-hero]");
      const heroTitle = hero?.querySelector<HTMLElement>("h1") ?? null;
      const heroSub = hero?.querySelector<HTMLElement>("p") ?? null;

      const titleWords = heroTitle ? splitWords(heroTitle) : [];
      const tl = gsap.timeline({ defaults: { ease: EASE } });

      if (hero) {
        tl.from(hero, { opacity: 0, duration: 0.5 }, 0);
      }
      if (titleWords.length) {
        tl.from(
          titleWords,
          {
            yPercent: 110,
            opacity: 0,
            rotate: 3,
            duration: 0.9,
            stagger: 0.08,
            ease: "power4.out",
          },
          0.1,
        );
      }
      if (heroSub) {
        tl.from(heroSub, { y: 20, opacity: 0, duration: 0.7 }, 0.5);
      }

      // ── STATS COUNTERS ─────────────────────────────────────
      const statValues = root.querySelectorAll<HTMLElement>("[data-about-stat-value]");
      statValues.forEach((el) => animateNumber(el, { duration: 1.8 }));

      const statItems = root.querySelectorAll<HTMLElement>("[data-about-stat]");
      if (statItems.length) {
        gsap.from(statItems, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: EASE_BACK,
          scrollTrigger: { trigger: statItems[0], start: "top 85%", once: true },
        });
      }

      // ── MISSION ─ paragraphs slide from sides ──────────────
      const mission = root.querySelector<HTMLElement>("[data-about-mission]");
      if (mission) {
        const missionTitle = mission.querySelector<HTMLElement>("h2");
        const paragraphs = mission.querySelectorAll<HTMLElement>("p");

        const mTl = gsap.timeline({
          scrollTrigger: { trigger: mission, start: "top 75%", once: true },
        });
        if (missionTitle) {
          mTl.from(missionTitle, { x: -30, opacity: 0, duration: 0.7, ease: EASE }, 0);
        }
        if (paragraphs.length) {
          paragraphs.forEach((p, i) => {
            mTl.from(
              p,
              {
                x: i % 2 === 0 ? -40 : 40,
                opacity: 0,
                duration: 0.7,
                ease: EASE_EXPO,
              },
              0.2 + i * 0.15,
            );
          });
        }
      }

      // ── VALUES CARDS — 3D flip reveal ──────────────────────
      const valuesSection = root.querySelector<HTMLElement>("[data-about-values]");
      if (valuesSection) {
        const heading = valuesSection.querySelector<HTMLElement>("h2");
        const cards = valuesSection.querySelectorAll<HTMLElement>("[data-about-value]");

        if (heading) {
          gsap.from(heading, {
            y: 24,
            opacity: 0,
            duration: 0.7,
            ease: EASE,
            scrollTrigger: { trigger: heading, start: "top 85%", once: true },
          });
        }

        cards.forEach((card, i) => {
          gsap.set(card, { transformPerspective: 800, transformOrigin: "center top" });
          gsap.from(card, {
            y: 60,
            opacity: 0,
            rotateX: -25,
            duration: 0.9,
            delay: (i % 2) * 0.08,
            ease: EASE_BACK,
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          });

          const icon = card.querySelector<HTMLElement>(".material-symbols-outlined");
          if (icon) {
            gsap.from(icon, {
              scale: 0,
              rotate: -180,
              duration: 0.8,
              delay: 0.25 + (i % 2) * 0.08,
              ease: EASE_BACK,
              scrollTrigger: { trigger: card, start: "top 85%", once: true },
            });
          }
        });
      }

      // ── CTA ────────────────────────────────────────────────
      const cta = root.querySelector<HTMLElement>("[data-about-cta]");
      if (cta) {
        const heading = cta.querySelector<HTMLElement>("h2");
        const sub = cta.querySelector<HTMLElement>("p");
        const buttons = cta.querySelectorAll<HTMLAnchorElement>("a");

        const cTl = gsap.timeline({
          scrollTrigger: { trigger: cta, start: "top 80%", once: true },
        });
        if (heading) cTl.from(heading, { y: 24, opacity: 0, duration: 0.7, ease: EASE }, 0);
        if (sub) cTl.from(sub, { y: 20, opacity: 0, duration: 0.6, ease: EASE }, 0.15);
        if (buttons.length) {
          cTl.from(
            buttons,
            { scale: 0.85, opacity: 0, duration: 0.6, stagger: 0.1, ease: EASE_BACK },
            0.3,
          );
        }
      }

      markReady(root);
      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return null;
}
