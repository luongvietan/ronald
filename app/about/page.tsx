import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | L'Île Host",
  description:
    "L'Île Host is Mauritius's premium marketplace connecting event planners with the island's best service providers — photographers, caterers, venues, and more.",
};

export default function AboutPage() {
  const stats = [
    { value: "7+", label: "Service Categories" },
    { value: "100%", label: "Verified Providers" },
    { value: "Mauritius", label: "Island-focused" },
    { value: "Free", label: "To Browse" },
  ];

  const values = [
    {
      icon: "verified",
      title: "Curated Quality",
      description:
        "Every provider on our platform is manually reviewed to ensure they meet our quality standards.",
    },
    {
      icon: "island",
      title: "Local Expertise",
      description:
        "We exclusively feature professionals who know the Mauritian landscape, culture, and venues intimately.",
    },
    {
      icon: "handshake",
      title: "Direct Connection",
      description:
        "We connect you directly with providers — no middlemen, no hidden fees.",
    },
    {
      icon: "devices",
      title: "Mobile-First",
      description:
        "Built from the ground up for mobile users, because that's how Mauritius browses.",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-primary-container text-on-primary-container py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            Making Mauritius Events Extraordinary
          </h1>
          <p className="text-xl opacity-90 leading-relaxed">
            L&apos;Île Host is the island&apos;s first premium marketplace
            dedicated to connecting event organizers with the finest local
            service providers — from intimate beach weddings to large corporate
            galas.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-extrabold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-on-surface-variant font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-surface-container-low py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-on-surface mb-6">
            Our Mission
          </h2>
          <div className="space-y-4 text-on-surface-variant leading-relaxed text-lg">
            <p>
              Planning an event in Mauritius is a beautiful undertaking, but
              finding the right professionals can be overwhelming. L&apos;Île Host
              was created to solve that problem — bringing together the very best
              photographers, caterers, floral designers, musicians, venues, and
              event planners in one trusted directory.
            </p>
            <p>
              We believe that every event — whether a wedding on the beach, a
              corporate gathering in Port Louis, or a birthday celebration in
              Grand Baie — deserves world-class service delivered by people who
              truly understand the island.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <h2 className="text-3xl font-extrabold text-on-surface mb-12 text-center">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-surface-container-lowest rounded p-8 shadow-sm"
            >
              <span className="material-symbols-outlined text-primary text-4xl mb-4 block">
                {v.icon}
              </span>
              <h3 className="text-xl font-bold text-on-surface mb-2">
                {v.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-container-low py-20 px-6 text-center">
        <h2 className="text-3xl font-extrabold text-on-surface mb-4">
          Ready to find your perfect provider?
        </h2>
        <p className="text-on-surface-variant mb-8 text-lg">
          Browse our curated selection of Mauritius event professionals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/categories/photography"
            className="bg-primary text-on-primary px-10 py-4 rounded-full font-bold hover:scale-105 transition-all"
          >
            Explore Providers
          </Link>
          <Link
            href="/contact"
            className="border-2 border-primary text-primary px-10 py-4 rounded-full font-bold hover:bg-primary hover:text-on-primary transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
