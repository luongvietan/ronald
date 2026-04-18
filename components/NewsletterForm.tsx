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
      await new Promise((r) => setTimeout(r, 500));
      setStatus("success");
      setEmail("");
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
          className={`bg-white/15 border text-white placeholder:text-white/55 rounded-[36px] px-6 py-3.5 outline-none text-sm transition-colors duration-150 focus:bg-white/20 ${
            error ? "border-white/90" : "border-white/25 focus:border-white"
          }`}
        />
        {error && (
          <p id="home-newsletter-error" role="alert" className="text-xs text-white/90 ml-4">
            {t("invalidEmail")}
          </p>
        )}
      </div>
      <button type="submit" className="btn btn-on-dark" disabled={loading} data-loading={loading ? "true" : "false"} aria-busy={loading}>
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
