import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { routing } from "@/i18n/routing";

/**
 * Typography:
 *   - Titles  → Merriweather (serif, Google Fonts)
 *   - Body    → Proxima Nova (commercial). Self-host the licensed .woff2 files
 *               in /public/fonts/ — `@font-face` declarations live in globals.css.
 *               Falls back to system sans-serif until files are added.
 */
const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ilehost.mu";
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = `${t("siteName")} | Premium Event Services in Mauritius`;
  const description = t("defaultDescription");

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: title,
      template: `%s | ${t("siteName")}`,
    },
    description,
    keywords: [
      "event services mauritius",
      "wedding mauritius",
      "photographer mauritius",
      "caterer mauritius",
      "venue mauritius",
      "event planner mauritius",
      "mariage ile maurice",
    ],
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: BASE_URL,
      siteName: t("siteName"),
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${merriweather.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />

          {GA_ID && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
              </Script>
            </>
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
