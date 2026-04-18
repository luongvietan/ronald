import { Camera, Globe, Share2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const CATEGORY_SLUGS = [
  { slug: "photography", key: "photography" },
  { slug: "catering", key: "catering" },
  { slug: "flowers-decoration", key: "flowersDecoration" },
  { slug: "music-dj", key: "musicDj" },
  { slug: "venues", key: "venues" },
  { slug: "event-planner", key: "eventPlanner" },
  { slug: "decoration", key: "decoration" },
] as const;

const SOCIALS = [
  { label: "Facebook", Icon: Share2, href: "#" },
  { label: "Instagram", Icon: Camera, href: "#" },
  { label: "Website", Icon: Globe, href: "#" },
] as const;

export default async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="w-full mt-20 rounded-t-[40px] bg-surface-container-low text-text-secondary">
      <div className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="text-xl font-bold text-primary mb-4 font-headline">L&apos;Île Host</div>
            <p className="text-text-secondary max-w-xs leading-relaxed text-sm">{t("tagline")}</p>
            <ul className="flex gap-3 mt-6" aria-label="Social links">
              {SOCIALS.map(({ Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-text-secondary hover:bg-primary hover:text-on-primary transition-colors duration-150"
                  >
                    <Icon aria-hidden className="size-4" strokeWidth={2} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title={t("categoriesTitle")}>
            {CATEGORY_SLUGS.map((cat) => (
              <FooterLink key={cat.slug} href={`/categories/${cat.slug}`}>
                {t(`categories.${cat.key}`)}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={t("platformTitle")}>
            <FooterLink href="/about">{t("aboutUs")}</FooterLink>
            <FooterLink href="/contact">{t("contactLink")}</FooterLink>
            <FooterLink href="/contact">{t("listYourService")}</FooterLink>
            <FooterLink href="/search">{t("searchProviders")}</FooterLink>
          </FooterColumn>

          <FooterColumn title={t("legalTitle")}>
            <FooterLink href="/legal/cgu">{t("terms")}</FooterLink>
            <FooterLink href="/legal/privacy">{t("privacy")}</FooterLink>
            <FooterLink href="/legal/mentions">{t("mentions")}</FooterLink>
          </FooterColumn>
        </div>

        <div className="pt-8 border-t border-border-strong flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-xs">{t("copyright", { year })}</p>
          <p className="text-text-secondary text-xs">{t("madeIn")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-bold text-primary uppercase tracking-widest text-xs mb-5">{title}</h4>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-text-secondary hover:text-primary hover:underline transition-colors duration-150 text-sm">
        {children}
      </Link>
    </li>
  );
}
