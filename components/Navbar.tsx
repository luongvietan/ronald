"use client";

import { CircleUser } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("nav");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const transparent = isHome && !scrolled;

  const NAV_LINKS = [
    { href: "/categories/photography", label: t("explore") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <nav
      aria-label="Primary"
      data-on-dark={transparent ? "true" : "false"}
      className={`fixed top-0 w-full z-50 transition-colors duration-150 ${
        transparent
          ? "bg-transparent"
          : "bg-white/90 backdrop-blur-xl shadow-[0_1px_2px_rgba(34,34,34,0.06)] border-b border-border-subtle"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4 max-w-[1200px] mx-auto w-full">
        <Link
          href="/"
          aria-label={t("homeAria")}
          className="relative h-20 w-80 transition-opacity hover:opacity-90"
        >
          <Image
            src="/logo.png"
            alt="Moris Events"
            fill
            className={`object-contain object-left transition-all duration-300 ${transparent ? "brightness-0 invert" : ""}`}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const active = pathname?.startsWith(link.href) ?? false;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`font-headline font-bold text-sm tracking-wide pb-0.5 transition-colors duration-150 ${
                  transparent
                    ? active
                      ? "text-white border-b-2 border-white"
                      : "text-white/80 hover:text-white"
                    : active
                      ? "text-primary border-b-2 border-primary"
                      : "text-text-secondary hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className={transparent ? "text-white" : "text-primary"}>
            <LocaleSwitcher onDark={transparent} />
          </div>
          <Link href="/contact" className={`btn ${transparent ? "btn-on-dark" : "btn-primary"}`}>
            {t("listService")}
          </Link>
          <button
            type="button"
            aria-label={t("account")}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-150 ${
              transparent ? "text-white hover:bg-white/15" : "text-primary hover:bg-surface-container"
            }`}
          >
            <CircleUser aria-hidden className="size-7" strokeWidth={1.75} />
          </button>
        </div>

        <MobileMenu transparent={transparent} />
      </div>
    </nav>
  );
}
