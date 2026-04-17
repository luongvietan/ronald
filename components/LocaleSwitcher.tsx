"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-current/20 px-1 py-0.5 text-[11px] font-extrabold tracking-wide"
      role="navigation"
      aria-label="Language"
    >
      <Link
        href={pathname}
        locale="en"
        className={`rounded-full px-2 py-0.5 transition-colors ${
          locale === "en"
            ? "bg-white/25 text-inherit"
            : "text-inherit/70 hover:text-inherit"
        }`}
      >
        EN
      </Link>
      <span className="text-inherit/40" aria-hidden>
        |
      </span>
      <Link
        href={pathname}
        locale="fr"
        className={`rounded-full px-2 py-0.5 transition-colors ${
          locale === "fr"
            ? "bg-white/25 text-inherit"
            : "text-inherit/70 hover:text-inherit"
        }`}
      >
        FR
      </Link>
    </div>
  );
}
