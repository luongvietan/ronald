import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactPageForm from "./ContactPageForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { en: "/en/contact", fr: "/fr/contact" },
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  const contactInfo = [
    { icon: "mail", label: t("email"), value: "hello@ilehost.mu", href: "mailto:hello@ilehost.mu" },
    { icon: "chat", label: t("whatsapp"), value: "+230 5XXX XXXX", href: "https://wa.me/2305XXXXXXX" },
    { icon: "location_on", label: t("basedIn"), value: t("locationValue"), href: null },
  ];

  return (
    <div className="pt-20">
      <section className="bg-surface-container-low py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-4">{t("title")}</h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">{t("subtitle")}</p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-on-surface mb-6">{t("infoTitle")}</h2>
            <div className="flex flex-col gap-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-on-surface font-semibold hover:text-primary transition-colors"
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-on-surface font-semibold">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-primary-fixed rounded-[8px]">
              <h3 className="font-bold text-on-primary-fixed mb-2">{t("ctaTitle")}</h3>
              <p className="text-on-primary-fixed/80 text-sm mb-4">{t("ctaBody")}</p>
              <a href="mailto:hello@ilehost.mu?subject=I want to list my service" className="btn btn-primary">
                {t("ctaButton")}
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-on-surface mb-6">{t("formTitle")}</h2>
            <ContactPageForm />
          </div>
        </div>
      </div>
    </div>
  );
}
