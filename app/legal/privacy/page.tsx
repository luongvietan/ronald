import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | L'Île Host",
  description: "Privacy Policy for the L'Île Host platform — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="text-primary text-sm hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-extrabold text-on-surface mb-2">
          Privacy Policy
        </h1>
        <p className="text-on-surface-variant mb-10">Last updated: January 2025</p>

        <div className="space-y-8 text-on-surface leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Who We Are</h2>
            <p className="text-on-surface-variant">
              L&apos;Île Host (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the event
              services marketplace at ilehost.mu. We are committed to protecting
              your personal data and respecting your privacy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Data We Collect</h2>
            <p className="text-on-surface-variant mb-3">
              We may collect the following types of personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>
                <strong>Contact data:</strong> Name, email address, and phone
                number when you submit a contact form or enquiry.
              </li>
              <li>
                <strong>Usage data:</strong> Pages visited, time spent on the
                site, browser type, and IP address (via analytics tools).
              </li>
              <li>
                <strong>Communication data:</strong> Messages you send through
                contact forms.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. How We Use Your Data</h2>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>To respond to your enquiries and contact form submissions.</li>
              <li>To improve the Platform based on usage analytics.</li>
              <li>To send you relevant updates (only if you opt in).</li>
              <li>To maintain platform security and prevent abuse.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Cookies & Analytics</h2>
            <p className="text-on-surface-variant">
              We use Google Analytics to understand how visitors use our
              Platform. This tool may set cookies on your device. You can opt
              out of Google Analytics by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Data Sharing</h2>
            <p className="text-on-surface-variant">
              We do not sell or rent your personal data to third parties. We may
              share data with trusted service providers (such as hosting and
              analytics platforms) who process data on our behalf under
              appropriate data protection agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Data Retention</h2>
            <p className="text-on-surface-variant">
              We retain personal data only as long as necessary for the purposes
              for which it was collected, or as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Your Rights</h2>
            <p className="text-on-surface-variant mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data.</li>
              <li>Object to the processing of your data.</li>
            </ul>
            <p className="text-on-surface-variant mt-3">
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:privacy@ilehost.mu"
                className="text-primary hover:underline"
              >
                privacy@ilehost.mu
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Security</h2>
            <p className="text-on-surface-variant">
              We implement appropriate technical and organizational measures to
              protect your data against unauthorized access, alteration,
              disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Changes to This Policy</h2>
            <p className="text-on-surface-variant">
              We may update this Privacy Policy from time to time. We will
              notify you of significant changes by posting the updated policy on
              this page with a new &quot;Last updated&quot; date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
