"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function DocumentHtmlLang() {
  const pathname = usePathname();

  useEffect(() => {
    const first = pathname.split("/").filter(Boolean)[0];
    const lang =
      first && routing.locales.includes(first as (typeof routing.locales)[number])
        ? first
        : routing.defaultLocale;
    document.documentElement.lang = lang;
  }, [pathname]);

  return null;
}
