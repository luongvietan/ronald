"use client";

import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function NewsletterForm() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          email: email,
          subject: "New Newsletter Subscription",
          from_name: "Ronald Platform",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const loading = status === "loading";
  const error = status === "error";

  if (status === "success") {
    return (
      <p role="status" aria-live="polite" className="inline-flex items-center gap-2 text-white font-semibold">
        <CircleCheck aria-hidden className="size-5 shrink-0" strokeWidth={2} />
        {t("success")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full md:w-auto flex flex-col sm:flex-row gap-3" aria-label={t("aria")} data-on-dark="true">
      <div className="flex flex-col gap-1 flex-1 md:w-72">
        <label htmlFor="home-newsletter-email" className="sr-only">
          {t("emailLabel")}
        </label>
        <input
          id="home-newsletter-email"
          type="email"
          required
          autoComplete="email"
          placeholder={t("placeholder")}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setStatus("idle");
          }}
          disabled={loading}
          aria-invalid={error}
          aria-describedby={error ? "home-newsletter-error" : undefined}
          className={`bg-white border text-text-primary placeholder:text-text-secondary rounded-[36px] px-6 py-3.5 outline-none text-sm transition-all duration-150 shadow-sm focus:ring-2 focus:ring-white/40 ${
            error ? "border-error" : "border-white/20 focus:border-white"
          }`}
        />
        {error && (
          <p id="home-newsletter-error" role="alert" className="text-xs text-white font-medium ml-4 mt-1">
            {t("invalidEmail")}
          </p>
        )}
      </div>
      <button type="submit" className="btn bg-white text-primary hover:bg-white/90 active:scale-95 transition-all duration-150 font-bold px-8 shadow-md" disabled={loading} data-loading={loading ? "true" : "false"} aria-busy={loading}>
        {loading ? (
          <>
            <span className="spinner" aria-hidden="true" />
            {t("joining")}
          </>
        ) : (
          t("join")
        )}
      </button>
    </form>
  );
}
