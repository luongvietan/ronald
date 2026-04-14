import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal Notices | L'Île Host",
  description: "Legal notices and company information for L'Île Host.",
};

export default function MentionsPage() {
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
          Legal Notices
        </h1>
        <p className="text-on-surface-variant mb-10">Last updated: January 2025</p>

        <div className="space-y-8 text-on-surface leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3">Site Publisher</h2>
            <div className="bg-surface-container-low rounded p-6 space-y-2 text-on-surface-variant">
              <p><strong className="text-on-surface">Company:</strong> L&apos;Île Host</p>
              <p><strong className="text-on-surface">Country:</strong> Republic of Mauritius</p>
              <p>
                <strong className="text-on-surface">Email:</strong>{" "}
                <a href="mailto:hello@ilehost.mu" className="text-primary hover:underline">
                  hello@ilehost.mu
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Hosting</h2>
            <div className="bg-surface-container-low rounded p-6 space-y-2 text-on-surface-variant">
              <p><strong className="text-on-surface">Provider:</strong> Vercel Inc.</p>
              <p><strong className="text-on-surface">Address:</strong> 340 Pine Street, San Francisco, CA 94104, USA</p>
              <p>
                <strong className="text-on-surface">Website:</strong>{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  vercel.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Intellectual Property</h2>
            <p className="text-on-surface-variant">
              The entire content of this website — including but not limited to
              text, photographs, videos, graphics, logos, and icons — is the
              exclusive property of L&apos;Île Host unless otherwise stated.
              Any reproduction, representation, modification, publication, or
              transmission of any or all of the content of this website, in any
              form whatsoever, is prohibited without the prior written
              authorization of L&apos;Île Host.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Limitation of Liability</h2>
            <p className="text-on-surface-variant">
              L&apos;Île Host strives to provide accurate information on this
              website. However, we cannot guarantee that all information is
              always up-to-date, complete, or error-free. L&apos;Île Host
              disclaims all liability for any direct or indirect damages that
              may result from accessing or using this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Applicable Law</h2>
            <p className="text-on-surface-variant">
              This website is governed by the laws of the Republic of Mauritius.
              Any disputes relating to the use of this website shall be subject
              to the exclusive jurisdiction of the courts of Mauritius.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Contact</h2>
            <p className="text-on-surface-variant">
              For any enquiries regarding these legal notices, please contact us
              at{" "}
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
