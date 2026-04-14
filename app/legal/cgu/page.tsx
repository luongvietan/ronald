import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use (CGU) | L'Île Host",
  description: "General Terms of Use for the L'Île Host platform.",
};

export default function CGUPage() {
  return (
    <div className="pt-20">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="text-primary text-sm hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-extrabold text-on-surface mb-2">
          Terms of Use
        </h1>
        <p className="text-on-surface-variant mb-10">
          Last updated: January 2025
        </p>

        <div className="prose-custom space-y-8 text-on-surface leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Introduction</h2>
            <p className="text-on-surface-variant">
              Welcome to L&apos;Île Host (&quot;the Platform&quot;). By
              accessing or using our website at ilehost.mu, you agree to comply
              with and be bound by these General Terms of Use. Please read them
              carefully before using the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Purpose of the Platform</h2>
            <p className="text-on-surface-variant">
              L&apos;Île Host is an online directory and marketplace connecting
              individuals and organizations planning events in Mauritius with
              local service providers (photographers, caterers, venues, etc.).
              The Platform facilitates introductions but is not a party to any
              agreement made between users and providers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Use of the Platform</h2>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>You must be at least 18 years of age to use this Platform.</li>
              <li>
                You agree not to use the Platform for any unlawful purpose or in
                any way that could damage, disable, or impair the service.
              </li>
              <li>
                You must not attempt to gain unauthorized access to any part of
                the Platform.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of any
                account credentials you create.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Provider Listings</h2>
            <p className="text-on-surface-variant">
              Service provider profiles are created and managed by L&apos;Île
              Host&apos;s editorial team during Phase 1. All information is
              provided in good faith. L&apos;Île Host does not guarantee the
              accuracy, completeness, or quality of provider information and
              disclaims any liability for agreements made between users and
              providers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              5. Intellectual Property
            </h2>
            <p className="text-on-surface-variant">
              All content on the Platform — including text, images, logos, and
              design — is the property of L&apos;Île Host or its licensors and
              is protected by applicable intellectual property laws. You may not
              reproduce, distribute, or create derivative works without prior
              written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Limitation of Liability</h2>
            <p className="text-on-surface-variant">
              L&apos;Île Host provides the Platform &quot;as is&quot; without
              warranties of any kind. We shall not be liable for any indirect,
              incidental, or consequential damages arising from your use of the
              Platform or your interactions with any service provider.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Modifications</h2>
            <p className="text-on-surface-variant">
              L&apos;Île Host reserves the right to modify these Terms at any
              time. Continued use of the Platform after changes constitutes
              acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Governing Law</h2>
            <p className="text-on-surface-variant">
              These Terms are governed by the laws of the Republic of Mauritius.
              Any disputes shall be subject to the exclusive jurisdiction of the
              courts of Mauritius.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Contact</h2>
            <p className="text-on-surface-variant">
              For questions about these Terms, please contact us at{" "}
              <a
                href="mailto:legal@ilehost.mu"
                className="text-primary hover:underline"
              >
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
