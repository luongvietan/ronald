import type { ReactNode } from "react";
import { Merriweather } from "next/font/google";
import DocumentHtmlLang from "@/components/DocumentHtmlLang";
import { routing } from "@/i18n/routing";
import "./globals.css";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

/**
 * Next.js requires a single root `<html>` / `<body>`.
 * Locale-specific UI lives in `[locale]/layout.tsx`; routes like `/studio` skip that segment.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={routing.defaultLocale}
      className={`${merriweather.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-dvh flex flex-col bg-surface text-on-surface">
        <DocumentHtmlLang />
        {children}
      </body>
    </html>
  );
}
