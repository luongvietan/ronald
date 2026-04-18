import { BadgeCheck, Handshake, Palmtree, Smartphone } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: { en: "/en/about", fr: "/fr/about" },
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const stats = [
    { value: "7+", label: t("stats.categories") },
    { value: "100%", label: t("stats.verified") },
    { value: "Mauritius", label: t("stats.island") },
    { value: locale === "fr" ? "Gratuit" : "Free", label: t("stats.browse") },
  ];

  const valueKeys = ["quality", "local", "direct", "mobile"] as const;
  const valueIcons = {
    quality: BadgeCheck,
    local: Palmtree,
    direct: Handshake,
    mobile: Smartphone,
  } as const;

  return (
    <div className="pt-20" data-page="about">
      <section data-about-hero className="bg-primary-container text-on-primary-container py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6">{t("heroTitle")}</h1>
          <p className="text-xl opacity-90 leading-relaxed">{t("heroSubtitle")}</p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} data-about-stat className="text-center">
              <div data-about-stat-value className="text-4xl font-extrabold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-on-surface-variant font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section data-about-mission className="bg-surface-container-low py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-on-surface mb-6">{t("missionTitle")}</h2>
          <div className="space-y-4 text-on-surface-variant leading-relaxed text-lg">
            <p>{t("missionP1")}</p>
            <p>{t("missionP2")}</p>
          </div>
        </div>
      </section>

      <section data-about-values className="max-w-[1200px] mx-auto px-6 py-20">
        <h2 className="text-3xl font-extrabold text-on-surface mb-12 text-center">{t("valuesTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {valueKeys.map((k) => {
            const Icon = valueIcons[k];
            return (
            <div
              key={k}
              data-about-value
              className="bg-surface-container-lowest rounded p-8 shadow-sm"
            >
              <Icon aria-hidden className="text-primary size-10 mb-4 block" strokeWidth={1.75} />
              <h3 className="text-xl font-bold text-on-surface mb-2">{t(`values.${k}.title`)}</h3>
              <p className="text-on-surface-variant leading-relaxed">{t(`values.${k}.desc`)}</p>
            </div>
            );
          })}
        </div>
      </section>

      <section data-about-cta className="bg-surface-container-low py-20 px-6 text-center">
        <h2 className="text-3xl font-extrabold text-on-surface mb-4">{t("ctaTitle")}</h2>
        <p className="text-on-surface-variant mb-8 text-lg">{t("ctaSubtitle")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/categories/photography" className="bg-primary text-on-primary px-10 py-4 rounded-full font-bold hover:scale-105 transition-all">
            {t("explore")}
          </Link>
          <Link
            href="/contact"
            className="border-2 border-primary text-primary px-10 py-4 rounded-full font-bold hover:bg-primary hover:text-on-primary transition-all"
          >
            {t("getInTouch")}
          </Link>
        </div>
      </section>
    </div>
  );
}
