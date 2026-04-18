"use client";

import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;
type Status = "idle" | "loading" | "success" | "error";

export default function ContactPageForm() {
  const t = useTranslations("contactPageForm");
  const te = useTranslations("contactForm");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const SUBJECT_KEYS = ["list", "provider", "technical", "partnership", "other"] as const;

  function validate(formData: typeof form): Errors {
    const next: Errors = {};
    if (!formData.name.trim()) next.name = te("errName");
    if (!formData.email.trim()) {
      next.email = te("errEmail");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = te("errEmailInvalid");
    }
    if (!formData.subject) next.subject = t("errSubject");
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      next.message = te("errMessage");
    }
    return next;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate(form);
    if (Object.keys(next).length) {
      setErrors(next);
      setStatus("error");
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="bg-success-container text-on-success-container rounded-[8px] p-10 text-center">
        <CircleCheck aria-hidden className="size-14 mx-auto mb-4 block" strokeWidth={1.5} />
        <h3 className="text-xl font-bold mb-2">{t("successTitle")}</h3>
        <p className="opacity-90">{t("successBody")}</p>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldGroup
          id="cp-name"
          name="name"
          label={t("nameField")}
          placeholder={t("namePlaceholder")}
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          disabled={loading}
          required
          autoComplete="name"
        />
        <FieldGroup
          id="cp-email"
          name="email"
          type="email"
          label={t("emailField")}
          placeholder={t("emailPlaceholder")}
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          disabled={loading}
          required
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="cp-subject" className="block text-sm font-semibold text-text-primary mb-1.5">
          {t("subject")}
        </label>
        <select
          id="cp-subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          disabled={loading}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "cp-subject-error" : undefined}
          className="field cursor-pointer"
        >
          <option value="">{t("selectSubject")}</option>
          {SUBJECT_KEYS.map((k) => (
            <option key={k} value={k}>
              {t(`subjects.${k}`)}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p id="cp-subject-error" role="alert" className="text-xs text-error mt-1">
            {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cp-message" className="block text-sm font-semibold text-text-primary mb-1.5">
          {t("message")}
        </label>
        <textarea
          id="cp-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          disabled={loading}
          placeholder={t("placeholderMessage")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "cp-message-error" : undefined}
          className="field resize-none"
        />
        {errors.message && (
          <p id="cp-message-error" role="alert" className="text-xs text-error mt-1">
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

interface FieldGroupProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
}

function FieldGroup({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled,
  required,
  autoComplete,
}: FieldGroupProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-text-primary mb-1.5">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
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
