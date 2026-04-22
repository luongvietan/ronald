"use client";

import { ChevronRight, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, usePathname } from "@/i18n/navigation";
import Image from "next/image";
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
  const [mounted, setMounted] = useState(false);
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
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

      {mounted &&
        createPortal(
          <>
            {open && (
              <div
                className="fixed inset-0 z-[90] bg-black/40 md:hidden"
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />
            )}

            <div
              id="mobile-menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label={tMobile("navAria")}
              className={`fixed inset-y-0 right-0 z-[100] w-full max-w-sm bg-surface-container-lowest shadow-[0_12px_32px_rgba(34,34,34,0.12)] transform transition-transform duration-200 md:hidden ${
                open ? "translate-x-0" : "pointer-events-none translate-x-full"
              }`}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-4 border-b border-border-strong px-5 py-5">
                  <div className="min-w-0">
                    <div className="relative h-16 w-64">
                      <Image
                        src="/logo.png"
                        alt="Moris Events"
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                    <p className="mt-1 text-sm text-text-secondary">{tMobile("navAria")}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <div className="text-primary">
                      <LocaleSwitcher />
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label={tMobile("close")}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors duration-150 hover:bg-surface-container"
                    >
                      <X aria-hidden className="size-6" strokeWidth={2} />
                    </button>
                  </div>
                </div>

                <nav className="flex-1 overflow-y-auto px-5 py-5">
                  <div className="flex flex-col gap-2">
                    {NAV_LINKS.map((link) => {
                      const active = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setOpen(false)}
                          className={`rounded-2xl border px-4 py-3.5 text-base font-semibold transition-colors duration-150 ${
                            active
                              ? "border-primary/15 bg-primary-fixed text-on-primary-fixed"
                              : "border-border-subtle bg-surface-container-low text-text-primary hover:bg-surface-container"
                          }`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-6 rounded-[20px] bg-surface-container-low p-3">
                    <p className="px-2 text-xs font-bold uppercase tracking-[0.18em] text-text-secondary">
                      {tMobile("categories")}
                    </p>
                    <div className="mt-3 flex flex-col gap-1">
                      {CATEGORY_SLUGS.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/categories/${cat.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex items-start gap-2 rounded-[12px] px-3 py-3 text-sm font-medium text-text-secondary transition-colors duration-150 hover:bg-white hover:text-text-primary"
                        >
                          <ChevronRight aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2} />
                          <span className="leading-5">{tFooter(cat.key)}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pb-1">
                    <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                      {t("listService")}
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
