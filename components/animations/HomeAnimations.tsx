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

export default function HomeAnimations() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = document.querySelector<HTMLElement>("[data-page='home']");
    if (!root) return;

    const ctx = gsap.context(() => {
      // ── HERO ───────────────────────────────────────────────
      const hero = root.querySelector<HTMLElement>("[data-hero]");
      const heroBg = root.querySelector<HTMLElement>("[data-hero-bg]");
      const heroBadge = root.querySelector<HTMLElement>("[data-hero-badge]");
      const heroTitle = root.querySelector<HTMLElement>("[data-hero-title]");
      const heroSub = root.querySelector<HTMLElement>("[data-hero-sub]");
      const heroSearch = root.querySelector<HTMLElement>("[data-hero-search]");
      const heroPills = root.querySelectorAll<HTMLElement>("[data-hero-pills] > *");

      // Split the title into words for a richer reveal.
      const titleWords = heroTitle ? splitWords(heroTitle) : [];

      const tl = gsap.timeline({ defaults: { ease: EASE } });

      if (heroBg) {
        gsap.set(heroBg, { scale: 1.18, y: 0 });
        tl.to(heroBg, { scale: 1.02, duration: 1.6, ease: EASE_EXPO }, 0);
      }
      if (heroBadge) {
        tl.from(heroBadge, { y: 20, opacity: 0, duration: 0.7 }, 0.15);
      }
      if (titleWords.length) {
        tl.from(
          titleWords,
          {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            stagger: 0.07,
            ease: "power4.out",
          },
          0.25,
        );
      }
      if (heroSub) {
        tl.from(heroSub, { y: 24, opacity: 0, duration: 0.7 }, 0.6);
      }
      if (heroSearch) {
        tl.from(heroSearch, { y: 28, opacity: 0, scale: 0.98, duration: 0.8 }, 0.75);
      }
      if (heroPills.length) {
        tl.from(
          heroPills,
          { y: 14, opacity: 0, duration: 0.5, stagger: 0.06 },
          0.95,
        );
      }

      // Background parallax on scroll.
      if (heroBg && hero) {
        gsap.to(heroBg, {
          yPercent: 18,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ── STATS COUNTERS ─────────────────────────────────────
      const statValues = root.querySelectorAll<HTMLElement>("[data-stat-value]");
      statValues.forEach((el) => animateNumber(el));

      const statItems = root.querySelectorAll<HTMLElement>("[data-stat-item]");
      if (statItems.length) {
        gsap.from(statItems, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: EASE,
          scrollTrigger: { trigger: statItems[0], start: "top 90%", once: true },
        });
      }

      // ── CATEGORIES SECTION ─────────────────────────────────
      const catSection = root.querySelector<HTMLElement>("[data-categories]");
      if (catSection) {
        const label = catSection.querySelector<HTMLElement>(".section-label");
        const heading = catSection.querySelector<HTMLElement>("h2");
        const cards = catSection.querySelectorAll<HTMLElement>("[data-categories-grid] > *");

        const catTl = gsap.timeline({
          scrollTrigger: { trigger: catSection, start: "top 80%", once: true },
        });
        if (label) catTl.from(label, { x: -20, opacity: 0, duration: 0.6, ease: EASE }, 0);
        if (heading) catTl.from(heading, { y: 22, opacity: 0, duration: 0.7, ease: EASE }, 0.1);
        if (cards.length) {
          catTl.from(
            cards,
            {
              y: 40,
              opacity: 0,
              scale: 0.95,
              duration: 0.7,
              stagger: 0.08,
              ease: EASE_BACK,
            },
            0.25,
          );
        }
      }

      // ── HOW IT WORKS ───────────────────────────────────────
      const howSection = root.querySelector<HTMLElement>("[data-how]");
      if (howSection) {
        const steps = howSection.querySelectorAll<HTMLElement>("[data-how-step]");
        const line = howSection.querySelector<HTMLElement>("[data-how-line]");

        if (line) {
          gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
          gsap.to(line, {
            scaleX: 1,
            duration: 1.2,
            ease: EASE_EXPO,
            scrollTrigger: { trigger: howSection, start: "top 70%", once: true },
          });
        }
        if (steps.length) {
          steps.forEach((step, i) => {
            const icon = step.querySelector<HTMLElement>(".material-symbols-outlined");
            gsap.from(step, {
              y: 40,
              opacity: 0,
              scale: 0.9,
              duration: 0.8,
              delay: i * 0.12,
              ease: EASE_BACK,
              scrollTrigger: { trigger: howSection, start: "top 75%", once: true },
            });
            if (icon) {
              gsap.from(icon, {
                rotate: -90,
                duration: 0.9,
                delay: i * 0.12 + 0.2,
                ease: EASE_BACK,
                scrollTrigger: { trigger: howSection, start: "top 75%", once: true },
              });
            }
          });
        }
      }

      // ── FEATURED PROVIDERS ─────────────────────────────────
      const featSection = root.querySelector<HTMLElement>("[data-featured]");
      if (featSection) {
        const header = featSection.querySelectorAll<HTMLElement>("[data-featured-head] > *");
        const cards = featSection.querySelectorAll<HTMLElement>("[data-featured-grid] > *");

        if (header.length) {
          gsap.from(header, {
            y: 22,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: EASE,
            scrollTrigger: { trigger: featSection, start: "top 80%", once: true },
          });
        }
        if (cards.length) {
          gsap.from(cards, {
            y: 60,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: EASE_EXPO,
            scrollTrigger: { trigger: cards[0], start: "top 85%", once: true },
          });
        }
      }

      // ── NEWSLETTER CTA ─────────────────────────────────────
      const news = root.querySelector<HTMLElement>("[data-newsletter]");
      if (news) {
        gsap.from(news, {
          y: 40,
          opacity: 0,
          scale: 0.97,
          duration: 1,
          ease: EASE_EXPO,
          scrollTrigger: { trigger: news, start: "top 85%", once: true },
        });

        const glows = news.querySelectorAll<HTMLElement>("[data-glow]");
        glows.forEach((g, i) => {
          gsap.to(g, {
            scale: 1.2,
            opacity: 0.5,
            duration: 4 + i * 0.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        });
      }

      markReady(root);
      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return null;
}
