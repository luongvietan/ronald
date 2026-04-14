"use client";

import { useState } from "react";

export default function ContactForm({ providerName }: { providerName: string }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // For MVP: just show success state (no backend)
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-surface-container-low rounded p-6 text-center">
        <span className="material-symbols-outlined text-4xl text-primary mb-3 block">
          check_circle
        </span>
        <p className="font-bold text-on-surface">Message sent!</p>
        <p className="text-on-surface-variant text-sm mt-1">
          {providerName} will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={form.name}
        onChange={handleChange}
        required
        className="px-4 py-3 rounded bg-surface-container-low border border-outline-variant focus:outline-none focus:border-primary text-on-surface placeholder:text-on-surface-variant text-sm"
      />
      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={form.email}
        onChange={handleChange}
        required
        className="px-4 py-3 rounded bg-surface-container-low border border-outline-variant focus:outline-none focus:border-primary text-on-surface placeholder:text-on-surface-variant text-sm"
      />
      <textarea
        name="message"
        placeholder="Your message"
        value={form.message}
        onChange={handleChange}
        required
        rows={4}
        className="px-4 py-3 rounded bg-surface-container-low border border-outline-variant focus:outline-none focus:border-primary text-on-surface placeholder:text-on-surface-variant text-sm resize-none"
      />
      <button
        type="submit"
        className="w-full py-3 rounded-full bg-primary text-on-primary font-bold hover:scale-105 transition-all"
      >
        Send Message
      </button>
    </form>
  );
}
