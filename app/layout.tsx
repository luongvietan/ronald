import type { Metadata } from "next";
import { Manrope, Be_Vietnam_Pro } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ilehost.mu";
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "L'Île Host | Premium Event Services in Mauritius",
    template: "%s | L'Île Host",
  },
  description:
    "Mauritius's premier marketplace for event services. Find photographers, caterers, venues, florists, DJs, and event planners for your perfect event.",
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
    locale: "en_US",
    url: BASE_URL,
    siteName: "L'Île Host",
    title: "L'Île Host | Premium Event Services in Mauritius",
    description:
      "Curated local experts for weddings, galas, and celebrations in Mauritius.",
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Île Host | Premium Event Services in Mauritius",
    description:
      "Curated local experts for weddings, galas, and celebrations in Mauritius.",
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
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${beVietnamPro.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Google Analytics */}
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
      </body>
    </html>
  );
}
