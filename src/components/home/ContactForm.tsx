"use client";

import { useRef, useState } from "react";
import { Mail, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/Button";

type ContactFormProps = {
  email: string;
};

export function ContactForm({ email }: ContactFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submissionLocked = useRef(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionLocked.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const senderEmail = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(senderEmail) || message.length < 10) {
      setError("Please enter your name, a valid email, and a message of at least 10 characters.");
      setSent(false);
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setError("Email delivery is not configured yet.");
      setSent(false);
      return;
    }

    submissionLocked.current = true;
    setSubmitting(true);
    setError(null);
    setSent(false);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: email,
          from_name: name,
          from_email: senderEmail,
          message,
        },
        publicKey,
      );
      setError(null);
      setSent(true);
      form.reset();
    } catch (error) {
      console.error("EmailJS contact submission failed", error);
      setError("Could not send your message. Please try again.");
      setSent(false);
    } finally {
      submissionLocked.current = false;
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-xl flex-col gap-4 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-foreground flex flex-col gap-2 text-sm font-medium">
          Name
          <input
            name="name"
            required
            minLength={2}
            maxLength={80}
            placeholder="Your name"
            className="border-border bg-surface text-foreground placeholder:text-muted focus:ring-ring rounded-lg border px-4 py-3 outline-none focus:ring-2"
          />
        </label>
        <label className="text-foreground flex flex-col gap-2 text-sm font-medium">
          Email
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            placeholder="you@example.com"
            className="border-border bg-surface text-foreground placeholder:text-muted focus:ring-ring rounded-lg border px-4 py-3 outline-none focus:ring-2"
          />
        </label>
      </div>
      <label className="text-foreground flex flex-col gap-2 text-sm font-medium">
        Message
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={6}
          placeholder="Tell me a little about your project..."
          className="border-border bg-surface text-foreground placeholder:text-muted focus:ring-ring resize-y rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />
      </label>
      {error && !sent && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
      {sent && (
        <p role="status" className="text-sm text-green-600 dark:text-green-400">
          Message sent. I&apos;ll get back to you soon.
        </p>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={submitting}
        leftIcon={<Send className="size-4" aria-hidden />}
      >
        <Mail className="mr-2 size-4" aria-hidden />
        {submitting ? "Sending..." : "Send me a message"}
      </Button>
    </form>
  );
}