import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("mentions.metaTitle"),
    description: t("mentions.metaDescription"),
    alternates: {
      canonical: `/${locale}/legal/mentions`,
      languages: { en: "/en/legal/mentions", fr: "/fr/legal/mentions" },
    },
  };
}

export default async function MentionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return (
    <div className="pt-20" data-page="legal">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div data-legal-back className="mb-8">
          <Link href="/" className="text-primary text-sm hover:underline flex items-center gap-1">
            <ArrowLeft aria-hidden className="size-4 shrink-0" strokeWidth={2} />
            {t("back")}
          </Link>
        </div>

        <h1 className="text-4xl font-extrabold text-on-surface mb-2">{t("mentions.title")}</h1>
        <p data-legal-updated className="text-on-surface-variant mb-10">{t("updated")}</p>

        <div data-legal-body className="space-y-8 text-on-surface leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3">{t("mentions.publisherTitle")}</h2>
            <div className="bg-surface-container-low rounded p-6 space-y-2 text-on-surface-variant">
              <p>
                <strong className="text-on-surface">{t("mentions.company")}</strong> L&apos;Île Host
              </p>
              <p>
                <strong className="text-on-surface">{t("mentions.country")}</strong> Republic of Mauritius
              </p>
              <p>
                <strong className="text-on-surface">{t("mentions.email")}</strong>{" "}
                <a href="mailto:hello@ilehost.mu" className="text-primary hover:underline">
                  hello@ilehost.mu
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">{t("mentions.hostingTitle")}</h2>
            <div className="bg-surface-container-low rounded p-6 space-y-2 text-on-surface-variant">
              <p>
                <strong className="text-on-surface">{t("mentions.provider")}</strong> Vercel Inc.
              </p>
              <p>
                <strong className="text-on-surface">{t("mentions.address")}</strong> 340 Pine Street, San Francisco, CA 94104, USA
              </p>
              <p>
                <strong className="text-on-surface">{t("mentions.website")}</strong>{" "}
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  vercel.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">{t("mentions.ipTitle")}</h2>
            <p className="text-on-surface-variant">{t("mentions.ipP")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">{t("mentions.liabTitle")}</h2>
            <p className="text-on-surface-variant">{t("mentions.liabP")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">{t("mentions.lawTitle")}</h2>
            <p className="text-on-surface-variant">{t("mentions.lawP")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">{t("mentions.contactTitle")}</h2>
            <p className="text-on-surface-variant">
              {t("mentions.contactP")}{" "}
              <a href="mailto:legal@ilehost.mu" className="text-primary hover:underline">
                legal@ilehost.mu
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
