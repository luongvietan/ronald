"use client";

import { ChevronRight, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

const CATEGORY_SLUGS = [
  { slug: "photography", key: "photography" },
  { slug: "catering", key: "catering" },
  { slug: "flowers-decoration", key: "flowersDecoration" },
  { slug: "music-dj", key: "musicDj" },
  { slug: "venues", key: "venues" },
  { slug: "event-planner", key: "eventPlanner" },
  { slug: "decoration", key: "decoration" },
] as const;

export default function MobileMenu({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer.categories");
  const tMobile = useTranslations("mobileMenu");

  const NAV_LINKS = [
    { href: "/", label: tMobile("home") },
    { href: "/categories/photography", label: t("explore") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-150 ${
          transparent ? "text-white hover:bg-white/15" : "text-primary hover:bg-surface-container"
        }`}
        onClick={() => setOpen(!open)}
        aria-label={open ? tMobile("close") : tMobile("open")}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
      >
        {open ? <X aria-hidden className="size-7" strokeWidth={2} /> : <Menu aria-hidden className="size-7" strokeWidth={2} />}
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        id="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label={tMobile("navAria")}
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-surface-container-lowest z-50 shadow-[0_12px_32px_rgba(34,34,34,0.12)] transform transition-transform duration-200 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-border-strong">
          <span className="text-xl font-extrabold text-primary font-headline">L&apos;Île Host</span>
          <div className="flex items-center gap-2">
            <div className="text-primary">
              <LocaleSwitcher />
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={tMobile("close")}
              className="w-9 h-9 flex items-center justify-center rounded-full text-text-secondary hover:bg-surface-container transition-colors duration-150"
            >
              <X aria-hidden className="size-6" strokeWidth={2} />
            </button>
          </div>
        </div>

        <nav className="p-6 flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-96px)]">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-[8px] font-semibold transition-colors duration-150 ${
                  active
                    ? "bg-primary-fixed text-on-primary-fixed"
                    : "text-text-primary hover:bg-surface-container-low"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="mt-4 pt-4 border-t border-border-strong">
            <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-3 px-4">
              {tMobile("categories")}
            </p>
            {CATEGORY_SLUGS.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-[8px] text-sm text-text-secondary hover:bg-surface-container-low hover:text-text-primary flex items-center gap-2 transition-colors duration-150"
              >
                <ChevronRight aria-hidden className="text-primary size-4 shrink-0" strokeWidth={2} />
                {tFooter(cat.key)}
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
              {t("listService")}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
