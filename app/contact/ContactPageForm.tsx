"use client";

import { useState } from "react";

const SUBJECTS = [
  "I want to list my service",
  "Question about a provider",
  "Technical issue",
  "Partnership enquiry",
  "Other",
];

export default function ContactPageForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-surface-container-low rounded p-10 text-center">
        <span className="material-symbols-outlined text-5xl text-primary mb-4 block">
          check_circle
        </span>
        <h3 className="text-xl font-bold text-on-surface mb-2">
          Message sent!
        </h3>
        <p className="text-on-surface-variant">
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">
            Your name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Marie Dupont"
            className="w-full px-4 py-3 rounded bg-surface-container-low border border-outline-variant focus:outline-none focus:border-primary text-on-surface placeholder:text-on-surface-variant text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="marie@example.com"
            className="w-full px-4 py-3 rounded bg-surface-container-low border border-outline-variant focus:outline-none focus:border-primary text-on-surface placeholder:text-on-surface-variant text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">
          Subject
        </label>
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded bg-surface-container-low border border-outline-variant focus:outline-none focus:border-primary text-on-surface text-sm cursor-pointer"
        >
          <option value="">Select a subject</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Tell us how we can help..."
          className="w-full px-4 py-3 rounded bg-surface-container-low border border-outline-variant focus:outline-none focus:border-primary text-on-surface placeholder:text-on-surface-variant text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-full bg-primary text-on-primary font-bold text-base hover:scale-[1.02] transition-all shadow-md"
      >
        Send Message
      </button>
    </form>
  );
}
