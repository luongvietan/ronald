import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LegalBody from "@/components/LegalBody";
import {
  getLegalPageContent,
  localize,
  pickLocalizedPortable,
} from "@/lib/sanity/pageContent";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "legal" });
  const content = await getLegalPageContent("cgu");
  return {
    title: localize(content?.seo?.metaTitle, loc, t("cgu.metaTitle")),
    description: localize(content?.seo?.metaDescription, loc, t("cgu.metaDescription")),
    alternates: {
      canonical: `/${locale}/legal/cgu`,
      languages: { en: "/en/legal/cgu", fr: "/fr/legal/cgu" },
    },
  };
}

export default async function CGUPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "legal" });
  const content = await getLegalPageContent("cgu");
  const body = pickLocalizedPortable(content?.bodyEn, content?.bodyFr, loc);

  return (
    <div className="pt-20" data-page="legal">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div data-legal-back className="mb-8">
          <Link href="/" className="text-primary text-sm hover:underline flex items-center gap-1">
            <ArrowLeft aria-hidden className="size-4 shrink-0" strokeWidth={2} />
            {t("back")}
          </Link>
        </div>

        <h1 className="text-4xl font-extrabold text-on-surface mb-2">
          {localize(content?.title, loc, t("cgu.title"))}
        </h1>
        <p data-legal-updated className="text-on-surface-variant mb-10">
          {localize(content?.lastUpdated, loc, t("updated"))}
        </p>

        <div data-legal-body className="prose-custom space-y-8 text-on-surface leading-relaxed">
          {body ? (
            <LegalBody value={body} />
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold mb-3">{t("cgu.s1h")}</h2>
                <p className="text-on-surface-variant">{t("cgu.s1p")}</p>
              </section>
              <section>
                <h2 className="text-xl font-bold mb-3">{t("cgu.s2h")}</h2>
                <p className="text-on-surface-variant">{t("cgu.s2p")}</p>
              </section>
              <section>
                <h2 className="text-xl font-bold mb-3">{t("cgu.s3h")}</h2>
                <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
                  <li>{t("cgu.s3l1")}</li>
                  <li>{t("cgu.s3l2")}</li>
                  <li>{t("cgu.s3l3")}</li>
                  <li>{t("cgu.s3l4")}</li>
                </ul>
              </section>
              <section>
                <h2 className="text-xl font-bold mb-3">{t("cgu.s4h")}</h2>
                <p className="text-on-surface-variant">{t("cgu.s4p")}</p>
              </section>
              <section>
                <h2 className="text-xl font-bold mb-3">{t("cgu.s5h")}</h2>
                <p className="text-on-surface-variant">{t("cgu.s5p")}</p>
              </section>
              <section>
                <h2 className="text-xl font-bold mb-3">{t("cgu.s6h")}</h2>
                <p className="text-on-surface-variant">{t("cgu.s6p")}</p>
              </section>
              <section>
                <h2 className="text-xl font-bold mb-3">{t("cgu.s7h")}</h2>
                <p className="text-on-surface-variant">{t("cgu.s7p")}</p>
              </section>
              <section>
                <h2 className="text-xl font-bold mb-3">{t("cgu.s8h")}</h2>
                <p className="text-on-surface-variant">{t("cgu.s8p")}</p>
              </section>
              <section>
                <h2 className="text-xl font-bold mb-3">{t("cgu.s9h")}</h2>
                <p className="text-on-surface-variant">
                  {t("cgu.s9p")}{" "}
                  <a href="mailto:legal@ilehost.mu" className="text-primary hover:underline">
                    legal@ilehost.mu
                  </a>
                  .
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
