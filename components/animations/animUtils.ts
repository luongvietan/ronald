"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const EASE = "power3.out";
export const EASE_EXPO = "expo.out";
export const EASE_BACK = "back.out(1.4)";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Mark animated roots so global CSS reveal fallback can clear hidden state. */
export function markReady(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-anim]").forEach((el) => {
    el.setAttribute("data-anim-ready", "");
  });
  document.documentElement.classList.add("anim-ready");
}

/** Animate number text (supports prefix/suffix). Keeps non-numeric values static. */
export function animateNumber(
  el: HTMLElement,
  opts?: { duration?: number; start?: string },
) {
  const raw = el.textContent?.trim() ?? "";
  const match = raw.match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const target = parseFloat(numStr);
  const isFloat = numStr.includes(".");
  const state = { v: 0 };

  return gsap.to(state, {
    v: target,
    duration: opts?.duration ?? 1.6,
    ease: EASE_EXPO,
    scrollTrigger: {
      trigger: el,
      start: opts?.start ?? "top 85%",
      once: true,
    },
    onUpdate: () => {
      const v = isFloat ? state.v.toFixed(1) : Math.round(state.v).toString();
      el.textContent = `${prefix}${v}${suffix}`;
    },
  });
}

/** Split text into per-word spans for reveal animations (idempotent). */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.split === "done") {
    return Array.from(el.querySelectorAll<HTMLElement>(".anim-word"));
  }
  const text = el.textContent ?? "";
  el.textContent = "";
  const words: HTMLElement[] = [];
  text.split(/(\s+)/).forEach((chunk) => {
    if (/^\s+$/.test(chunk)) {
      el.appendChild(document.createTextNode(chunk));
      return;
    }
    const outer = document.createElement("span");
    outer.className = "anim-word-outer";
    outer.style.display = "inline-block";
    outer.style.overflow = "hidden";
    outer.style.verticalAlign = "bottom";
    outer.style.lineHeight = "1";
    outer.style.paddingBottom = "0.08em";
    const inner = document.createElement("span");
    inner.className = "anim-word";
    inner.style.display = "inline-block";
    inner.style.willChange = "transform,opacity";
    inner.textContent = chunk;
    outer.appendChild(inner);
    el.appendChild(outer);
    words.push(inner);
  });
  el.dataset.split = "done";
  return words;
}
