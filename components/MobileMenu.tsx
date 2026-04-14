"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/categories/photography", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const CATEGORIES = [
  { label: "Photography", slug: "photography" },
  { label: "Catering", slug: "catering" },
  { label: "Flowers & Decoration", slug: "flowers-decoration" },
  { label: "Music / DJ", slug: "music-dj" },
  { label: "Venues", slug: "venues" },
  { label: "Event Planner", slug: "event-planner" },
  { label: "Decoration", slug: "decoration" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 text-orange-900"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined text-2xl">
          {open ? "close" : "menu"}
        </span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-out Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-outline-variant">
          <span className="text-xl font-extrabold text-orange-900 font-headline">
            L&apos;Île Host
          </span>
          <button onClick={() => setOpen(false)} className="text-on-surface-variant">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="p-6 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded font-semibold transition-colors ${
                pathname === link.href
                  ? "bg-primary-fixed text-on-primary-fixed"
                  : "text-on-surface hover:bg-surface-container-low"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-4 pt-4 border-t border-outline-variant">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3 px-4">
              Categories
            </p>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface flex items-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-primary text-base">
                  chevron_right
                </span>
                {cat.label}
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <button className="w-full bg-primary text-on-primary py-3 rounded-full font-bold text-sm hover:scale-105 transition-all">
              List your service
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
