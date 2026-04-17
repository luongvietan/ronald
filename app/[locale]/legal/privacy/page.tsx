import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LegalAnimations from "@/components/animations/LegalAnimations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("privacy.metaTitle"),
    description: t("privacy.metaDescription"),
    alternates: {
      canonical: `/${locale}/legal/privacy`,
      languages: { en: "/en/legal/privacy", fr: "/fr/legal/privacy" },
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return (
    <div className="pt-20" data-page="legal">
      <LegalAnimations />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div data-legal-back className="mb-8">
          <Link href="/" className="text-primary text-sm hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            {t("back")}
          </Link>
        </div>

        <h1 className="text-4xl font-extrabold text-on-surface mb-2">{t("privacy.title")}</h1>
        <p data-legal-updated className="text-on-surface-variant mb-10">{t("updated")}</p>

        <div data-legal-body className="space-y-8 text-on-surface leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3">{t("privacy.s1h")}</h2>
            <p className="text-on-surface-variant">{t("privacy.s1p")}</p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-3">{t("privacy.s2h")}</h2>
            <p className="text-on-surface-variant mb-3">{t("privacy.s2intro")}</p>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>{t("privacy.s2l1")}</li>
              <li>{t("privacy.s2l2")}</li>
              <li>{t("privacy.s2l3")}</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-3">{t("privacy.s3h")}</h2>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>{t("privacy.s3l1")}</li>
              <li>{t("privacy.s3l2")}</li>
              <li>{t("privacy.s3l3")}</li>
              <li>{t("privacy.s3l4")}</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-3">{t("privacy.s4h")}</h2>
            <p className="text-on-surface-variant">
              {t("privacy.s4p")}{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-3">{t("privacy.s5h")}</h2>
            <p className="text-on-surface-variant">{t("privacy.s5p")}</p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-3">{t("privacy.s6h")}</h2>
            <p className="text-on-surface-variant">{t("privacy.s6p")}</p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-3">{t("privacy.s7h")}</h2>
            <p className="text-on-surface-variant mb-3">{t("privacy.s7intro")}</p>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>{t("privacy.s7l1")}</li>
              <li>{t("privacy.s7l2")}</li>
              <li>{t("privacy.s7l3")}</li>
              <li>{t("privacy.s7l4")}</li>
            </ul>
            <p className="text-on-surface-variant mt-3">
              {t("privacy.s7contact")}{" "}
              <a href="mailto:privacy@ilehost.mu" className="text-primary hover:underline">
                privacy@ilehost.mu
              </a>
              .
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-3">{t("privacy.s8h")}</h2>
            <p className="text-on-surface-variant">{t("privacy.s8p")}</p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-3">{t("privacy.s9h")}</h2>
            <p className="text-on-surface-variant">{t("privacy.s9p")}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
