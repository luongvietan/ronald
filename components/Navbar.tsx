"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { href: "/categories/photography", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-white/85 backdrop-blur-xl shadow-sm"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4 max-w-[1200px] mx-auto w-full">
        {/* Logo */}
        <Link
          href="/"
          className={`text-2xl font-extrabold tracking-tighter font-headline transition-colors duration-300 ${
            transparent ? "text-white" : "text-orange-900"
          }`}
        >
          L&apos;Île Host
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-headline font-bold text-sm tracking-wide transition-all duration-200 hover:scale-105 pb-0.5 ${
                  transparent
                    ? active
                      ? "text-white border-b-2 border-white"
                      : "text-white/80 hover:text-white"
                    : active
                      ? "text-orange-900 border-b-2 border-orange-800"
                      : "text-zinc-600 hover:text-orange-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95 ${
              transparent
                ? "bg-white text-primary hover:bg-white/90"
                : "bg-primary text-on-primary hover:bg-primary/90"
            }`}
          >
            List your service
          </button>
          <span
            className={`material-symbols-outlined cursor-pointer text-3xl transition-colors ${
              transparent ? "text-white" : "text-orange-900"
            }`}
          >
            account_circle
          </span>
        </div>

        {/* Mobile hamburger */}
        <MobileMenu transparent={transparent} />
      </div>
    </nav>
  );
}
