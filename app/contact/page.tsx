import type { Metadata } from "next";
import ContactPageForm from "./ContactPageForm";

export const metadata: Metadata = {
  title: "Contact | L'Île Host",
  description:
    "Get in touch with the L'Île Host team. Whether you're a service provider who wants to be listed, or a user with questions, we're here to help.",
};

export default function ContactPage() {
  const contactInfo = [
    {
      icon: "mail",
      label: "Email",
      value: "hello@ilehost.mu",
      href: "mailto:hello@ilehost.mu",
    },
    {
      icon: "chat",
      label: "WhatsApp",
      value: "+230 5XXX XXXX",
      href: "https://wa.me/2305XXXXXXX",
    },
    {
      icon: "location_on",
      label: "Based in",
      value: "Mauritius, Indian Ocean",
      href: null,
    },
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-surface-container-low py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-4">
            Get in Touch
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Questions about listing your service? Need help finding a provider?
            We&apos;re here to help.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-on-surface mb-6">
              Contact Info
            </h2>
            <div className="flex flex-col gap-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
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
                      <p className="text-on-surface font-semibold">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Provider CTA */}
            <div className="mt-10 p-6 bg-primary-fixed rounded">
              <h3 className="font-bold text-on-primary-fixed mb-2">
                Want to list your service?
              </h3>
              <p className="text-on-primary-fixed/80 text-sm mb-4">
                Join our platform and reach couples and event planners across
                Mauritius. Listing is free during Phase 1.
              </p>
              <a
                href="mailto:hello@ilehost.mu?subject=I want to list my service"
                className="inline-block bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all"
              >
                Apply to list
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-on-surface mb-6">
              Send a message
            </h2>
            <ContactPageForm />
          </div>
        </div>
      </div>
    </div>
  );
}
