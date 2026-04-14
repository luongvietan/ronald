"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { href: "/categories/photography", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 max-w-[1200px] mx-auto w-full">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tighter text-orange-900 font-headline"
        >
          L&apos;Île Host
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-headline font-bold text-sm tracking-wide transition-all hover:scale-105 ${
                pathname?.startsWith(link.href)
                  ? "text-orange-900 border-b-2 border-orange-800 pb-1"
                  : "text-zinc-600 hover:text-orange-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button className="bg-primary text-on-primary px-6 py-2 rounded-full font-semibold text-sm hover:scale-105 transition-all">
            List your service
          </button>
          <span className="material-symbols-outlined text-orange-900 cursor-pointer text-3xl">
            account_circle
          </span>
        </div>

        {/* Mobile hamburger */}
        <MobileMenu />
      </div>
    </nav>
  );
}
