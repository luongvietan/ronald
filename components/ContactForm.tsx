"use client";

import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function ContactForm({ providerName }: { providerName: string }) {
  const t = useTranslations("contactForm");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate(formData: { name: string; email: string; message: string }): Errors {
    const next: Errors = {};
    if (!formData.name.trim()) next.name = t("errName");
    if (!formData.email.trim()) {
      next.email = t("errEmail");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = t("errEmailInvalid");
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      next.message = t("errMessage");
    }
    return next;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      return;
    }
    setErrors({});
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
          name: form.name,
          email: form.email,
          subject: "New contact request for " + providerName,
          message: form.message,
          provider: providerName,
          from_name: "Ronald Platform",
          page: "provider",
        }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="bg-success-container text-on-success-container rounded-[8px] p-6 text-center">
        <CircleCheck aria-hidden className="size-12 mx-auto mb-3 block" strokeWidth={1.75} />
        <p className="font-bold">{t("successTitle")}</p>
        <p className="text-sm mt-1 opacity-90">{t("successBody", { name: providerName })}</p>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Field
        id="cf-name"
        name="name"
        label={t("name")}
        type="text"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        disabled={loading}
        required
        autoComplete="name"
      />
      <Field
        id="cf-email"
        name="email"
        label={t("email")}
        type="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        disabled={loading}
        required
        autoComplete="email"
      />
      <div className="flex flex-col gap-1">
        <label htmlFor="cf-message" className="sr-only">
          {t("message")}
        </label>
        <textarea
          id="cf-message"
          name="message"
          placeholder={t("message")}
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          disabled={loading}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          className="field resize-none"
        />
        {errors.message && (
          <p id="cf-message-error" role="alert" className="text-xs text-error mt-1">
            {errors.message}
          </p>
        )}
      </div>
      <button type="submit" className="btn btn-primary w-full" disabled={loading} data-loading={loading ? "true" : "false"} aria-busy={loading}>
        {loading ? (
          <>
            <span className="spinner" aria-hidden="true" />
            {t("sending")}
          </>
        ) : (
          t("send")
        )}
      </button>
    </form>
  );
}

interface FieldProps {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
}

function Field({
  id,
  name,
  label,
  type,
  value,
  onChange,
  error,
  disabled,
  required,
  autoComplete,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field"
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-error mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
