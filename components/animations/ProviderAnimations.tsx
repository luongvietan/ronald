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

export default function ProviderAnimations() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = document.querySelector<HTMLElement>("[data-page='provider']");
    if (!root) return;

    const ctx = gsap.context(() => {
      // ── GALLERY — zoom in + tile stagger ──────────────────
      const gallery = root.querySelector<HTMLElement>("[data-provider-gallery]");
      if (gallery) {
        const mainTile = gallery.querySelector<HTMLElement>(":scope > div:first-child");
        const tiles = gallery.querySelectorAll<HTMLElement>(":scope > div");

        if (mainTile) {
          gsap.from(mainTile, {
            scale: 1.15,
            opacity: 0,
            duration: 1.1,
            ease: EASE_EXPO,
          });
        }
        if (tiles.length > 1) {
          gsap.from(Array.from(tiles).slice(1), {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: EASE,
            delay: 0.2,
          });
        }

        // Parallax the main tile image on scroll.
        const mainImg = mainTile?.querySelector<HTMLElement>("img");
        if (mainImg) {
          gsap.to(mainImg, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: gallery,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }

      // ── TITLE + META ───────────────────────────────────────
      const header = root.querySelector<HTMLElement>("[data-provider-head]");
      if (header) {
        const badge = header.querySelector<HTMLElement>("span.inline-block");
        const title = header.querySelector<HTMLElement>("h1");
        const meta = header.querySelector<HTMLElement>("div.flex.flex-wrap");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: header, start: "top 85%", once: true },
        });
        if (badge) tl.from(badge, { y: 10, opacity: 0, duration: 0.5, ease: EASE_BACK }, 0);
        if (title) tl.from(title, { y: 30, opacity: 0, duration: 0.8, ease: EASE_EXPO }, 0.1);
        if (meta) tl.from(meta.children, { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.35);
      }

      // ── ABOUT PARAGRAPH ────────────────────────────────────
      const about = root.querySelector<HTMLElement>("[data-provider-about]");
      if (about) {
        gsap.from(about.children, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: EASE,
          scrollTrigger: { trigger: about, start: "top 85%", once: true },
        });
      }

      // ── SERVICES LIST — pop-in stagger ────────────────────
      const services = root.querySelector<HTMLElement>("[data-provider-services]");
      if (services) {
        const heading = services.querySelector<HTMLElement>("h2");
        const items = services.querySelectorAll<HTMLElement>("li");
        if (heading) {
          gsap.from(heading, {
            y: 18,
            opacity: 0,
            duration: 0.6,
            ease: EASE,
            scrollTrigger: { trigger: services, start: "top 85%", once: true },
          });
        }
        if (items.length) {
          gsap.from(items, {
            x: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: EASE_BACK,
            scrollTrigger: { trigger: services, start: "top 80%", once: true },
          });
        }
      }

      // ── SIDEBAR — slide from right ────────────────────────
      const sidebar = root.querySelector<HTMLElement>("[data-provider-sidebar]");
      if (sidebar) {
        gsap.from(sidebar, {
          x: 40,
          opacity: 0,
          duration: 0.9,
          ease: EASE_EXPO,
          scrollTrigger: { trigger: sidebar, start: "top 85%", once: true },
        });

        const buttons = sidebar.querySelectorAll<HTMLElement>("a.btn");
        if (buttons.length) {
          gsap.from(buttons, {
            scale: 0.9,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: EASE_BACK,
            delay: 0.3,
            scrollTrigger: { trigger: sidebar, start: "top 85%", once: true },
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
